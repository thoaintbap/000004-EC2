const winston = require('winston');
const moment = require('moment');

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(
      ({ level, message }) => `${level}: ${moment().format('MM-DD-YYYY HH:mm:ss')} ${message}`,
    ),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'logs/server.log',
    }),
  ],
});

module.exports = logger;
