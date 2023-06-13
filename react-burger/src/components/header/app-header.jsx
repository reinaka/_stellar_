import { Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderItemBlock from "./header-item-block/Header-item-block"; 
import styles from './app-header.module.css';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';

const AppHeader = memo(() => {
    const activeLink = ({ isActive }) => isActive ? styles.activeLink : styles.inactiveIcon;

    return (
        <header className={`${styles.headerWrapper} pt-4 pb-4`}>
            <nav className={`${styles.general} ${styles.link}`}>
                <span className={styles.span}>
                    <NavLink to="/"
                            className={activeLink}
                    >
                        <HeaderItemBlock 
                                icon={<BurgerIcon />} 
                                text="Конструктор"
                        />
                    </NavLink>
                    <HeaderItemBlock icon ={<ListIcon type="secondary" />} text="Лента заказов" textColor="text_color_inactive"/>
                </span>
                <span className={styles.alignCenter}>
                    <Logo className={styles.logo}/>
                </span>
                <span className={styles.alignRight}>
                    <NavLink to="/profile"
                            className={activeLink}
                    >
                        <HeaderItemBlock 
                                icon={<ProfileIcon />} 
                                text="Личный кабинет" 
                                textColor="text_color_inactive" 
                                styles="max-width:207px"
                        />
                    </NavLink>
                </span>
            </nav>
        </header>
    )
});

export default AppHeader;
