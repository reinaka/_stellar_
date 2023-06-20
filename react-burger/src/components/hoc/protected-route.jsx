import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoginSuccess, selectAuthChecked } from "../../services/functions/selectorFunctions";
import { Spinner } from '../ui-elements/spinner/spinner';

export const ProtectedRouteElement = ({ element, anonymous }) => {
    const location = useLocation();
    const from = location.state?.from || '/';
    
    const authChecked = useSelector(selectAuthChecked);
    const access = useSelector(selectLoginSuccess);

    if(!authChecked) {
        return <Spinner />
    }

    if(authChecked) {
        if (anonymous && access) {
            return <Navigate to={from} />;
        }
        
        if (!anonymous && !access) {
            return <Navigate to="/login" state={{ from: location.pathname }}/>;
        }
        
        return element;
    }
}