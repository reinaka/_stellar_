import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectLoginSuccess } from "../../services/functions/selectorFunctions";
import { useEffect, useState } from "react";
import { checkAccess } from "../../services/functions/checkAccess";

export const ForbiddenForLoggedInRoute = ({ element }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");
    const access = useSelector(selectLoginSuccess);
    const [loggedIn, setLoggedIn] = useState(access);

    useEffect(() => {
        checkAccess(dispatch);
        if(access && accessToken) {
            setLoggedIn(true);
            navigate("/", {state: location, replace: true});
    }}, [access, accessToken, location, navigate, dispatch])
    
    if (!loggedIn) return element;
}