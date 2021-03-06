import {Action, createReducer, createSelector, on} from "@ngrx/store";
import {createEntityAdapter, EntityState} from '@ngrx/entity'
import {BookModel, calculateBooksGrossEarnings} from "src/app/shared/models";
import {BooksApiActions, BooksPageActions} from "src/app/books/actions";

export interface State extends EntityState<BookModel> {
    activeBookId: string | null;
}

const adapter = createEntityAdapter<BookModel>();

export const initialState: State = adapter.getInitialState({
    activeBookId: null
});
export const booksReducer = createReducer(
    initialState,
    on(BooksPageActions.clearSelectedBook, BooksPageActions.enter, state => {
        return {
            ...state,
            activeBookId: null
        };
    }),
    on(BooksPageActions.selectBook, (state, action) => {
        return {
            ...state,
            activeBookId: action.bookId
        };
    }),
    on(BooksApiActions.booksLoaded, (state, action) => {
        return {
            ...state,
            collection: action.books
        };
    }),
    on(BooksApiActions.bookCreated, (state, action) => {
        return adapter.addOne(action.book, {
            ...state,
            activeBookId: null
        })
    }),
    on(BooksApiActions.bookUpdated, (state, action) => {
        return adapter.updateOne(
            {id: action.book.id, changes: action.book},
            {
                ...state,
                activeBookId: null
            })
    }),
    on(BooksApiActions.bookDeleted, (state, action) => {
        return adapter.removeOne(action.bookId, state)
    })
);

export function reducer(state: State | undefined, action: Action) {
    return booksReducer(state, action);
}

export const {selectAll, selectEntities} = adapter.getSelectors();
export const selectActiveBookId = (state: State) => state.activeBookId;
export const selectActiveBook = createSelector(
    selectEntities,
    selectActiveBookId,
    (booksEntities, activeBookId) => {
        return activeBookId ? booksEntities[activeBookId]! : null;
    }
);
export const selectEarningsTotals = createSelector(
    selectAll,
    calculateBooksGrossEarnings
);
