import styles from './register-form-text.module.css';
import { Link, useLocation } from 'react-router-dom';
import { FC, ReactNode } from 'react';

type TProps = {
    textBlock?: string,
    linkText: string,
    linkAddress: string,
    children? : ReactNode
};

const RegisterFormText:FC<TProps> = (props) => {
    const location = useLocation();
    
    return (
        <div className={styles.textBlock}>
            <p className="text text_type_main-default text_color_inactive">{props.children}&nbsp;</p>
            <Link 
                to={{ pathname: props.linkAddress }}
                state={{ from: location.pathname }}
                className={`text text_type_main-default ${styles.link}`} 
            >
                {props.linkText}
            </Link>
        </div>
    )
}

export default RegisterFormText;