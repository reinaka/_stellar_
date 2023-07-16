import { Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderItemBlock from "./header-item-block/Header-item-block"; 
import styles from './app-header.module.css';
import { memo } from 'react';

const AppHeader = memo(() => {
    return (
        <header className={`${styles.headerWrapper} pt-4 pb-4`}>
            <nav className={`${styles.general} ${styles.link}`}>
                <span className={styles.span}>
                    <HeaderItemBlock to="/" icon={BurgerIcon} text="Конструктор" />
                    <HeaderItemBlock to="/feed" icon={ListIcon} text="Лента заказов"/>
                </span>
                <span className={`${styles.alignCenter} ${styles.logo}`}>
                    <Logo />
                </span>
                <span className={styles.alignRight}>
                    <HeaderItemBlock to="/profile" icon={ProfileIcon} text="Личный кабинет" />
                </span>
            </nav>
        </header>
    )
});

export default AppHeader;
