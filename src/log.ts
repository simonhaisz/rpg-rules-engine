export enum LogLevel {
    Debug = 0,
    Info,
    Error
}

let LEVEL = LogLevel.Error;
export function setLogLevel(level: LogLevel) {
    LEVEL = level
}

function getLogLevelLabel(level: LogLevel): string {
    switch (level) {
        case LogLevel.Debug:
            return "Debug";
        case LogLevel.Info:
            return "Info";
        case LogLevel.Error:
            return "Error";
    }
}

export function debug(output: string) {
    log(output, LogLevel.Debug);
}

export function info(output: string) {
    log(output, LogLevel.Info);
}

export function error(output: string) {
    log(output, LogLevel.Error);
}

function log(output: string, level: LogLevel) {
    if (level < LEVEL) {
        return;
    }
    console.log(`${getLogLevelLabel(level)}:${output}`);
}