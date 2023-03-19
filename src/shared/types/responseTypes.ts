export interface ResponseType<T = {}> {
  error_code: number;
  error_text?: string;
  error_message?: string;
  data: T;
}

export const enum ErrorCode {
  OK = 0,
  Error = 2004
}
