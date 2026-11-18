// Loads the shared header and footer into every page.
// Pages include: <div id="header-container"></div> ... <div id="footer-container"></div>
// and <script src="(root)/js/header-loader.js"></script>

(function () {
    // Path back to the site root, based on folder depth: '' at root, '../' one level down
    function rootPath() {
        const segments = window.location.pathname.split('/').filter(Boolean);
        const last = segments[segments.length - 1] || '';
        const depth = last.includes('.') ? segments.length - 1 : segments.length;
        return '../'.repeat(Math.max(depth, 0));
    }

    // Which nav item is active, by top-level folder
    const SECTIONS = {
        'community-soccer': 'programs',
        'youth-programs': 'programs',
        'events': 'events',
        'about': 'about',
    };

    function activeSection() {
        const path = window.location.pathname;
        if (path.includes('/support/partner')) return 'partner';
        const first = path.split('/').filter(Boolean)[0] || '';
        return SECTIONS[first] || null;
    }

    async function inject(containerId, file, root) {
        const el = document.getElementById(containerId);
        if (!el) return;
        try {
            const res = await fetch(root + 'components/' + file);
            if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
            el.innerHTML = (await res.text()).replace(/\{\{ROOT_PATH\}\}/g, root);
        } catch (err) {
            console.error('Could not load ' + file + ':', err);
        }
    }

    // Phone menu: the hamburger button opens and closes the nav links
    function initMenu() {
        const btn = document.querySelector('.nb-menu-toggle');
        const menu = document.getElementById('nb-menu');
        if (!btn || !menu) return;
        const setOpen = (open) => {
            menu.classList.toggle('nb-open', open);
            btn.setAttribute('aria-expanded', String(open));
            btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        };
        btn.addEventListener('click', () => setOpen(!menu.classList.contains('nb-open')));
        menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
        document.addEventListener('click', (e) => {
            if (menu.classList.contains('nb-open') && !e.target.closest('header')) setOpen(false);
        });
    }

    async function load() {
        const root = rootPath();
        await Promise.all([
            inject('header-container', 'header.html', root),
            inject('footer-container', 'footer.html', root),
        ]);
        initMenu();
        const section = activeSection();
        if (section) {
            document.querySelectorAll('.nav-links a[data-section="' + section + '"]')
                .forEach(a => a.classList.add('active'));
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', load);
    } else {
        load();
    }
})();
