import { SigInInput } from '../../graphql/graphql';
export class CreateUserInput implements SigInInput {
  username: string;
  password: string;
  email: string;
}
