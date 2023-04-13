import { Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import HomeSlice from "../HomeSlice";
const store = configureStore({
    reducer: {
        homeslice:HomeSlice,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  });
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
  export default store;