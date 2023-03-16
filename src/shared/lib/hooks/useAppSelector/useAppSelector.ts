import { StateSchema } from 'app/providers/StoreProvider/config/stateSchema';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector;
