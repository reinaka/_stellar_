import styles from './register-form-text.module.css';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

export function RegisterFormText(props) {
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

RegisterFormText.propTypes = {
    textBlock: PropTypes.string,
    linkText: PropTypes.string,
}