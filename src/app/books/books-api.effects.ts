import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {concatMap, exhaustMap, map, mergeMap} from "rxjs/operators";
import {BooksService} from "../shared/services";
import {BooksApiActions, BooksPageActions} from "./actions";


@Injectable()
export class BooksApiEffects {
    constructor(private actions$: Actions, private booksService: BooksService) {
    }

    getAllBooks$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(BooksPageActions.enter),
            exhaustMap((action) => {
                return this.booksService
                    .all()
                    .pipe(
                        map((books: any) => BooksApiActions.booksLoaded({books}))
                    )
            })
        )
    });

    createBook$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BooksPageActions.createBook),
            concatMap(action =>
                this.booksService
                    .create(action.book)
                    .pipe(map(book => BooksApiActions.bookCreated({book})))
            )
        )
    );

    updateBook$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BooksPageActions.updateBook),
            concatMap(({bookId, book}) =>
                this.booksService
                    .update(bookId, book)
                    .pipe(map(book => BooksApiActions.bookUpdated({book})))
            )
        )
    );

    deleteBook$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BooksPageActions.deleteBook),
            mergeMap(action =>
                this.booksService
                    .delete(action.bookId)
                    .pipe(
                        map(() => BooksApiActions.bookDeleted({bookId: action.bookId}))
                    )
            )
        )
    );


}
