import styles from './account.module.css';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { logout } from '../../services/actions/auth-actions';
import { useAppDispatch } from '../../services/hooks/reduxTypes';
export function AccountPage() {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const textColor = ({ isActive } : {isActive : boolean}) => isActive ? styles.text_color_active : "";
    
    return (
        <div className={styles.wrapper}>
            <nav className={`${styles.contentBlock} ${styles.link}`}>
                <NavLink to="/profile" state={{ from: location.pathname }} className={textColor} end>
                    <div className={`text text_type_main-medium ${styles.linkBlock}`}>Профиль</div>
                </NavLink>
                <NavLink to="/profile/orders" state={{ from: location.pathname }} className={textColor}>
                    <div className={`text text_type_main-medium ${styles.linkBlock}`}>История заказов</div>
                </NavLink>
                <div className={`text text_type_main-medium text_color_inactive ${styles.linkBlock}`} onClick={() => dispatch(logout())}>Выход</div>
                <p className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете<br/>изменить свои персональные данные</p>
            </nav>
            <Outlet />
        </div>
    )
}