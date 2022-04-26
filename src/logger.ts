const empty = {
  error: (_message?: any, ..._optionalParams: any[]) => {},
  info: (_message?: any, ..._optionalParams: any[]) => {},
  warn: (_message?: any, ..._optionalParams: any[]) => {}
};

export const logger: ILogger = empty;

if (process.env.NODE_ENV === "production") {
}

export interface ILogger {
  error(message?: any, ...optionalParams: any[]): void;
  info(message?: any, ...optionalParams: any[]): void;
  warn(message?: any, ...optionalParams: any[]): void;
}
