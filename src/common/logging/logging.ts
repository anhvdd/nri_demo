import * as path from "path";
import * as winston from "winston";
import "winston-daily-rotate-file";
import config from "../../config/environment/config";

const logDirectory = path.join(__dirname, "../../../logs");
const logger = winston.createLogger({
  level: config.logLevel,
  format: winston.format.combine(
    // winston.format.colorize({ all: true }),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.json(),
    winston.format.printf((info) => {
      return `${info.timestamp} [${info.level}] [${info.context}]: ${info.message}\n ${info.stack}`;
    }),
    winston.format.align()
  ),
  transports: [
    new winston.transports.DailyRotateFile({
      filename: path.join(logDirectory, "error_logs-%DATE%.log"),
      level: "error",
      datePattern: "YYYY-MM-DD",
    }),
    new winston.transports.Console(),
    // winston.format.json(),
  ],
});

export default logger;
