export interface Passenger {
  id: string;
  age: number;
  birthDate: string;
  gender: Gender;
  firstName: string;
  lastName: string;
  isNeedAssistance: boolean;
}

export type Gender = 'male' | 'female';
