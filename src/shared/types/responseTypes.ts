export interface ResponseType<T = {}> {
  error_code: number;
  error_text?: string;
  error_message?: string;
  data: T;
}
