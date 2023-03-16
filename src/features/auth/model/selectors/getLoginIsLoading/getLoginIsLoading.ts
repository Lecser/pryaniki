import { StateSchema } from 'app/providers/StoreProvider/config/stateSchema';

export const getLoginIsLoading = (state: StateSchema) => state.login.isLoading;
