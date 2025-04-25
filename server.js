const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the src directory
app.use(express.static('src', {
    setHeaders: (res, filePath) => {
        // Set correct MIME types for different file types
        if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        } else if (filePath.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        } else if (filePath.endsWith('.png')) {
            res.setHeader('Content-Type', 'image/png');
        } else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
            res.setHeader('Content-Type', 'image/jpeg');
        } else if (filePath.endsWith('.wav')) {
            res.setHeader('Content-Type', 'audio/wav');
        } else if (filePath.endsWith('.mp3')) {
            res.setHeader('Content-Type', 'audio/mpeg');
        }
    }
}));

// Serve static files from the root directory
app.use(express.static('./'));

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Function to find an available port
const findAvailablePort = (startPort) => {
    return new Promise((resolve, reject) => {
        const server = require('net').createServer();
        
        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                resolve(findAvailablePort(startPort + 1));
            } else {
                reject(err);
            }
        });

        server.listen(startPort, () => {
            server.close(() => {
                resolve(startPort);
            });
        });
    });
};

// Start the server
const startServer = async () => {
    try {
        const port = await findAvailablePort(9000);
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
};

startServer(); 