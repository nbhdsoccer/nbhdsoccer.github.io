// NBHD Soccer Admin Core Functions
// Shared functionality across all admin pages

// Storage keys for different registration types
const STORAGE_KEYS = {
    benavidez: 'benavidezTournament2025Registrations',
    womensTournament: 'womensTournament2025Registrations',
    womensCommunity: 'womensWeekly2025Registrations'
};

// Admin header loader
async function loadAdminHeader() {
    try {
        const response = await fetch('/admin/components/admin-header.html');
        if (!response.ok) {
            throw new Error(`Failed to fetch admin header: ${response.status}`);
        }
        
        const headerHTML = await response.text();
        const headerContainer = document.getElementById('admin-header-container');
        
        if (headerContainer) {
            headerContainer.innerHTML = headerHTML;
        }
    } catch (error) {
        console.error('Error loading admin header:', error);
    }
}

// Shared statistics functions
function getAllRegistrationStats() {
    const benavidezRegs = JSON.parse(localStorage.getItem(STORAGE_KEYS.benavidez) || '[]');
    const womensTourn = JSON.parse(localStorage.getItem(STORAGE_KEYS.womensTournament) || '[]');
    const womensCommunity = JSON.parse(localStorage.getItem(STORAGE_KEYS.womensCommunity) || '[]');
    
    return {
        benavidez: {
            count: benavidezRegs.length,
            data: benavidezRegs,
            revenue: calculateBenavidezRevenue(benavidezRegs)
        },
        womensTournament: {
            count: womensTourn.length,
            data: womensTourn
        },
        womensCommunity: {
            count: womensCommunity.length,
            data: womensCommunity
        },
        totals: {
            registrations: benavidezRegs.length + womensTourn.length + womensCommunity.length,
            tournaments: 2
        }
    };
}

function calculateBenavidezRevenue(registrations) {
    let revenue = 0;
    
    registrations.forEach(reg => {
        const type = reg.registrationType;
        
        if (type === 'individual-memorial') {
            revenue += 55;
        } else if (type === 'team-memorial') {
            revenue += 500;
        } else if (type === 'sponsor-community') {
            revenue += 250;
        } else if (type === 'sponsor-memorial') {
            revenue += 500;
        } else if (type === 'sponsor-legacy') {
            revenue += 1500; // Minimum
        }
    });
    
    return revenue;
}

// Shared registration card creation
function createRegistrationCard(registration, tournamentType = 'generic') {
    const date = new Date(registration.timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Different card templates based on tournament type
    switch (tournamentType) {
        case 'benavidez':
            return createBenavidezCard(registration, date);
        case 'womens':
            return createWomensCard(registration, date);
        default:
            return createGenericCard(registration, date);
    }
}

function createBenavidezCard(registration, date) {
    const typeLabels = {
        'individual-memorial': 'Individual Registration',
        'team-memorial': 'Team Registration',
        'sponsor-community': 'Community Sponsor',
        'sponsor-memorial': 'Memorial Sponsor',
        'sponsor-legacy': 'Legacy Title Sponsor'
    };
    
    const typeLabel = typeLabels[registration.registrationType] || registration.registrationType;
    
    return `
        <div class="registration-card">
            <div class="registration-header">
                <h3>${registration.teamName || 'Individual Registration'}</h3>
                <div class="registration-meta">
                    <span class="registration-type-badge">${typeLabel}</span>
                    <span>📅 ${date}</span>
                    <span>👤 ${registration.captainName}</span>
                    ${registration.playerCount ? `<span>⚽ ${registration.playerCount}</span>` : ''}
                </div>
            </div>
            
            <div class="registration-body">
                <div class="registration-details">
                    <div class="detail-group">
                        <div class="detail-label">Contact Information</div>
                        <div class="detail-value">
                            📧 ${registration.captainEmail}<br>
                            📱 ${registration.captainPhone}
                        </div>
                    </div>
                    
                    <div class="detail-group">
                        <div class="detail-label">Registration Details</div>
                        <div class="detail-value">
                            Type: ${typeLabel}<br>
                            ${registration.playerCount ? `Players: ${registration.playerCount}` : 'Individual Entry'}
                        </div>
                    </div>
                </div>
                
                ${registration.memorialMessage ? `
                    <div class="memorial-message">
                        <h4>💝 Memorial Message</h4>
                        <p>"${registration.memorialMessage}"</p>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

function createWomensCard(registration, date) {
    const registrationTypeBadge = registration.registrationType === 'Tournament' ? 
        '<span class="tournament-badge">🏆 Tournament Registration</span>' :
        '<span class="tournament-badge" style="background: #16a34a;">👥 Community Registration</span>';
    
    return `
        <div class="registration-card">
            <div class="registration-header">
                <h3>${registration.firstName} ${registration.lastName}</h3>
                <div class="registration-meta">
                    ${registrationTypeBadge}
                    <span>📅 ${date}</span>
                    <span>📧 ${registration.email}</span>
                    ${registration.neighborhood ? `<span>🏘️ ${registration.neighborhood}</span>` : ''}
                </div>
            </div>
            
            <div class="registration-body">
                <div class="registration-details">
                    <div class="detail-group">
                        <div class="detail-label">Contact Information</div>
                        <div class="detail-value">
                            📧 ${registration.email}<br>
                            ${registration.phone ? `📱 ${registration.phone}` : 'No phone provided'}
                        </div>
                    </div>
                    
                    <div class="detail-group">
                        <div class="detail-label">Soccer Experience</div>
                        <div class="detail-value">
                            Level: ${registration.experienceLevel || 'Not specified'}<br>
                            Neighborhood: ${registration.neighborhood || 'Not specified'}
                        </div>
                    </div>
                    
                    ${registration.registrationType === 'Tournament' ? `
                        <div class="detail-group">
                            <div class="detail-label">Tournament Details</div>
                            <div class="detail-value">
                                ${registration.teamName ? `Team: ${registration.teamName}` : 'Needs team placement'}<br>
                                ${registration.divisionPreference ? `Division: ${registration.divisionPreference}` : 'No division preference'}
                            </div>
                        </div>
                    ` : `
                        <div class="detail-group">
                            <div class="detail-label">Program Interests</div>
                            <div class="detail-value">
                                ${registration.interests && registration.interests.length > 0 ? 
                                    `<div class="interests-list">
                                        ${registration.interests.map(interest => 
                                            `<span class="interest-tag">${interest.replace('-', ' ')}</span>`
                                        ).join('')}
                                    </div>` : 
                                    'No specific interests selected'
                                }
                            </div>
                        </div>
                    `}
                </div>
                
                ${registration.message ? `
                    <div class="message-section">
                        <h4>💬 Personal Message</h4>
                        <p>"${registration.message}"</p>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

function createGenericCard(registration, date) {
    return `
        <div class="registration-card">
            <div class="registration-header">
                <h3>${registration.name || registration.firstName + ' ' + registration.lastName || 'Registration'}</h3>
                <div class="registration-meta">
                    <span>📅 ${date}</span>
                    <span>📧 ${registration.email}</span>
                </div>
            </div>
            <div class="registration-body">
                <pre>${JSON.stringify(registration, null, 2)}</pre>
            </div>
        </div>
    `;
}

// Shared export functions
function exportToCSV(data, filename, headers) {
    if (data.length === 0) {
        alert('No data to export');
        return;
    }
    
    const csvContent = [
        headers.join(','),
        ...data.map(item => headers.map(header => {
            const key = header.toLowerCase().replace(/\s+/g, '');
            let value = item[key] || '';
            if (typeof value === 'object') {
                value = Array.isArray(value) ? value.join('; ') : JSON.stringify(value);
            }
            return `"${String(value).replace(/"/g, '""')}"`;
        }).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Global export function for all data
function exportAllData() {
    const stats = getAllRegistrationStats();
    const allData = {
        exported: new Date().toISOString(),
        summary: {
            totalRegistrations: stats.totals.registrations,
            activeTournaments: stats.totals.tournaments,
            estimatedRevenue: stats.benavidez.revenue
        },
        benavidezTournament: stats.benavidez.data,
        womensTournament: stats.womensTournament.data,
        womensCommunity: stats.womensCommunity.data
    };
    
    const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nbhd-soccer-all-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Global refresh function for dashboard stats
function refreshAllStats() {
    const stats = getAllRegistrationStats();
    
    // Update dashboard stats if elements exist
    const totalRegsEl = document.getElementById('totalTournamentRegs');
    const totalRevenueEl = document.getElementById('totalRevenue');
    
    if (totalRegsEl) {
        totalRegsEl.textContent = stats.totals.registrations;
    }
    
    if (totalRevenueEl) {
        totalRevenueEl.textContent = `$${stats.benavidez.revenue.toLocaleString()}`;
    }
    
    console.log('Admin stats refreshed:', stats);
    return stats;
}

// Utility functions
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Make functions globally available
if (typeof window !== 'undefined') {
    window.loadAdminHeader = loadAdminHeader;
    window.getAllRegistrationStats = getAllRegistrationStats;
    window.createRegistrationCard = createRegistrationCard;
    window.exportToCSV = exportToCSV;
    window.exportAllData = exportAllData;
    window.refreshAllStats = refreshAllStats;
    window.STORAGE_KEYS = STORAGE_KEYS;
}