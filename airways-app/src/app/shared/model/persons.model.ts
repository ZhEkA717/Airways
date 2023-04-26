export interface Person {
  id?: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: Gender;
}

export interface User extends Person {
  email: string;
  password?: string;
  phone: Phone
}

export interface Passenger extends Person {
  age: number;
  isNeedAssistance: boolean;
  baggage?: number;
  userId: number;
}

export type Gender = 'Male' | 'Female';

export type Phone = {
  code: string;
  number: string;
};
