// Example: Custom reusable components
class CounterButton extends HTMLElement {
    connectedCallback() {
    const initialCount = parseInt(this.getAttribute('count') || '0');
    const label = this.getAttribute('label') || 'Click me';
    
    this.count = initialCount;
    this.render(label);
    
    this.querySelector('button').addEventListener('click', () => {
        this.count++;
        this.querySelector('.count').textContent = this.count;
    });
    }
    
    render(label) {
    this.innerHTML = `
        <button style="padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
        ${label}: <span class="count">${this.count}</span>
        </button>
    `;
    }
}
customElements.define('counter-button', CounterButton);

class UserCard extends HTMLElement {
    connectedCallback() {
    const name = this.getAttribute('name') || 'Unknown';
    const email = this.getAttribute('email') || '';
    const role = this.getAttribute('role') || 'User';
    
    this.innerHTML = `
        <div style="background: white; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
            <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: bold;">
            ${name.charAt(0).toUpperCase()}
            </div>
            <div>
            <h3 style="margin: 0; color: #2c3e50;">${name}</h3>
            <p style="margin: 5px 0 0 0; color: #7f8c8d; font-size: 14px;">${email}</p>
            </div>
        </div>
        <div style="display: inline-block; background: #e8f5e9; color: #2e7d32; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: 500;">
            ${role}
        </div>
        </div>
    `;
    }
}
customElements.define('user-card', UserCard);

class DataTable extends HTMLElement {
    connectedCallback() {
    const dataStr = this.getAttribute('data');
    const data = dataStr ? JSON.parse(dataStr) : [];
    
    if (data.length === 0) {
        this.innerHTML = '<p>No data available</p>';
        return;
    }
    
    const headers = Object.keys(data[0]);
    
    this.innerHTML = `
        <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <thead>
            <tr style="background: #2c3e50; color: white;">
                ${headers.map(h => `<th style="padding: 15px; text-align: left; font-weight: 500;">${h}</th>`).join('')}
            </tr>
            </thead>
            <tbody>
            ${data.map((row, i) => `
                <tr style="border-bottom: 1px solid #e0e0e0; ${i % 2 === 0 ? 'background: #f8f9fa;' : ''}">
                ${headers.map(h => `<td style="padding: 15px;">${row[h]}</td>`).join('')}
                </tr>
            `).join('')}
            </tbody>
        </table>
        </div>
    `;
    }
}
customElements.define('data-table', DataTable);