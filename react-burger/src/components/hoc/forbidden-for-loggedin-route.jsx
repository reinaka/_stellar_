import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectLoginSuccess } from "../../services/functions/selectorFunctions";
import { useEffect } from "react";
import { checkAccess } from "../../services/functions/checkAccess";

export const ForbiddenForLoggedInRoute = ({ element }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");
    
    const access = useSelector(selectLoginSuccess);
    useEffect(() => {
        checkAccess(dispatch);
        if(access && accessToken) {
            console.log("navigated");
            console.log(location);
            navigate(-1, {state: location, replace: true});
            console.log(location);
    }}, [access, location, accessToken]);
    
    if(!access || !accessToken) {
        return element
    }
}