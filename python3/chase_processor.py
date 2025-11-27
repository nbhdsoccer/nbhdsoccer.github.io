#!/usr/bin/env python3
"""
Chase CSV Financial Report Processor
Processes Chase bank CSV exports and categorizes expenses according to 
Chicago Neighborhood Soccer's financial report structure.
"""

import csv
import json
import re
from datetime import datetime
from collections import defaultdict
import os
import sys

class ChaseCSVProcessor:
    def __init__(self, config_file='../js/financial-report-config.json'):
        """Initialize processor with financial report categories"""
        self.load_config(config_file)
        self.setup_categories()
        
    def load_config(self, config_file):
        """Load financial report configuration"""
        try:
            with open(config_file, 'r') as f:
                self.config = json.load(f)
        except FileNotFoundError:
            print(f"Config file {config_file} not found. Using default categories.")
            self.config = self.get_default_config()
    
    def get_default_config(self):
        """Default configuration if file not found"""
        return {
            "programExpenses": [
                {"category": "Equipment & Supplies", "amount": 0},
                {"category": "Facility Rentals", "amount": 0},
                {"category": "Referee & Coaching Stipends", "amount": 0},
                {"category": "Event Costs", "amount": 0},
                {"category": "Program Insurance", "amount": 0}
            ],
            "administrativeExpenses": [
                {"category": "Website Hosting & Technology", "amount": 0},
                {"category": "Marketing Materials & Printing", "amount": 0},
                {"category": "Banking & Payment Processing Fees", "amount": 0},
                {"category": "Legal & Compliance", "amount": 0},
                {"category": "Office Supplies & Communications", "amount": 0}
            ],
            "fundraisingExpenses": [
                {"category": "Tournament & Event Promotion", "amount": 0},
                {"category": "Donor Communications & Materials", "amount": 0}
            ]
        }
    
    def setup_categories(self):
        """Setup expense categorization rules with NBHD Soccer specific logic"""
        self.categorization_rules = {
            # Program Expenses
            'Equipment & Supplies': [
                r'soccer.*ball', r'equipment', r'sports.*gear', r'jersey', 
                r'cone', r'goal', r'net', r'pump', r'first.*aid', r'medical.*kit',
                # NBHD Soccer specific equipment rules
                r'goal', r'sports', r'amazon.*2024', r'best.*buy.*speaker',
                r'bibs', r'balls'
            ],
            'Facility Rentals': [
                r'field.*rental', r'gym.*rental', r'facility', r'park.*district',
                r'ymca', r'rec.*center', r'school.*rental', r'venue.*rental',
                # NBHD Soccer specific venues
                r'rauner.*ymca', r'chicago.*park.*district'
            ],
            'Referee & Coaching Stipends': [
                r'referee', r'official', r'coach', r'instructor', r'stipend'
            ],
            'Event Costs': [
                r'tournament', r'benavidez', r'awards', r'trophy', r'medal',
                r'celebration', r'event.*cost', r'catering', r'food.*event',
                # Best Buy speakers for events
                r'best.*buy.*speaker'
            ],
            'Program Insurance': [
                r'insurance', r'liability', r'coverage'
            ],
            
            # Administrative Expenses  
            'Website Hosting & Technology': [
                r'hosting', r'domain', r'website', r'meetup', r'discord',
                r'zoom', r'google.*workspace', r'tech.*service'
            ],
            'Marketing Materials & Printing': [
                r'printing', r'flyer', r'poster', r'banner', r'marketing',
                r'promotional', r'business.*card', r'sticker'
            ],
            'Banking & Payment Processing Fees': [
                r'bank.*fee', r'transaction.*fee', r'paypal', r'stripe',
                r'processing.*fee', r'atm.*fee', r'overdraft'
            ],
            'Legal & Compliance': [
                r'legal', r'lawyer', r'attorney', r'501c3', r'filing.*fee',
                r'incorporation', r'nonprofit.*fee', r'compliance'
            ],
            'Office Supplies & Communications': [
                r'office.*supply', r'paper', r'pen', r'folder', r'binder',
                r'phone.*bill', r'cell.*phone', r'communication'
            ],
            
            # Fundraising Expenses
            'Tournament & Event Promotion': [
                r'tournament.*promo', r'event.*promo', r'advertising',
                r'facebook.*ads', r'instagram.*promo'
            ],
            'Donor Communications & Materials': [
                r'donor', r'thank.*you', r'newsletter', r'mailing',
                r'donor.*gift', r'appreciation'
            ]
        }
        
    def log_income_transaction(self, description, amount, date):
        """Log income transactions for 501c3 reporting and community transparency"""
        desc_lower = description.lower()
        
        # Initialize income tracking if not exists
        if not hasattr(self, 'income_transactions'):
            self.income_transactions = []
            self.income_totals = defaultdict(float)
        
        # NBHD Soccer specific income categorization for 501c3
        if 'zelle' in desc_lower:
            if 'julian r da silva' in desc_lower or 'julian da silva' in desc_lower:
                income_type = 'Cash Deposits - Community Collections'
            else:
                income_type = 'Program Fees & Community Donations'
        elif 'chicago fire' in desc_lower or 'fire fc' in desc_lower:
            income_type = 'Grants & Sponsorships'
        elif amount >= 50 and not any(name in desc_lower for name in ['julian', 'andre', 'diego', 'jordan']):
            income_type = 'Tournament Registration Fees'
        elif any(name in desc_lower for name in ['andre', 'diego', 'jordan']) and amount > 20:
            income_type = 'Board Member Contributions/Reimbursements'
        elif 'deposit' in desc_lower or 'transfer' in desc_lower:
            income_type = 'Other Income & Transfers'
        else:
            income_type = 'Miscellaneous Income'
        
        self.income_transactions.append({
            'date': date,
            'description': description,
            'amount': amount,
            'type': income_type
        })
        
        self.income_totals[income_type] += amount
        print(f"  Income logged: {income_type} - {description} (${amount:.2f})")
    
    def categorize_transaction(self, description, amount):
        """Categorize a transaction based on description with NBHD Soccer specific rules"""
        description_lower = description.lower()
        
        # NBHD Soccer specific categorization first
        
        # Best Buy - speakers for events (all Best Buy purchases are for events)
        if 'bestbuy' in description_lower:
            return 'Event Costs'
        
        # Amazon - equipment purchases in 2024
        if ('amazon' in description_lower or 'amzn' in description_lower):
            return 'Equipment & Supplies'
        
        # Dick's Sporting Goods - equipment
        if 'dickssportinggoods' in description_lower or 'dicks sporting' in description_lower:
            return 'Equipment & Supplies'
        
        # Chicago Park District field rentals (ACT*CPD is their payment system)
        if 'act*cpd' in description_lower or 'cpd 312-742' in description_lower:
            return 'Facility Rentals'
        
        # Chicago Fire partnership expenses
        if 'chicagofirefc' in description_lower or 'chicago fire' in description_lower:
            return 'Event Costs'
        
        # Late fees and bank charges
        if 'late fee' in description_lower or 'overdraft' in description_lower:
            return 'Banking & Payment Processing Fees'
        
        # Equipment - anything with goal, sports keywords
        if any(keyword in description_lower for keyword in ['goal', 'sports']):
            return 'Equipment & Supplies'
        
        # Venue rentals
        if any(venue in description_lower for venue in ['rauner ymca', 'chicago park district']):
            return 'Facility Rentals'
        
        # Benavidez tournament expenses (amounts >= $50 in October 2024)
        if amount >= 50 and 'oct' in description_lower and '2024' in description:
            return 'Event Costs'
        
        # Check standard categorization rules
        for category, patterns in self.categorization_rules.items():
            for pattern in patterns:
                if re.search(pattern, description_lower):
                    return category
        
        # Default to uncategorized if no match
        return 'Uncategorized'
    
    def detect_account_type(self, csv_file):
        """Detect if this is credit card (3168) or checking (1232) account"""
        filename = os.path.basename(csv_file).lower()
        if '3168' in filename:
            return 'credit_card'
        elif '1232' in filename:
            return 'checking'
        else:
            # Try to detect from file content
            try:
                with open(csv_file, 'r') as f:
                    content = f.read(500).lower()  # Read first 500 chars
                    if '3168' in content:
                        return 'credit_card'
                    elif '1232' in content:
                        return 'checking'
            except:
                pass
        return 'unknown'
    
    def is_credit_card_payment(self, description):
        """Check if transaction is a credit card payment (to avoid double counting)"""
        desc_lower = description.lower()
        cc_payment_patterns = [
            r'credit.*card.*payment', r'cc.*payment', r'chase.*credit', 
            r'autopay', r'online.*payment.*3168', r'payment.*thank.*you',
            r'chase.*card.*services', r'credit.*card.*autopay'
        ]
        
        for pattern in cc_payment_patterns:
            if re.search(pattern, desc_lower):
                return True
        return False
    
    def process_chase_csv(self, csv_file):
        """Process Chase CSV file with account-specific logic"""
        transactions = []
        category_totals = defaultdict(float)
        account_type = self.detect_account_type(csv_file)
        
        print(f"Processing {csv_file} as {account_type} account")
        
        try:
            with open(csv_file, 'r') as f:
                # Try to detect Chase CSV format
                sample = f.read(1024)
                f.seek(0)
                
                # Chase CSV typically has: Transaction Date,Post Date,Description,Category,Type,Amount,Memo
                reader = csv.DictReader(f)
                
                for row in reader:
                    # Handle different possible Chase CSV formats
                    # Credit card format: Transaction Date, Description, Amount
                    # Checking format: Posting Date, Description, Amount
                    date_field = row.get('Transaction Date') or row.get('Posting Date') or row.get('Date') or row.get('Post Date')
                    desc_field = row.get('Description') or row.get('Memo') or row.get('Transaction')
                    amount_field = row.get('Amount') or row.get('Debit') or row.get('Credit')
                    type_field = row.get('Type', '')
                    
                    if not all([date_field, desc_field, amount_field]):
                        continue
                    
                    try:
                        amount = float(str(amount_field).replace('$', '').replace(',', ''))
                        
                        # Account-specific processing logic
                        should_process = False
                        
                        if account_type == 'credit_card':
                            # Credit Card: Process all charges (negative amounts), ignore payments/credits
                            if amount < 0:  # Charges/purchases on credit card
                                should_process = True
                                amount = abs(amount)
                        
                        elif account_type == 'checking':
                            # Checking: Process debits but ignore credit card payments and handle income
                            if amount < 0:  # Debit/expense from checking
                                if not self.is_credit_card_payment(desc_field):
                                    should_process = True
                                    amount = abs(amount)
                                else:
                                    print(f"  Skipping CC payment: {desc_field} (${abs(amount):.2f})")
                            elif amount > 0:  # Credit/income - log but don't count as expense
                                self.log_income_transaction(desc_field, amount, date_field)
                        
                        else:  # unknown account type
                            # Default behavior: process negative amounts as expenses
                            if amount < 0:
                                should_process = True
                                amount = abs(amount)
                        
                        if should_process:
                            category = self.categorize_transaction(desc_field, amount)
                            category_totals[category] += amount
                            
                            print(f"  Processing: {desc_field[:50]} → {category} (${amount:.2f})")
                            
                            transactions.append({
                                'date': date_field,
                                'description': desc_field,
                                'amount': amount,
                                'category': category,
                                'account_type': account_type,
                                'original_amount': row.get('Amount', amount_field),
                                'type': type_field
                            })
                    except (ValueError, TypeError):
                        continue
                        
        except Exception as e:
            print(f"Error processing CSV file {csv_file}: {e}")
            return [], {}
            
        return transactions, dict(category_totals)
    
    def generate_summary_csv(self, transactions, output_file='financial_summary.csv'):
        """Generate a summary CSV file"""
        with open(output_file, 'w', newline='') as f:
            fieldnames = ['date', 'description', 'amount', 'category', 'account_type', 'original_amount', 'type']
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(transactions)
        
        print(f"Summary CSV generated: {output_file}")
    
    def generate_category_summary(self, category_totals, output_file='category_summary.csv'):
        """Generate category totals summary"""
        with open(output_file, 'w', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(['Category', 'Total Amount', 'Report Section'])
            
            # Map simplified category names to report sections
            category_to_section = {
                'Equipment & Supplies': 'Program Expenses',
                'Facility Rentals': 'Program Expenses', 
                'Referee & Coaching Stipends': 'Program Expenses',
                'Event Costs': 'Program Expenses',
                'Program Insurance': 'Program Expenses',
                'Website Hosting & Technology': 'Administrative Expenses',
                'Marketing Materials & Printing': 'Administrative Expenses',
                'Banking & Payment Processing Fees': 'Administrative Expenses',
                'Legal & Compliance': 'Administrative Expenses',
                'Office Supplies & Communications': 'Administrative Expenses',
                'Tournament & Event Promotion': 'Fundraising Expenses',
                'Donor Communications & Materials': 'Fundraising Expenses'
            }
            
            total_expenses = 0
            for category, amount in category_totals.items():
                section = category_to_section.get(category, 'Other')
                total_expenses += amount
                writer.writerow([category, f"${amount:.2f}", section])
            
            # Add uncategorized
            uncategorized = category_totals.get('Uncategorized', 0)
            if uncategorized > 0:
                writer.writerow(['Uncategorized', f"${uncategorized:.2f}", 'Needs Review'])
                total_expenses += uncategorized
            
            writer.writerow(['TOTAL', f"${total_expenses:.2f}", 'All Sections'])
        
        print(f"Category summary generated: {output_file}")
        
    def update_financial_config(self, category_totals):
        """Update the financial report config file with actual data including income for 501c3 reporting"""
        try:
            # Read current config
            with open('../js/financial-report-config.json', 'r') as f:
                config = json.load(f)
            
            # Add income/revenue section if it doesn't exist
            if 'incomeRevenue' not in config:
                config['incomeRevenue'] = [
                    {"category": "Program Fees & Community Donations", "amount": 0},
                    {"category": "Tournament Registration Fees", "amount": 0},
                    {"category": "Grants & Sponsorships", "amount": 0},
                    {"category": "Cash Deposits - Community Collections", "amount": 0},
                    {"category": "Board Member Contributions/Reimbursements", "amount": 0},
                    {"category": "Other Income & Transfers", "amount": 0}
                ]
            
            # Update income totals if we have them
            if hasattr(self, 'income_totals'):
                for i, income in enumerate(config['incomeRevenue']):
                    category = income['category']
                    config['incomeRevenue'][i]['amount'] = self.income_totals.get(category, 0)
            
            # Update program expenses
            program_mapping = {
                'Equipment & Supplies': 'Equipment & Supplies (balls, cones, jerseys, first aid)',
                'Facility Rentals': 'Facility Rentals (field & gym space for programs)', 
                'Referee & Coaching Stipends': 'Referee & Coaching Stipends',
                'Event Costs': 'Event Costs (Benavidez Tournament, awards, celebrations)',
                'Program Insurance': 'Program Insurance'
            }
            
            for i, expense in enumerate(config['programExpenses']):
                for simple_name, full_name in program_mapping.items():
                    if full_name in expense['category']:
                        config['programExpenses'][i]['amount'] = category_totals.get(simple_name, 0)
                        break
            
            # Update administrative expenses
            admin_mapping = {
                'Website Hosting & Technology': 'Website Hosting & Technology (Meetup, Discord, domain)',
                'Marketing Materials & Printing': 'Marketing Materials & Printing',
                'Banking & Payment Processing Fees': 'Banking & Payment Processing Fees',
                'Legal & Compliance': 'Legal & Compliance (501c3 filing, corporate filings)',
                'Office Supplies & Communications': 'Office Supplies & Communications'
            }
            
            for i, expense in enumerate(config['administrativeExpenses']):
                for simple_name, full_name in admin_mapping.items():
                    if full_name in expense['category']:
                        config['administrativeExpenses'][i]['amount'] = category_totals.get(simple_name, 0)
                        break
            
            # Update fundraising expenses  
            fundraising_mapping = {
                'Tournament & Event Promotion': 'Tournament & Event Promotion',
                'Donor Communications & Materials': 'Donor Communications & Materials'
            }
            
            for i, expense in enumerate(config['fundraisingExpenses']):
                for simple_name, full_name in fundraising_mapping.items():
                    if full_name in expense['category']:
                        config['fundraisingExpenses'][i]['amount'] = category_totals.get(simple_name, 0)
                        break
            
            # Write updated config
            with open('../js/financial-report-config.json', 'w') as f:
                json.dump(config, f, indent=2)
            
            print(f"\n✅ Updated ../js/financial-report-config.json with actual financial data")
            print(f"   Your financial transparency report will now show real numbers!")
            
        except Exception as e:
            print(f"\n❌ Error updating config file: {e}")
    
    def print_summary(self, category_totals):
        """Print summary to console"""
        print("\n" + "="*60)
        print("FINANCIAL REPORT SUMMARY")
        print("="*60)
        
        # Group categories by section
        program_categories = ['Equipment & Supplies', 'Facility Rentals', 'Referee & Coaching Stipends', 'Event Costs', 'Program Insurance']
        admin_categories = ['Website Hosting & Technology', 'Marketing Materials & Printing', 'Banking & Payment Processing Fees', 'Legal & Compliance', 'Office Supplies & Communications']
        fundraising_categories = ['Tournament & Event Promotion', 'Donor Communications & Materials']
        
        sections = {
            'Program Expenses': program_categories,
            'Administrative Expenses': admin_categories,
            'Fundraising Expenses': fundraising_categories
        }
        
        total_expenses = 0
        for section, categories in sections.items():
            print(f"\n{section}:")
            section_total = 0
            for category in categories:
                amount = category_totals.get(category, 0)
                section_total += amount
                if amount > 0:
                    print(f"  {category}: ${amount:.2f}")
            print(f"  Subtotal: ${section_total:.2f}")
            total_expenses += section_total
        
        # Show uncategorized
        uncategorized = category_totals.get('Uncategorized', 0)
        if uncategorized > 0:
            print(f"\nUncategorized (Needs Review): ${uncategorized:.2f}")
            total_expenses += uncategorized
        
        print(f"\nTOTAL EXPENSES: ${total_expenses:.2f}")
        print("="*60)
        
        # Show income summary if available
        if hasattr(self, 'income_transactions') and self.income_transactions:
            print(f"\n{'='*60}")
            print("INCOME SUMMARY (Not counted as expenses)")
            print("="*60)
            
            income_by_type = defaultdict(float)
            for income in self.income_transactions:
                income_by_type[income['type']] += income['amount']
            
            total_income = 0
            for income_type, amount in income_by_type.items():
                print(f"{income_type}: ${amount:.2f}")
                total_income += amount
            
            print(f"\nTOTAL INCOME TRACKED: ${total_income:.2f}")
            print("="*60)

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 chase_processor.py <chase_csv_file(s)> [output_prefix]")
        print("Examples:")
        print("  python3 chase_processor.py Chase_1232_Activity.csv nbhd_2024")
        print("  python3 chase_processor.py Chase_3168_Activity.csv Chase_1232_Activity.csv nbhd_2024")
        print("\nAccount Detection:")
        print("  - Files with '1232' = Checking Account")
        print("  - Files with '3168' = Credit Card Account")
        return
    
    # Handle multiple CSV files or single file
    csv_files = []
    output_prefix = "financial_report"
    
    for arg in sys.argv[1:]:
        if arg.lower().endswith('.csv'):
            if os.path.exists(arg):
                csv_files.append(arg)
            else:
                print(f"CSV file not found: {arg}")
        else:
            output_prefix = arg
    
    if not csv_files:
        print("No valid CSV files found")
        return
    
    processor = ChaseCSVProcessor()
    all_transactions = []
    combined_category_totals = defaultdict(float)
    
    # Process each CSV file
    for csv_file in csv_files:
        print(f"\n{'='*50}")
        print(f"Processing: {csv_file}")
        print('='*50)
        
        transactions, category_totals = processor.process_chase_csv(csv_file)
        
        if transactions:
            all_transactions.extend(transactions)
            for category, amount in category_totals.items():
                combined_category_totals[category] += amount
            print(f"✓ Processed {len(transactions)} transactions from {os.path.basename(csv_file)}")
        else:
            print(f"✗ No transactions found in {csv_file}")
    
    if not all_transactions:
        print("\nNo transactions found in any files")
        return
    
    print(f"\n{'='*50}")
    print(f"COMBINED RESULTS ({len(all_transactions)} total transactions)")
    print('='*50)
    
    # Generate combined outputs
    processor.generate_summary_csv(all_transactions, f"{output_prefix}_transactions.csv")
    processor.generate_category_summary(dict(combined_category_totals), f"{output_prefix}_summary.csv")
    processor.print_summary(dict(combined_category_totals))
    
    # Update the financial report config file with actual data
    processor.update_financial_config(dict(combined_category_totals))
    
    print(f"\nFiles generated:")
    print(f"  - {output_prefix}_transactions.csv (detailed transactions)")
    print(f"  - {output_prefix}_summary.csv (category totals)")
    print(f"\nNote: Credit card payments from checking account were automatically excluded to avoid double-counting.")

if __name__ == "__main__":
    main()