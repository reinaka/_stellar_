import styles from './account.module.css';
import { Outlet, NavLink } from 'react-router-dom';
import { logout } from '../../services/actions/auth-actions';
import { useDispatch } from 'react-redux';

export function AccountPage() {
    const dispatch = useDispatch();
    const textColor = ({ isActive }) => isActive ? styles.text_color_active : "";
    
    return (
        <div className={styles.wrapper}>
            <nav className={`${styles.contentBlock} ${styles.link}`}>
                <NavLink to="/profile" className={textColor} end>
                    <div className={`text text_type_main-medium ${styles.linkBlock}`}>Профиль</div>
                </NavLink>
                <NavLink to="/profile/orders" className={textColor}>
                    <div className={`text text_type_main-medium ${styles.linkBlock}`}>История заказов</div>
                </NavLink>
                <NavLink>
                    <div className={`text text_type_main-medium ${styles.linkBlock}`} onClick={() => dispatch(logout())}>Выход</div>
                </NavLink>
                <p className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете<br/>изменить свои персональные данные</p>
            </nav>
            <Outlet />
        </div>
    )
}