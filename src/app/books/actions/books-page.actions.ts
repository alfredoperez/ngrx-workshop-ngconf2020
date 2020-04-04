import { createAction, props } from "@ngrx/store";
import { BookRequiredProps } from "src/app/shared/models";


export const enter = createAction(
    '[Books Page] Enter'
);

export const createBook = createAction(
    '[Books Page] Create a book',
    props<{book: BookRequiredProps}>()
);

export const selectBook = createAction(
    '[Books Page] Select a book',
    props<{bookId: string}>()
);

export const clearSelectedBook = createAction(
    '[Books Page] Cancel edit a book'
);

export const updateBook = createAction(
    '[Books Page] Update a book',
    props<{
        book: BookRequiredProps,
        bookId: string
    }>()
);

export const deleteBook = createAction(
    '[Books Page] Delete a book',
    props<{ bookId: string }>()
);


