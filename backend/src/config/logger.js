const winston = require('winston');
const { Loggly } = require('winston-loggly-bulk');

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/application.log' }), // Transporte para arquivo
        new Loggly({
            token: "e9d43edc-73a4-4d3d-ade5-96bab951206d",
            subdomain: "testeGlauco",
            tags: ["Winston-NodeJS"],
            json: true
        })
    ]
});

// Verifica se a pasta 'logs' existe e a cria, se necessário
const fs = require('fs');
const path = require('path');
const logDir = path.dirname('logs/application.log');

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

module.exports = logger;
