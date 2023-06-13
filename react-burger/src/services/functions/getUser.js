import { verifyToken, refreshToken } from "../actions/auth-actions";

export function getUser() {
    return async function(dispatch) {
        const accessToken = localStorage.getItem("accessToken");
            if(accessToken) {
                dispatch(verifyToken());
            } else {
                dispatch(refreshToken());
            }
    }
}