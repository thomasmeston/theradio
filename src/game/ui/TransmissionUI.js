export class TransmissionUI {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        
        // Create and initialize all UI elements
        this.initializeUI();
    }

    initializeUI() {
        // Create game UI container first
        this.gameUI = document.createElement('div');
        this.gameUI.id = 'game-ui';
        this.gameUI.className = 'game-ui';
        document.body.appendChild(this.gameUI);
        
        // Create transmission info container
        this.transmissionInfo = document.createElement('div');
        this.transmissionInfo.className = 'transmission-info';
        this.transmissionInfo.style.display = 'none';
        this.gameUI.appendChild(this.transmissionInfo);
        
        // Create response box container
        this.responseBox = document.createElement('div');
        this.responseBox.className = 'response-box';
        this.responseBox.style.display = 'none';
        
        // Create choices container
        this.choicesContainer = document.createElement('div');
        this.choicesContainer.className = 'choices-container';
        this.responseBox.appendChild(this.choicesContainer);
        
        // Add response box to game UI
        this.gameUI.appendChild(this.responseBox);

        // Create log container
        this.logContainer = document.createElement('div');
        this.logContainer.className = 'log-container';
        this.gameUI.appendChild(this.logContainer);

        // Add resize handle
        this.setupResizeHandle();
    }

    setupResizeHandle() {
        if (!this.gameUI) {
            console.error('Game UI element not initialized');
            return;
        }

        const resizeHandle = document.createElement('div');
        resizeHandle.className = 'resize-handle';
        this.gameUI.insertBefore(resizeHandle, this.gameUI.firstChild);

        let startY, startHeight;
        const resize = (e) => {
            const newHeight = startHeight - (e.clientY - startY);
            this.gameUI.style.height = `${Math.max(200, Math.min(window.innerHeight - 100, newHeight))}px`;
        };

        const stopResize = () => {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResize);
        };

        resizeHandle.addEventListener('mousedown', (e) => {
            startY = e.clientY;
            startHeight = this.gameUI.offsetHeight;
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResize);
        });
    }

    showChoices(transmission) {
        if (!transmission || !transmission.choices) {
            console.error('Invalid transmission or missing choices');
            return;
        }

        // Clear previous choices
        this.choicesContainer.innerHTML = '';
        
        // Update transmission info
        this.transmissionInfo.innerHTML = `
            <div class="sender">${transmission.sender || 'Unknown'}</div>
            <div class="message">${transmission.message || 'No message'}</div>
        `;
        this.transmissionInfo.style.display = 'block';

        // Add choice buttons
        transmission.choices.forEach(choice => {
            if (!choice || !choice.text) {
                console.error('Invalid choice object');
                return;
            }

            const button = document.createElement('button');
            button.className = 'choice-button';
            button.textContent = choice.text;
            button.addEventListener('click', () => this.handleChoice(choice));
            this.choicesContainer.appendChild(button);
        });

        // Show response box
        this.responseBox.style.display = 'block';
    }

    handleChoice(choice) {
        // Play radio beep sound
        this.gameEngine.soundManager.play('radioBeep');

        // Hide the response box
        this.responseBox.style.display = 'none';
        
        // Apply consequences
        if (choice.consequences) {
            // Update resources
            if (choice.consequences.resources) {
                Object.entries(choice.consequences.resources).forEach(([resource, change]) => {
                    this.gameEngine.updateResource(resource, change);
                });
            }
            
            // Update faction trust
            Object.entries(choice.consequences).forEach(([faction, changes]) => {
                if (faction !== 'resources' && changes.trust) {
                    this.gameEngine.updateFactionTrust(faction, changes.trust);
                }
            });
        }
        
        // Add response to log
        this.gameEngine.addToLog(`Response: ${choice.text}`, 'response');
    }

    addToLog(message, type = 'transmission') {
        const logEntry = document.createElement('div');
        logEntry.className = `log-entry ${type}`;
        
        // Add timestamp
        const timestamp = document.createElement('span');
        timestamp.className = 'timestamp';
        const now = new Date();
        timestamp.textContent = now.toLocaleTimeString();
        logEntry.appendChild(timestamp);

        // Add message content
        const messageContent = document.createElement('span');
        messageContent.className = 'message-content';
        messageContent.textContent = message;
        logEntry.appendChild(messageContent);

        // Add to log container
        this.logContainer.appendChild(logEntry);
        
        // Scroll to bottom
        this.logContainer.scrollTop = this.logContainer.scrollHeight;

        // If this is a transmission, trigger meter dial animation
        if (type === 'transmission') {
            this.triggerMeterSweep();
        }
    }

    triggerMeterSweep() {
        // Get all meter dials
        const meterDials = document.querySelectorAll('.meter-dial');
        
        // Add animation class to all dials
        meterDials.forEach(dial => {
            dial.classList.add('meter-sweep');
        });

        // Remove animation after 2 seconds
        setTimeout(() => {
            meterDials.forEach(dial => {
                dial.classList.remove('meter-sweep');
            });
        }, 2000);
    }
} 