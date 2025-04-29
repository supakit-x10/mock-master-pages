export interface Usecase<T> {
  data: T;
  error: boolean;
  message: string;
  description: string;
}
