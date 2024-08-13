const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Definindo os níveis de log
const levels = {
  critical: 0,
  error: 1,
  warning: 2,
  info: 3,
  debug: 4
};

// Criando o logger com os níveis definidos
const logger = createLogger({
  levels,
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console({
      level: 'debug', // Aqui define o nível de log que aparece no console
    }),
    new transports.File({
      filename: 'file.log',
      level: 'debug', // Define o nível de log para o arquivo como 'debug'
    })
  ],
});

module.exports = logger;
