interface CommonResponse {
  data?: any;
  error?: any;
}
declare interface Platform {
  signup(email: string, password: string): Promise<CommonResponse>;
  signin(email: string, password: string): Promise<CommonResponse>;
}
