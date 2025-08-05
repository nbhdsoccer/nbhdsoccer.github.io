// Google Analytics (GA4) - Centralized Configuration
// This script should be loaded in the <head> section of all HTML pages

(function() {
  // Create and append GA4 script tag
  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-0EHE4YERHW';
  document.head.appendChild(gaScript);

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  
  // Configure GA4 when script loads
  gaScript.onload = function() {
    gtag('js', new Date());
    gtag('config', 'G-0EHE4YERHW');
  };

  // Make gtag globally available
  window.gtag = gtag;
})();
