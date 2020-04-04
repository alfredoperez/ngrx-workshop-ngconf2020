import {Action, ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer} from "@ngrx/store";
import * as fromBooks from "./books.reducer";
import * as fromAuth from "./auth.reducer";
import {logoutMetareducer} from "./logout.metareducer";

const AUTH_FEATURE_KEY = "auth";

export interface State {
    books: fromBooks.State,
    [AUTH_FEATURE_KEY]: fromAuth.State
}

export const reducers: ActionReducerMap<State> = {
    books: fromBooks.reducer,
    [AUTH_FEATURE_KEY]: fromAuth.reducer
};

const logger = (reducer: ActionReducer<any, any>) => (state: any, action: Action) => {
    console.log('Previous State', state);
    console.log('Action', action);

    const nextState = reducer(state, action);

    console.log('Next State', nextState);
    return nextState;
};

export const metaReducers: MetaReducer<State>[] = [logger, logoutMetareducer];

/**
 * Books Selectors
 */
export const selectBooksState = (state: State) => state.books;
export const selectAllBooks = createSelector(
    selectBooksState,
    fromBooks.selectAll
);
export const selectActiveBook = createSelector(
    selectBooksState,
    fromBooks.selectActiveBook
);
export const selectBooksEarningsTotals = createSelector(
    selectBooksState,
    fromBooks.selectEarningsTotals
);

/**
 * Auth Selectors
 */
export const selectAuthState = createFeatureSelector<fromAuth.State>(AUTH_FEATURE_KEY);
export const selectAuthGettingStatus = createSelector(
    selectAuthState,
    fromAuth.selectGettingStatus
);
export const selectAuthError = createSelector(
    selectAuthState,
    fromAuth.selectError
);
export const selectAuthUser = createSelector(
    selectAuthState,
    fromAuth.selectUser
);
