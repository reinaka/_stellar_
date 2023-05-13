import { Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderItemBlock from "./header-item-block/Header-item-block"; 
import styles from './app-header.module.css';
import { memo } from 'react';

const AppHeader = memo(() => {
    return (
        <header className={`${styles.headerWrapper} pt-4 pb-4`}>
            <nav className={styles.general}>
                <span className={styles.span}>
                    <HeaderItemBlock icon={<BurgerIcon type="primary" />} text="Конструктор"/>
                    <HeaderItemBlock icon ={<ListIcon type="secondary" />} text="Лента заказов" textColor="text_color_inactive"/>
                </span>
                <span className={styles.alignCenter}>
                    <Logo className={styles.logo}/>
                </span>
                <span className={styles.alignRight}>
                    <HeaderItemBlock icon={<ProfileIcon type="secondary" />} text="Личный кабинет" textColor="text_color_inactive" styles="max-width:207px"/>
                </span>
            </nav>
        </header>
    )
});

export default AppHeader;
