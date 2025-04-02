# Military Radio Game

A web-based game where players interact with a military radio interface to receive and respond to transmissions from various factions.

## Play the Game

Visit [https://YOUR_USERNAME.github.io/REPOSITORY_NAME](https://YOUR_USERNAME.github.io/REPOSITORY_NAME) to play the game directly in your browser.

## Features

- Interactive military radio interface
- Multiple faction interactions
- Resource management system
- Dynamic transmission system
- Retro-styled UI with authentic radio sounds

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/REPOSITORY_NAME.git
cd REPOSITORY_NAME
```

2. Start a local server (you can use any of these methods):
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

3. Open your browser and navigate to `http://localhost:8000`

## Directory Structure

```
├── index.html
├── README.md
├── src/
│   ├── assets/
│   │   ├── sounds/
│   │   │   ├── ElevenLabs_Explorer_1.mp3
│   │   │   ├── ElevenLabs_Military_1.mp3
│   │   │   ├── ElevenLabs_Shaman_1.mp3
│   │   │   └── ElevenLabs_Seer_1.mp3
│   │   ├── radio.png
│   │   ├── notebook_paper.png
│   │   └── favicon.png
│   ├── game/
│   │   ├── GameEngine.js
│   │   ├── SoundManager.js
│   │   └── ui/
│   │       └── RadioImage.js
│   ├── styles.css
│   └── main.js
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 