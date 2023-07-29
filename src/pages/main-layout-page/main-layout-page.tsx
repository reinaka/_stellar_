import styles from './main-layout-page.module.css';
import AppHeader from '../../components/header/app-header';
import { Outlet } from 'react-router-dom';

export function MainLayoutPage() {
    return (
        <>
            <AppHeader />
            <main className={styles.generalBlock}>
                <Outlet />
            </main>
        </>
        
    )
}