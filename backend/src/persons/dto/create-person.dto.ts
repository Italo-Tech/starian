import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsDateString,
  MaxLength,
  Matches,
} from 'class-validator';
import { IsCpf } from '../../common/validators/cpf.validator';

export class CreatePersonDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString({ message: 'O nome deve ser uma string' })
  @MaxLength(150, { message: 'O nome deve ter no máximo 150 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  @IsEmail({}, { message: 'E-mail inválido' })
  @MaxLength(150, { message: 'O e-mail deve ter no máximo 150 caracteres' })
  email: string;

  @IsNotEmpty({ message: 'O CPF é obrigatório' })
  @IsCpf({ message: 'CPF inválido' })
  cpf: string;

  @IsNotEmpty({ message: 'A data de nascimento é obrigatória' })
  @IsDateString({}, { message: 'Data de nascimento inválida' })
  birthDate: string;

  @IsNotEmpty({ message: 'O telefone é obrigatório' })
  @IsString({ message: 'O telefone deve ser uma string' })
  @Matches(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, {
    message: 'Telefone inválido. Use o formato (XX) XXXXX-XXXX',
  })
  phone: string;
}
