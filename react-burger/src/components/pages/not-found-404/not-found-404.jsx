import styles from './not-found-404.module.css';
import { Link } from 'react-router-dom';

export function Page404() {
    return (
        <div className={`${styles.pageWrapper}`}>
            <div className={styles.textWrapper}>
                <div className={`text text_type_digits-large ${styles.neonText} ${styles.textShaddow}`}>404</div>
                <p className={`text text_type_main-small mt-4 ${styles.neonText} ${styles.textShaddow}`}>такой страницы не существует</p>
            </div>
            <Link>Вернуться на главную</Link>
        </div>  
    )
}