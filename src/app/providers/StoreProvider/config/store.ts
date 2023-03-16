import { userReducer } from 'entities/user';
import { loginReducer } from 'features/auth';
import { $api } from 'shared/api/api/api';

import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';

import { StateSchema, ThunkExtraArg } from './StateSchema';

export function createReduxStore(initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    login: loginReducer,
    user: userReducer
  };

  const extraArg: ThunkExtraArg = {
    api: $api
  };

  return configureStore({
    reducer: rootReducers,
    devTools: IS_DEV,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg
        }
      })
  });
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
