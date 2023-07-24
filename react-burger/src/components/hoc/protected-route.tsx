import { useLocation, Navigate } from "react-router-dom";
import { useAppSelector } from "../../services/hooks/reduxTypes";
import { selectLoginSuccess, selectAuthChecked } from "../../services/functions/selectorFunctions";
import { Spinner } from '../ui-elements/spinner/spinner';

type TProps = {
    element : JSX.Element,
    anonymous? : boolean,
}

const ProtectedRouteElement = (props : TProps) => {
    const location = useLocation();
    const from = location.state?.from || '/';

    const authChecked = useAppSelector(selectAuthChecked);
    const access = useAppSelector(selectLoginSuccess);

    if (!authChecked) {
        return <Spinner />;
    }

    if (authChecked) {
        if (props.anonymous && access) {
            return <Navigate to={from} />;
        }

        if (!props.anonymous && !access) {
            return <Navigate to="/login" state={{ from: location.pathname }} />;
        }

        return props.element;
    }
}

export default ProtectedRouteElement as unknown as (props: TProps) => JSX.Element;