import styles from './form-registration.module.css';
import { FC, ReactNode, FormEventHandler } from 'react';

type TProps = {
    title: string,
    action: string,
    method: string,
    onSubmit: FormEventHandler<HTMLFormElement>,
    children? : ReactNode,
    buttonText? : string,
    error? : boolean | undefined
}

const RegistrationForm:FC<TProps> = (props) => {
    return (
        <div className={styles.wrapper}>
            <form action={props.action} method={props.method} className={styles.form} onSubmit={props.onSubmit}>
                <h1 className="text text_type_main-medium mb-6 ">{props.title} </h1>
                {props.children}
            </form>
        </div>
    )
}

export default RegistrationForm;
