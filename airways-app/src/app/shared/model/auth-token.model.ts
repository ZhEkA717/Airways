export interface AuthToken {
  error?: string;
  email: string;
  iat: number; // datetime
  exp: number; // datetime
  sub: string;
}
