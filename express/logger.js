import { createLogger, format, transports } from "winston";
const { combine, timestamp, json, printf, colorize } = format;

// Custom format for console logging with colors
const consoleLogFormat = combine(
    colorize(),

    printf(({ level, message, timestamp, ...metadata }) => {
        // 1. Handle the message (could be string or object)
        let output = typeof message === 'object' ? JSON.stringify(message) : message;

        // 2. Handle metadata (extra properties passed in an object)
        // We exclude symbols that Winston adds internally
        const cleanMetadata = { ...metadata };
        delete cleanMetadata[Symbol.for('level')];
        delete cleanMetadata[Symbol.for('message')];
        delete cleanMetadata[Symbol.for('splat')];

        const extra = Object.keys(cleanMetadata).length
            ? ` | ${JSON.stringify(cleanMetadata)}`
            : "";

        return `[${level}] ${timestamp}: ${output}${extra}`;
    })
);

const logger = createLogger({
    level: "info", // Default minimum level to capture
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        json()
    ),
    transports: [
        // 1. Capture EVERYTHING (info, warn, error) in one file
        new transports.File({ filename: "logger/combined.log" }),

        // 2. Capture ONLY 'warn' and 'error' (higher priority) in a separate file
        new transports.File({
            filename: "logger/app-warn.log",
            level: "warn"
        }),

        // 3. Capture ONLY 'error' in its own file
        new transports.File({
            filename: "logger/app-error.log",
            level: "error"
        }),

        // 4. Console logging with colors
        new transports.Console({
            format: consoleLogFormat,
        }),
    ],
});

export default logger;
