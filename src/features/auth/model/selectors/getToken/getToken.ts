import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getToken = (state: StateSchema) => state.login.token;
