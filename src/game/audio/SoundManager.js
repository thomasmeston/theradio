export class SoundManager {
    constructor() {
        this.sounds = new Map();
        this.isMuted = false;
        this.volume = 0.5; // Default volume at 50%
        this.currentTransmissionVoice = null; // Track currently playing transmission voice
        this.activeClones = new Set(); // Track all active audio clones
    }

    // Load a sound file
    loadSound(name, src) {
        const audio = new Audio(src);
        audio.volume = this.volume;
        this.sounds.set(name, audio);
    }

    // Stop any currently playing transmission voice
    stopCurrentTransmissionVoice() {
        // Stop all active clones that are transmission voices
        this.activeClones.forEach(clone => {
            if (clone.hasAttribute('data-voice-type')) {
                clone.pause();
                clone.currentTime = 0;
                this.activeClones.delete(clone);
            }
        });
        this.currentTransmissionVoice = null;
    }

    // Play a sound
    play(soundName, options = {}) {
        const sound = this.sounds.get(soundName);
        if (!sound) {
            console.error(`Sound "${soundName}" not found`);
            return;
        }

        // Stop current transmission voice if playing a new one
        if (soundName.endsWith('Voice')) {
            this.stopCurrentTransmissionVoice();
        }

        // Create a clone for this playback
        const soundClone = sound.cloneNode();
        
        // Set volume if specified
        if (options.volume !== undefined) {
            soundClone.volume = options.volume;
        }

        // Handle looping for specific sounds
        if (soundName === 'rainforest' || soundName === 'piano') {
            soundClone.loop = true;
        }

        // Add to active clones set
        this.activeClones.add(soundClone);

        // Mark transmission voices for tracking
        if (soundName.endsWith('Voice')) {
            soundClone.setAttribute('data-voice-type', soundName);
            this.currentTransmissionVoice = soundClone;
        }

        // Play the sound
        soundClone.play().catch(error => {
            console.error(`Error playing sound "${soundName}":`, error);
        });

        // Clean up when done
        soundClone.addEventListener('ended', () => {
            this.activeClones.delete(soundClone);
            if (soundName.endsWith('Voice')) {
                this.currentTransmissionVoice = null;
            }
        });
    }

    // Stop all sounds
    stopAll() {
        // Stop and clean up all active clones
        this.activeClones.forEach(clone => {
            clone.pause();
            clone.currentTime = 0;
        });
        this.activeClones.clear();
        this.currentTransmissionVoice = null;
    }

    // Set volume (0.0 to 1.0)
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        this.sounds.forEach(sound => {
            sound.volume = this.volume;
        });
        // Update volume for all active clones
        this.activeClones.forEach(clone => {
            clone.volume = this.volume;
        });
    }

    // Toggle mute
    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            this.stopAll();
        }
    }

    // Check if a sound is currently playing
    isPlaying(name) {
        const sound = this.sounds.get(name);
        return sound && !sound.paused;
    }
} 