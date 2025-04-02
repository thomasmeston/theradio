export class RadioImage {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.isInitialized = false;
        
        // Create container
        this.container = document.createElement('div');
        this.container.id = 'radio-container';
        document.body.appendChild(this.container);
        
        // Initialize after DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initialize());
        } else {
            this.initialize();
        }
    }

    initialize() {
        if (!this.gameEngine || !this.gameEngine.state) {
            console.warn('GameEngine not ready, waiting for initialization...');
            setTimeout(() => this.initialize(), 100);
            return;
        }

        this.createRadioImage();
        this.isInitialized = true;
    }

    createRadioImage() {
        // Create the main radio image container
        const radioImage = document.createElement('div');
        radioImage.className = 'radio-image';
        
        // Create frequency display first
        const freqDisplay = document.createElement('div');
        freqDisplay.className = 'frequency-display';
        freqDisplay.id = 'current-frequency';
        radioImage.appendChild(freqDisplay);
        
        // Create frequency controls container
        const freqControls = document.createElement('div');
        freqControls.className = 'frequency-controls';
        
        // Create left arrow
        const leftArrow = document.createElement('button');
        leftArrow.className = 'frequency-arrow';
        leftArrow.innerHTML = '◀';
        freqControls.appendChild(leftArrow);
        
        // Create right arrow
        const rightArrow = document.createElement('button');
        rightArrow.className = 'frequency-arrow';
        rightArrow.innerHTML = '▶';
        freqControls.appendChild(rightArrow);
        
        // Add frequency controls to radio image
        radioImage.appendChild(freqControls);

        // Create VU meters container
        const vuMeters = document.createElement('div');
        vuMeters.className = 'vu-meters';
        
        // Create three VU meters
        for (let i = 0; i < 3; i++) {
            const meter = document.createElement('div');
            meter.className = 'vu-meter';
            const needle = document.createElement('div');
            needle.className = 'vu-needle';
            meter.appendChild(needle);
            vuMeters.appendChild(meter);
        }
        
        radioImage.appendChild(vuMeters);

        // Create controls section
        const controls = document.createElement('div');
        controls.className = 'controls-section';
        
        // Create knobs with labels
        const knobLabels = ['RF GAIN', 'TUNE', 'ANT TRIMMER', 'RECEIVE'];
        knobLabels.forEach(label => {
            const knobContainer = document.createElement('div');
            knobContainer.className = 'knob-container';
            
            const knob = document.createElement('div');
            knob.className = `knob ${label.toLowerCase().replace(' ', '-')}-knob`;
            
            const indicator = document.createElement('div');
            indicator.className = 'knob-indicator';
            knob.appendChild(indicator);
            
            // Add knob to container first
            knobContainer.appendChild(knob);
            
            if (label === 'TUNE') {
                // Tune knob specific styling can be added here if needed
            }
            
            const labelDiv = document.createElement('div');
            labelDiv.className = 'knob-label';
            labelDiv.textContent = label;
            knobContainer.appendChild(labelDiv);
            
            controls.appendChild(knobContainer);
        });
        
        radioImage.appendChild(controls);
        
        // Add radio image to container
        this.container.appendChild(radioImage);
        
        // Set up event listeners for the tune knob
        this.setupTuneKnob();
        
        // Update initial frequency display
        this.updateFrequency(this.gameEngine.state.currentFrequency);

        // Update event listeners
        leftArrow.addEventListener('click', () => {
            this.gameEngine.tuneFrequency(-1);
        });
        
        rightArrow.addEventListener('click', () => {
            this.gameEngine.tuneFrequency(1);
        });
    }

    setupTuneKnob() {
        const tuneKnob = this.container.querySelector('.tune-knob');
        if (!tuneKnob) return;

        let isDragging = false;
        let startAngle = 0;
        let currentRotation = 0;

        const handleMouseDown = (e) => {
            const rect = tuneKnob.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            isDragging = true;
            startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
            currentRotation = this.getCurrentRotation(tuneKnob);
        };

        const handleMouseMove = (e) => {
            if (!isDragging) return;

            const rect = tuneKnob.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
            let rotation = (currentRotation + (currentAngle - startAngle) * (180 / Math.PI)) % 360;
            
            if (rotation < 0) rotation += 360;
            
            // Only rotate the knob and its indicator
            tuneKnob.style.transform = `rotate(${rotation}deg)`;
            
            // Find nearest frequency
            const frequencies = this.gameEngine.state.availableFrequencies;
            const markerCount = frequencies.length;
            const angleStep = 360 / markerCount;
            const index = Math.round(rotation / angleStep) % markerCount;
            const frequency = frequencies[index];
            
            if (frequency !== this.gameEngine.state.currentFrequency) {
                this.gameEngine.changeFrequency(frequency);
                this.updateFrequency(frequency);
            }
        };

        const handleMouseUp = () => {
            isDragging = false;
        };

        tuneKnob.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }

    getCurrentRotation(element) {
        const transform = window.getComputedStyle(element).transform;
        if (transform === 'none') return 0;
        
        const values = transform.split('(')[1].split(')')[0].split(',');
        const a = values[0];
        const b = values[1];
        return Math.round(Math.atan2(b, a) * (180 / Math.PI));
    }

    updateFrequency(frequency) {
        // Update frequency display
        const display = this.container.querySelector('#current-frequency');
        if (display) {
            display.textContent = `${frequency.toFixed(1)} MHz`;
            display.classList.add('frequency-update');
            setTimeout(() => display.classList.remove('frequency-update'), 300);
        }

        // Update tune knob position
        const tuneKnob = this.container.querySelector('.tune-knob');
        if (tuneKnob) {
            const frequencies = this.gameEngine.state.availableFrequencies;
            const index = frequencies.indexOf(frequency);
            const rotation = (index / frequencies.length) * 360;
            tuneKnob.style.transform = `rotate(${rotation}deg)`;
        }
    }

    createMeterDials() {
        // Create meter dials
        for (let i = 0; i < 5; i++) {
            const dial = document.createElement('div');
            dial.className = 'meter-dial active';
            dial.style.left = `${20 + (i * 15)}px`;
            dial.style.bottom = '20px';
            this.meterContainer.appendChild(dial);
        }
    }
} 