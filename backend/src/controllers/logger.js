const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const levels = {
  critical: 0,
  error: 1,
  warning: 2,
  info: 3,
  debug: 4
};

const logger = createLogger({
  levels,
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console({
      level: 'debug',
    }),
    new transports.File({
      filename: 'file.log',
      level: 'debug', 
    })
  ],
});

module.exports = logger;
