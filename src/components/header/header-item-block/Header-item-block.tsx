import styles from './header-item-block.module.css';
import { FC, ElementType } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

type TProps = {
    icon : ElementType,
    text : string,
    textColor? : string,
    to : string,
};

const HeaderItemBlock:FC<TProps> = (props) => {
    const Icon = props.icon;
    const location = useLocation();

    return (
        <NavLink to={props.to} state={{ from: location.pathname }} >
                {({ isActive }) => (
                    <div className={`${styles.general} mt-4 mb-4 ml-5 mr-5`}>
                        <Icon type={isActive ? 'primary' : 'secondary'}/>
                        <p className={`text text_type_main-default ${isActive ? styles.activeLink : ''}`}>
                        {props.text}
                        </p>
                    </div>
                )}
        </NavLink>
    )
}

export default HeaderItemBlock;