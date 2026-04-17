export interface Person {
  id: number;
  name: string;
  email: string;
  cpf: string;
  birthDate: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface PersonFormData {
  name: string;
  email: string;
  cpf: string;
  birthDate: string;
  phone: string;
}

export interface ApiError {
  statusCode: number;
  message: string | string[];
  error: string;
  timestamp: string;
}
