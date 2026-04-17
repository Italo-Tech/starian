import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person)
    private readonly personsRepository: Repository<Person>,
  ) { }

  async findAll(): Promise<Person[]> {
    return this.personsRepository.find({ order: { name: 'ASC' } });
  }

  async findOne(id: number): Promise<Person> {
    const person = await this.personsRepository.findOneBy({ id });

    if (!person) {
      throw new NotFoundException(`Pessoa com ID ${id} não encontrada`);
    }

    return person;
  }

  async create(dto: CreatePersonDto): Promise<Person> {
    await this.checkUniqueConstraints(dto.email, dto.cpf);

    const person = this.personsRepository.create(dto);
    return this.personsRepository.save(person);
  }

  async update(id: number, dto: UpdatePersonDto): Promise<Person> {
    const person = await this.findOne(id);

    if (dto.email && dto.email !== person.email) {
      await this.checkEmailUnique(dto.email);
    }

    if (dto.cpf && dto.cpf !== person.cpf) {
      await this.checkCpfUnique(dto.cpf);
    }

    Object.assign(person, dto);
    return this.personsRepository.save(person);
  }

  async remove(id: number): Promise<void> {
    const person = await this.findOne(id);
    await this.personsRepository.remove(person);
  }

  private async checkUniqueConstraints(
    email: string,
    cpf: string,
  ): Promise<void> {
    await this.checkEmailUnique(email);
    await this.checkCpfUnique(cpf);
  }

  private async checkEmailUnique(email: string): Promise<void> {
    const existing = await this.personsRepository.findOneBy({ email });
    if (existing) {
      throw new ConflictException('Já existe uma pessoa com este e-mail');
    }
  }

  private async checkCpfUnique(cpf: string): Promise<void> {
    const existing = await this.personsRepository.findOneBy({ cpf });
    if (existing) {
      throw new ConflictException('Já existe uma pessoa com este CPF');
    }
  }
}
