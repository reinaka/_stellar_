import { useLocation , useNavigate} from "react-router-dom";
import { checkAccess } from "../../services/functions/checkAccess";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectLoginSuccess } from "../../services/functions/selectorFunctions";

export const ProtectedRouteElement = ({ element }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const refreshToken = localStorage.getItem("refreshToken");
    
    useEffect(() => {
        checkAccess(dispatch);
        if(!refreshToken) navigate("/login", {state: location} );
    }, [refreshToken])
    const access = useSelector(selectLoginSuccess);
    
    if(access) return element;
}