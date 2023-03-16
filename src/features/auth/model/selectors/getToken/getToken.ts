import { StateSchema } from 'app/providers/StoreProvider/config/stateSchema';

export const getToken = (state: StateSchema) => state.login.token;
