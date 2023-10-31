import { CaseReducer, createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

export interface ITopOffSet {
    topOffSet: string;
}

type TReducer<T, S> = CaseReducer<T, PayloadAction<S>>;

const initialState: ITopOffSet = {
    topOffSet: '0 px',
};

const setTopOffSet: TReducer<ITopOffSet, string> = (state, action) => {
    state.topOffSet = action.payload;
};

export const selectTopOffSet = (state: Draft<{ topOffSetReducer: ITopOffSet }>) => state.topOffSetReducer.topOffSet;

export const {
    actions: { setTopOffSet: setTopOffSetAction },
    reducer: topOffSetReducer,
} = createSlice({
    name: 'topOffSet',
    initialState,
    reducers: {
        setTopOffSet,
    },
});
