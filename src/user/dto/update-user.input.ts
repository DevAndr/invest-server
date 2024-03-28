import { CreateUserInput } from './create-user.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserInput extends PartialType(CreateUserInput) {
  id: number;
}

export type UpdateDataUserDto = {
  email?: string;
  username?: string;
  status?: string;
};

export type UpdateEmailDto = {
  id: string;
  email: string;
};

export type UpdateUsernameDto = {
  id: string;
  username: string;
};

export type UpdateStatusDto = {
  id: string;
  status: string;
};