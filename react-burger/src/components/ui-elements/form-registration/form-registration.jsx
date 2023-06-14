import styles from './form-registration.module.css';
import PropTypes from 'prop-types';

export function RegistrationForm(props) {
    return (
        <div className={styles.wrapper}>
            <form action={props.action} method={props.method} className={styles.form} onSubmit={props.onSubmit}>
                <h1 className="text text_type_main-medium mb-6 ">{props.title} </h1>
                {props.children}
            </form>
        </div>
    )
}

RegistrationForm.propTypes = {
    title: PropTypes.string,
    action: PropTypes.string,
    method: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
}