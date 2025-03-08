export interface ExceptionResponseBody {
  statusCode: number;
  message: string | object;
  error: any;
  description?: string
}
