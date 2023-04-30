import React from "react";
import styles from './header-item-block.module.css';
import PropTypes from 'prop-types';

class HeaderItemBlock extends React.Component {
    render() {
        return (
            <div className={`${styles.general} mt-4 mb-4 ml-5 mr-5`}>
                {this.props.icon}
                <p className={`text text_type_main-default ${this.props.textColor}`}>
                    {this.props.text}
                </p>
            </div>
        )
    }
}

HeaderItemBlock.propTypes = {
    icon: PropTypes.oneOf([PropTypes.BurgerIcon, PropTypes.ListIcon, PropTypes.ProfileIcon]),
    textColor: PropTypes.string,
    text: PropTypes.string,
}


export default HeaderItemBlock;