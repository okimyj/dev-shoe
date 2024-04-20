export type Error = {
  code: string;
  message: string;
};
export type CommonResponse = {
  data?: any;
  error?: Error;
};
