import styles from './form-registration-wrapper.module.css';

export function RegistrationWrapper(props) {
    return (
        <div className={styles.wrapper}>
            {props.children}
        </div>
    )
}