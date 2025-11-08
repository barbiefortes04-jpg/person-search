// types.ts
export interface Person {
  id: number;
  name: string;
  age: number;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  details?: any;
}

// Validation schemas types
export interface CreatePersonData {
  name: string;
  age: number;
  email: string;
}

export interface UpdatePersonData extends Partial<CreatePersonData> {
  id: number;
}