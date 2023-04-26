import { User } from './persons.model';

export interface UserResponse {
  accessToken: string;
  user: User
}
