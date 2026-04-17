import api from './api';
import type { Person, PersonFormData } from '../types/person';

export const personService = {
  async getAll(): Promise<Person[]> {
    const { data } = await api.get<Person[]>('/persons');
    return data;
  },

  async getById(id: number): Promise<Person> {
    const { data } = await api.get<Person>(`/persons/${id}`);
    return data;
  },

  async create(person: PersonFormData): Promise<Person> {
    const { data } = await api.post<Person>('/persons', person);
    return data;
  },

  async update(id: number, person: Partial<PersonFormData>): Promise<Person> {
    const { data } = await api.put<Person>(`/persons/${id}`, person);
    return data;
  },

  async remove(id: number): Promise<void> {
    await api.delete(`/persons/${id}`);
  },
};
