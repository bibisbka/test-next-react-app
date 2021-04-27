import {
  configureStore,
  combineReducers,
  ThunkDispatch,
  AnyAction
} from '@reduxjs/toolkit'

import {PostsInitialStateType, postsSlice} from './postsSlice';
import {Context, createWrapper, HYDRATE, MakeStore} from "next-redux-wrapper";
import {Env} from '../constants/Env';

const rootReducer = combineReducers({
  posts: postsSlice.reducer
})

const combineReducer=combineReducers({posts: postsSlice.reducer});

const reducer=(state:AppState, action:AnyAction)=>{
  switch (action.type) {
    case HYDRATE: return action.payload
    default: {
      return combineReducer(state, action)
    }
  }
}

const store = configureStore({reducer: reducer, devTools: Env.NODE_ENV === "development"})

const makeStore: MakeStore<AppState> = (context: Context) => store

export const wrapper = createWrapper<AppState>(makeStore, {debug: true})

export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof combineReducer>
export type NextThunkDispatch = ThunkDispatch<AppState, void, AnyAction>
