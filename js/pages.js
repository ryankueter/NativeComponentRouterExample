// Page Components
    class HomePage extends HTMLElement {
      connectedCallback() {
        this.innerHTML = `
          <div style="padding: 40px;">
            <h1 style="color: #2c3e50; margin-bottom: 20px;">Welcome to SPA Router</h1>
            <p style="color: #555; line-height: 1.6; margin-bottom: 15px;">This is a native Web Component router for single-page applications, similar to Blazor's routing system.</p>
            <p style="color: #555; line-height: 1.6; margin-bottom: 15px;">Navigate using the links above to see the router in action!</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 20px;">
              <h3 style="color: #2c3e50; margin-bottom: 10px;">Features:</h3>
              <ul style="list-style: none; padding-left: 0;">
                <li style="padding: 8px 0; color: #555;">✓ Pure native Web Components - no frameworks needed</li>
                <li style="padding: 8px 0; color: #555;">✓ Dynamic component loading</li>
                <li style="padding: 8px 0; color: #555;">✓ Route parameters (e.g., /user/:id)</li>
                <li style="padding: 8px 0; color: #555;">✓ Clean URLs (no hash symbols)</li>
                <li style="padding: 8px 0; color: #555;">✓ Active link highlighting</li>
                <li style="padding: 8px 0; color: #555;">✓ 404 handling</li>
              </ul>
            </div>
          </div>
        `;
      }
    }
    customElements.define('home-page', HomePage);
    
    class AboutPage extends HTMLElement {
      connectedCallback() {
        this.innerHTML = `
          <div style="padding: 40px;">
            <h1 style="color: #2c3e50; margin-bottom: 20px;">About This Router</h1>
            <p style="color: #555; line-height: 1.6; margin-bottom: 15px;">This router demonstrates how to build a SPA routing system using only native Web Components.</p>
            <p style="color: #555; line-height: 1.6; margin-bottom: 15px;">To use this router in your own project:</p>
            
            <div style="background: #282c34; color: #abb2bf; padding: 20px; border-radius: 8px; overflow-x: auto; font-family: 'Courier New', monospace; font-size: 14px; margin-top: 20px;">
// Register routes<br>
const router = document.querySelector('app-router');<br>
router.registerRoute('/', 'home-page');<br>
router.registerRoute('/about', 'about-page');<br>
router.registerRoute('/user/:id', 'user-page');
            </div>
            
            <p style="color: #555; line-height: 1.6; margin-top: 20px;">The router will automatically handle navigation and display the appropriate component.</p>
          </div>
        `;
      }
    }
    customElements.define('about-page', AboutPage);
    
    class UserPage extends HTMLElement {
      connectedCallback() {
        const paramsStr = this.getAttribute('route-params');
        const params = paramsStr ? JSON.parse(paramsStr) : {};
        const userId = params.id || 'unknown';

        this.innerHTML = `
          <div style="padding: 40px;">
            <h1 style="color: #2c3e50; margin-bottom: 20px;">User Profile</h1>
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 12px; margin-top: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
              <div style="opacity: 0.9; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">User ID</div>
              <div style="font-size: 32px; font-weight: bold; margin-top: 10px;">${userId}</div>
            </div>
            <p style="color: #555; margin-top: 20px; line-height: 1.6;">This page demonstrates route parameters! The user ID is extracted from the URL path.</p>
            <p style="color: #555; margin-top: 10px; line-height: 1.6;">Try clicking different user links above to see the ID change.</p>
            <div style="margin-top: 20px; padding: 15px; background: #f0f0f0; border-radius: 8px;">
              <strong>Route pattern:</strong> <code>/user/:id</code><br>
              <strong>Current URL:</strong> <code>/user/${userId}</code><br>
              <strong>Extracted param:</strong> <code>id = "${userId}"</code>
            </div>
          </div>
        `;
      }
    }
    customElements.define('user-page', UserPage);
    
    class ProductPage extends HTMLElement {
      connectedCallback() {
        const paramsStr = this.getAttribute('route-params');
        const params = paramsStr ? JSON.parse(paramsStr) : {};
        const productName = params.name || 'unknown';
        const section = params.section || 'unknown';

        this.innerHTML = `
          <div style="padding: 40px;">
            <h1 style="color: #2c3e50; margin-bottom: 20px;">Product Information</h1>
            <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 30px; border-radius: 12px; margin-top: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
              <div style="opacity: 0.9; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Product</div>
              <div style="font-size: 32px; font-weight: bold; margin-top: 10px;">${productName}</div>
              <div style="opacity: 0.9; font-size: 16px; margin-top: 15px;">Section: ${section}</div>
            </div>
            <p style="color: #555; margin-top: 20px; line-height: 1.6;">This demonstrates multiple route parameters in a single route!</p>
            <div style="margin-top: 20px; padding: 15px; background: #f0f0f0; border-radius: 8px;">
              <strong>Route pattern:</strong> <code>/product/:name/:section</code><br>
              <strong>Current URL:</strong> <code>/product/${productName}/${section}</code><br>
              <strong>Extracted params:</strong><br>
              &nbsp;&nbsp;• <code>name = "${productName}"</code><br>
              &nbsp;&nbsp;• <code>section = "${section}"</code>
            </div>
          </div>
        `;
      }
    }
    customElements.define('product-page', ProductPage);
    
    class SearchPage extends HTMLElement {
      connectedCallback() {
        const paramsStr = this.getAttribute('route-params');
        const allParams = paramsStr ? JSON.parse(paramsStr) : {};
        
        // Separate route params from query params
        const queryParams = allParams.query || {};
        const query = queryParams.q || '';
        const category = queryParams.category || '';
        const sort = queryParams.sort || 'relevance';

        this.innerHTML = `
          <div style="padding: 40px;">
            <h1 style="color: #2c3e50; margin-bottom: 20px;">Search Results</h1>
            <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 30px; border-radius: 12px; margin-top: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
              <div style="opacity: 0.9; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Search Query</div>
              <div style="font-size: 32px; font-weight: bold; margin-top: 10px;">${query || 'No query'}</div>
              ${category ? `<div style="opacity: 0.9; font-size: 16px; margin-top: 15px;">Category: ${category}</div>` : ''}
              <div style="opacity: 0.9; font-size: 16px; margin-top: 10px;">Sort: ${sort}</div>
            </div>
            <p style="color: #555; margin-top: 20px; line-height: 1.6;">This demonstrates query string parameters (like ?q=laptop&category=electronics)!</p>
            <div style="margin-top: 20px; padding: 15px; background: #f0f0f0; border-radius: 8px;">
              <strong>Query Parameters:</strong><br>
              &nbsp;&nbsp;• <code>q = "${query}"</code><br>
              ${category ? `&nbsp;&nbsp;• <code>category = "${category}"</code><br>` : ''}
              &nbsp;&nbsp;• <code>sort = "${sort}"</code>
            </div>
            <div style="margin-top: 20px;">
              <button onclick="navigateTo('/search?q=tablet&category=gadgets&sort=price')" 
                style="padding: 10px 20px; background: #4facfe; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
                Try Different Query
              </button>
            </div>
          </div>
        `;
      }
    }
    customElements.define('search-page', SearchPage);
    
    class DocsPage extends HTMLElement {
      connectedCallback() {
        const paramsStr = this.getAttribute('route-params');
        const allParams = paramsStr ? JSON.parse(paramsStr) : {};
        
        // Access all path segments
        const segments = allParams.segments || [];
        const section = segments[0] || 'unknown';
        const subsection = segments[1] || 'unknown';
        const action = segments[2] || 'unknown';

        this.innerHTML = `
          <div style="padding: 40px;">
            <h1 style="color: #2c3e50; margin-bottom: 20px;">Documentation</h1>
            <div style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); color: white; padding: 30px; border-radius: 12px; margin-top: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
              <div style="opacity: 0.9; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Path Segments</div>
              <div style="font-size: 24px; font-weight: bold; margin-top: 10px;">
                ${section} / ${subsection} / ${action}
              </div>
            </div>
            <p style="color: #555; margin-top: 20px; line-height: 1.6;">This demonstrates wildcard routes with all path segments!</p>
            <div style="margin-top: 20px; padding: 15px; background: #f0f0f0; border-radius: 8px;">
              <strong>Route pattern:</strong> <code>/docs/*</code><br>
              <strong>Current URL:</strong> <code>/docs/${segments.join('/')}</code><br>
              <strong>All Segments:</strong><br>
              ${segments.map((seg, i) => `&nbsp;&nbsp;• <code>segments[${i}] = "${seg}"</code>`).join('<br>')}
            </div>
            <div style="margin-top: 20px;">
              <button onclick="navigateTo('/docs/guides/getting-started/installation')" 
                style="padding: 10px 20px; background: #fa709a; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; margin-right: 10px;">
                Try Different Path
              </button>
              <button onclick="navigateTo('/docs/api/v2/endpoints/list')" 
                style="padding: 10px 20px; background: #fee140; color: #333; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
                Another Example
              </button>
            </div>
          </div>
        `;
      }
    }
    customElements.define('docs-page', DocsPage);
    
    class UsersPage extends HTMLElement {
      connectedCallback() {
        this.innerHTML = `
          <div style="padding: 40px;">
            <h1 style="color: #2c3e50; margin-bottom: 20px;">Users from API</h1>
            <div id="loading" style="text-align: center; padding: 40px; color: #666;">
              <div style="border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto;"></div>
              <p style="margin-top: 20px;">Loading users...</p>
            </div>
            <div id="users-container"></div>
            <style>
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            </style>
          </div>
        `;

        this.loadUsers();
      }

      async loadUsers() {
        const loading = this.querySelector('#loading');
        const container = this.querySelector('#users-container');

        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/users');
          const users = await response.json();

          loading.style.display = 'none';
          
          container.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">
              ${users.map(user => `
                <div style="background: white; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: transform 0.2s;" 
                     onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 4px 8px rgba(0,0,0,0.15)'" 
                     onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.1)'">
                  <h3 style="color: #2c3e50; margin-bottom: 10px;">${user.name}</h3>
                  <p style="color: #7f8c8d; font-size: 14px; margin-bottom: 8px;">
                    <strong>Email:</strong> ${user.email}
                  </p>
                  <p style="color: #7f8c8d; font-size: 14px; margin-bottom: 8px;">
                    <strong>Phone:</strong> ${user.phone}
                  </p>
                  <p style="color: #7f8c8d; font-size: 14px; margin-bottom: 8px;">
                    <strong>Company:</strong> ${user.company.name}
                  </p>
                  <p style="color: #7f8c8d; font-size: 14px;">
                    <strong>Website:</strong> <a href="http://${user.website}" target="_blank" style="color: #3498db;">${user.website}</a>
                  </p>
                </div>
              `).join('')}
            </div>
          `;
        } catch (error) {
          loading.innerHTML = `
            <div style="color: #e74c3c; text-align: center;">
              <h3>Error Loading Users</h3>
              <p>${error.message}</p>
              <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #e74c3c; color: white; border: none; border-radius: 5px; cursor: pointer;">
                Retry
              </button>
            </div>
          `;
        }
      }
    }
    customElements.define('users-page', UsersPage);
    
    class PostsPage extends HTMLElement {
      connectedCallback() {
        const paramsStr = this.getAttribute('route-params');
        const allParams = paramsStr ? JSON.parse(paramsStr) : {};
        const queryParams = allParams.query || {};
        const userId = queryParams.userId || '';

        this.innerHTML = `
          <div style="padding: 40px;">
            <h1 style="color: #2c3e50; margin-bottom: 20px;">Blog Posts from API</h1>
            
            <div style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
              <label style="display: block; margin-bottom: 10px; color: #555;">Filter by User ID:</label>
              <input type="number" id="userIdFilter" value="${userId}" placeholder="Enter user ID (1-10)" 
                style="padding: 10px; border: 1px solid #ddd; border-radius: 5px; width: 200px; margin-right: 10px;">
              <button onclick="navigateTo('/posts?userId=' + document.getElementById('userIdFilter').value)"
                style="padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer;">
                Filter
              </button>
              <button onclick="navigateTo('/posts')"
                style="padding: 10px 20px; background: #95a5a6; color: white; border: none; border-radius: 5px; cursor: pointer; margin-left: 10px;">
                Clear
              </button>
            </div>

            <div id="loading" style="text-align: center; padding: 40px; color: #666;">
              <div style="border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto;"></div>
              <p style="margin-top: 20px;">Loading posts...</p>
            </div>
            <div id="posts-container"></div>
            <style>
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            </style>
          </div>
        `;

        this.loadPosts(userId);
      }

      async loadPosts(userId) {
        const loading = this.querySelector('#loading');
        const container = this.querySelector('#posts-container');

        try {
          let url = 'https://jsonplaceholder.typicode.com/posts';
          if (userId) {
            url += `?userId=${userId}`;
          }

          const response = await fetch(url);
          const posts = await response.json();

          loading.style.display = 'none';
          
          if (posts.length === 0) {
            container.innerHTML = `
              <div style="text-align: center; padding: 40px; color: #666;">
                <p>No posts found for this user.</p>
              </div>
            `;
            return;
          }

          container.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 20px;">
              ${posts.map(post => `
                <div style="background: white; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                    <h3 style="color: #2c3e50; margin: 0; flex: 1;">${post.title}</h3>
                    <span style="background: #3498db; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; white-space: nowrap; margin-left: 10px;">
                      User ${post.userId}
                    </span>
                  </div>
                  <p style="color: #7f8c8d; line-height: 1.6; margin: 0;">${post.body}</p>
                </div>
              `).join('')}
            </div>
            <div style="margin-top: 20px; text-align: center; color: #7f8c8d;">
              Showing ${posts.length} post${posts.length !== 1 ? 's' : ''}
            </div>
          `;
        } catch (error) {
          loading.innerHTML = `
            <div style="color: #e74c3c; text-align: center;">
              <h3>Error Loading Posts</h3>
              <p>${error.message}</p>
              <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #e74c3c; color: white; border: none; border-radius: 5px; cursor: pointer;">
                Retry
              </button>
            </div>
          `;
        }
      }
    }
    customElements.define('posts-page', PostsPage);
    
     // Page demonstrating custom component usage
    class CustomComponentsPage extends HTMLElement {
      connectedCallback() {
        const tableData = [
          { name: 'Alice', age: 28, city: 'New York' },
          { name: 'Bob', age: 35, city: 'San Francisco' },
          { name: 'Charlie', age: 42, city: 'Chicago' }
        ];

        this.innerHTML = `
          <div style="padding: 40px;">
            <h1 style="color: #2c3e50; margin-bottom: 20px;">Custom Web Components</h1>
            <p style="color: #555; margin-bottom: 30px;">This page demonstrates how to use custom web components within routed pages.</p>
            
            <h2 style="color: #2c3e50; margin-top: 30px; margin-bottom: 15px;">Counter Buttons</h2>
            <div style="display: flex; gap: 10px; margin-bottom: 30px;">
              <counter-button label="Clicks" count="0"></counter-button>
              <counter-button label="Score" count="100"></counter-button>
              <counter-button label="Counter" count="5"></counter-button>
            </div>
            
            <h2 style="color: #2c3e50; margin-top: 30px; margin-bottom: 15px;">User Cards</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; margin-bottom: 30px;">
              <user-card name="Alice Johnson" email="alice@example.com" role="Administrator"></user-card>
              <user-card name="Bob Smith" email="bob@example.com" role="Developer"></user-card>
              <user-card name="Charlie Brown" email="charlie@example.com" role="Designer"></user-card>
            </div>
            
            <h2 style="color: #2c3e50; margin-top: 30px; margin-bottom: 15px;">Data Table</h2>
            <data-table data='${JSON.stringify(tableData)}'></data-table>
            
            <div style="margin-top: 40px; padding: 20px; background: #f8f9fa; border-left: 4px solid #3498db; border-radius: 4px;">
              <h3 style="color: #2c3e50; margin-top: 0;">How to Use Custom Components</h3>
              <ol style="color: #555; line-height: 1.8;">
                <li><strong>Define your component:</strong> Create a class that extends HTMLElement</li>
                <li><strong>Register the component:</strong> Use customElements.define('my-component', MyComponent)</li>
                <li><strong>Use in any page:</strong> Add &lt;my-component&gt;&lt;/my-component&gt; to your HTML</li>
                <li><strong>Pass data via attributes:</strong> &lt;my-component data="value"&gt;&lt;/my-component&gt;</li>
              </ol>
              <div style="margin-top: 20px; padding: 15px; background: #e8f5e9; border-radius: 4px;">
                <strong style="color: #2e7d32;">💡 Navigation Tip:</strong>
                <p style="color: #555; margin: 10px 0 0 0;">Use the global <code>navigateTo()</code> function for simple routing:</p>
                <code style="background: #fff; padding: 10px; display: block; margin-top: 10px; border-radius: 4px;">
                  &lt;button onclick="navigateTo('/posts')"&gt;Go to Posts&lt;/button&gt;
                </code>
              </div>
            </div>
          </div>
        `;
      }
    }
    customElements.define('custom-components-page', CustomComponentsPage);

     // Initialize router
    const router = document.getElementById('main-router');
    router.registerRoute('/', 'home-page');
    router.registerRoute('/about', 'about-page');
    router.registerRoute('/user/:id', 'user-page');
    router.registerRoute('/product/:name/:section', 'product-page');
    router.registerRoute('/search', 'search-page');
    router.registerRoute('/docs/*', 'docs-page');
    router.registerRoute('/users', 'users-page');
    router.registerRoute('/posts', 'posts-page');
    router.registerRoute('/custom', 'custom-components-page');
    
    // Navigate to home on initial load
    router.navigateTo('/');