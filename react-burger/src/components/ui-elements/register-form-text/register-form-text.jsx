import styles from './register-form-text.module.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export function RegisterFormText(props) {
    return (
        <div className={styles.textBlock}>
            <p className="text text_type_main-default text_color_inactive">{props.children}&nbsp;</p>
            <Link className={`text text_type_main-default ${styles.link}`} to={props.linkAddress} replace={true}>{props.linkText}</Link>
        </div>
    )
}

RegisterFormText.propTypes = {
    textBlock: PropTypes.string,
    linkText: PropTypes.string,
}