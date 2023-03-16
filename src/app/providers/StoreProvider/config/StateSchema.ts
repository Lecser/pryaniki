import { AxiosInstance } from 'axios';
import { UserSchema } from 'entities/user';
import { LoginSchema } from 'features/Auth/types/loginSchema';

export interface StateSchema {
  login: LoginSchema;
  user: UserSchema;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}
