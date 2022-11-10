
const { format, createLogger, transports} = require("winston");
const { combine, timestamp, label, printf } = format;
require('winston-daily-rotate-file');

const CATEGORY = "conceptr-cli";

const fileRotateTransport = new transports.DailyRotateFile({
    dirname:'./logger',
    filename: "debug-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    maxFiles: "14d",
    level:'debug'
});

//Using the printf format.
const customFormat = printf(({ level, message, label}) => {
    return `[${label}] ${level}: ${message} `;   
});

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'cyan',
    debug: 'green'
};

const logger = createLogger({
level: "info",
format: combine(label({ label: CATEGORY }),format.splat(),timestamp({format: "MMM-DD-YYYY HH:mm:ss"}), customFormat),
transports: [
        new transports.Console({format:combine(label({ label: CATEGORY }),format.colorize({colors:colors,message:true,level:true}), customFormat)}),
        fileRotateTransport
],
});

module.exports = logger;