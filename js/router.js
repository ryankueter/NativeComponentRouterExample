 // Helper function to get safe pathname
  function getSafePath() {
    try {
      const path = window.location.pathname || '/';
      // If the path is just the filename (like /index.html), return '/'
      if (path.endsWith('.html')) {
        return '/';
      }
      return path;
    } catch (e) {
      return '/';
    }
  }

  // Global navigation function - simplifies routing
  window.navigateTo = function(path) {
    try {
      window.history.pushState({}, '', path);
    } catch (err) {
      console.log('History API not available in this context');
    }
    routerState.currentPath = path;
    routerState.listeners.forEach(fn => fn(path));
  };

  // Global router state (shared across all components)
  const routerState = {
    currentPath: getSafePath(),
    listeners: []
  };

// Navigation Link Component
class NavLink extends HTMLElement {
  connectedCallback() {
    const href = this.getAttribute('href') || '/';
    const text = this.textContent;

    this.innerHTML = `
      <a href="${href}" style="color: #ecf0f1; text-decoration: none; cursor: pointer; padding: 8px 15px; border-radius: 4px; transition: background-color 0.2s; display: inline-block;">
        ${text}
      </a>
    `;

    const link = this.querySelector('a');
    
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(href);
    });

    const updateActive = (path) => {
      if (path === href) {
        link.style.backgroundColor = '#34495e';
        link.style.fontWeight = '500';
      } else {
        link.style.backgroundColor = 'transparent';
        link.style.fontWeight = 'normal';
      }
    };

    link.addEventListener('mouseenter', () => {
      if (routerState.currentPath !== href) {
        link.style.backgroundColor = 'rgba(255,255,255,0.1)';
      }
    });

    link.addEventListener('mouseleave', () => {
      if (routerState.currentPath !== href) {
        link.style.backgroundColor = 'transparent';
      }
    });

    routerState.listeners.push(updateActive);
    updateActive(routerState.currentPath);
  }
}
customElements.define('nav-link', NavLink);

// Router Component
class AppRouter extends HTMLElement {
  constructor() {
    super();
    this.routes = new Map();
    this.currentRoute = null;
  }

  connectedCallback() {
    this.innerHTML = '<div id="outlet"></div>';
    this.outlet = this.querySelector('#outlet');
    
    // Listen for browser back/forward buttons
    window.addEventListener('popstate', () => {
      const newPath = getSafePath();
      routerState.currentPath = newPath;
      this.handleRoute(newPath);
    });
    
    // Listen for route changes
    routerState.listeners.push((path) => this.handleRoute(path));
    
    // Don't handle initial route here - wait for routes to be registered
  }

  registerRoute(path, component) {
    this.routes.set(path, component);
  }

  navigateTo(path) {
    navigateTo(path);
  }

  handleRoute(path) {
    if (!this.outlet) return;
    
    // Split path and query string
    const [pathname, queryString] = path.split('?');
    const queryParams = {};
    
    // Parse query string
    if (queryString) {
      queryString.split('&').forEach(param => {
        const [key, value] = param.split('=');
        queryParams[decodeURIComponent(key)] = decodeURIComponent(value || '');
      });
    }
    
    let matchedRoute = null;
    let params = {};

    if (this.routes.has(pathname)) {
      matchedRoute = this.routes.get(pathname);
    } else {
      // Check for wildcard routes first
      for (const [routePath, component] of this.routes.entries()) {
        if (routePath.endsWith('/*')) {
          const basePath = routePath.slice(0, -2); // Remove /*
          if (pathname.startsWith(basePath)) {
            matchedRoute = component;
            // Extract remaining path segments
            const remaining = pathname.substring(basePath.length);
            params.segments = remaining.split('/').filter(Boolean);
            break;
          }
        }
      }
      
      // If no wildcard match, check for parameterized routes
      if (!matchedRoute) {
        for (const [routePath, component] of this.routes.entries()) {
          if (!routePath.endsWith('/*')) {
            const match = this.matchRoute(routePath, pathname);
            if (match) {
              matchedRoute = component;
              params = match.params;
              break;
            }
          }
        }
      }
    }

    // Add query params to the params object
    if (Object.keys(queryParams).length > 0) {
      params.query = queryParams;
    }

    if (matchedRoute) {
      this.loadComponent(matchedRoute, params);
    } else {
      this.loadNotFound();
    }
  }

  matchRoute(routePath, actualPath) {
    const routeParts = routePath.split('/').filter(Boolean);
    const pathParts = actualPath.split('/').filter(Boolean);

    if (routeParts.length !== pathParts.length) {
      return null;
    }

    const params = {};
    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(':')) {
        const paramName = routeParts[i].substring(1);
        params[paramName] = pathParts[i];
      } else if (routeParts[i] !== pathParts[i]) {
        return null;
      }
    }

    return { params };
  }

  loadComponent(componentName, params = {}) {
    this.outlet.innerHTML = '';
    
    try {
      const component = document.createElement(componentName);
      
      if (Object.keys(params).length > 0) {
        component.setAttribute('route-params', JSON.stringify(params));
      }
      
      this.outlet.appendChild(component);
      this.currentRoute = componentName;
    } catch (error) {
      console.error('Error loading component:', componentName, error);
      this.loadNotFound();
    }
  }

  loadNotFound() {
    this.outlet.innerHTML = `
      <div style="padding: 40px; text-align: center;">
        <h2 style="color: #e74c3c; margin-bottom: 15px;">404 - Page Not Found</h2>
        <p style="color: #666; margin-bottom: 20px;">The page you're looking for doesn't exist.</p>
        <button onclick="navigateTo('/')" 
            style="color: #3498db; background: white; text-decoration: none; padding: 10px 20px; border: 2px solid #3498db; border-radius: 5px; cursor: pointer; font-size: 16px;">
          Go Home
        </button>
      </div>
    `;
  }
}
customElements.define('app-router', AppRouter);
    