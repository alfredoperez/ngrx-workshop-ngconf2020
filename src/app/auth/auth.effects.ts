import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthService} from "../shared/services/auth.service"
import {of} from "rxjs";
import {catchError, concatMap, map, tap} from "rxjs/operators";
import {AuthApiActions, AuthUserActions} from "./actions";

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private auth: AuthService) {
    }

    getAuthStatus$ = createEffect(() =>
        this.auth
            .getStatus()
            .pipe(map(userOrNull => AuthApiActions.getAuthStatusSuccess(userOrNull)))
    );

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthUserActions.login),
            concatMap(action => {
                return this.auth.login(action.credentials.username, action.credentials.password).pipe(
                    map(user => AuthApiActions.loginSuccess(user)),
                    catchError(reason => of(AuthApiActions.loginFailure(reason)))
                );
            })
        )
    );

    logout$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthUserActions.logout),
                tap(() => this.auth.logout())
            ),
        {dispatch: false}
    );
}
