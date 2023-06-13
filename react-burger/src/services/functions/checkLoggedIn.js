import { verifyToken, refreshToken} from "../actions/auth-actions";
import { getCookie } from "./getCookie";

export function checkLoggedIn(dispatch) {
    const cookie = getCookie();
        if(cookie.accessToken) {
        dispatch(verifyToken());
        } else if (localStorage.getCookie.refreshToken) {
            dispatch(refreshToken());
        }
}