/**
 * @author: leroy
 * @date: 2021/8/23 16:09
 * @description：监听 AsyncThunk loading 状态
 */
import type { AnyAction, AsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

export function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.endsWith('/pending');
}
export function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('/rejected');
}
export function isFulfilledAction(action: AnyAction): action is FulfilledAction {
  return action.type.endsWith('/fulfilled');
}

export type LoadingState = Record<string, boolean>;

const initialState: LoadingState = {};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addMatcher(isPendingAction, (state, action) => {
        const type = action.type.replace('/pending', '');
        state[type] = true;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        const type = action.type.replace('/rejected', '');
        state[type] = false;
      })
      // matcher can just return boolean and the matcher can receive a generic argument
      .addMatcher(isFulfilledAction, (state, action) => {
        const type = action.type.replace('/fulfilled', '');
        state[type] = false;
      });
  },
});

export default loadingSlice.reducer;
