import {createAction} from "@ngrx/store";

export interface LoginRequiredProps {
    username: string;
    password: string;
}

export const login = createAction(
    '[Auth User] Login',
    (credentials: LoginRequiredProps) => ({credentials})
);

export const logout = createAction(
    '[Auth User] Logout',
);
