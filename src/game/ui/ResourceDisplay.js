export class ResourceDisplay {
    constructor(gameEngine) {
        if (!gameEngine || !gameEngine.state || !gameEngine.state.resources) {
            console.error('GameEngine instance with resources is required for ResourceDisplay');
            return;
        }

        this.gameEngine = gameEngine;
        this.container = document.createElement('div');
        this.container.className = 'resource-display';
        document.body.appendChild(this.container);
        
        // Create resource elements
        this.resourceElements = {};
        this.createResourceElements();
        
        // Listen for resource updates
        this.gameEngine.on('resourceUpdate', (data) => this.updateResource(data));
    }

    createResourceElements() {
        const resources = this.gameEngine.state.resources;
        if (!resources) {
            console.error('Resources not found in game engine state');
            return;
        }

        Object.entries(resources).forEach(([resource, value]) => {
            const element = document.createElement('div');
            element.className = 'resource-item';
            element.innerHTML = `
                <div class="resource-icon ${resource}"></div>
                <div class="resource-name">${resource.toUpperCase()}</div>
                <div class="resource-value">${value}</div>
            `;
            this.resourceElements[resource] = element;
            this.container.appendChild(element);
        });
    }

    updateResource(data) {
        if (!data || !data.resource) {
            console.error('Invalid resource update data');
            return;
        }

        const element = this.resourceElements[data.resource];
        if (element) {
            const valueElement = element.querySelector('.resource-value');
            if (valueElement) {
                valueElement.textContent = this.gameEngine.state.resources[data.resource];
                
                // Add animation class
                valueElement.classList.add('resource-update');
                setTimeout(() => {
                    valueElement.classList.remove('resource-update');
                }, 1000);
            }
        }
    }
} 