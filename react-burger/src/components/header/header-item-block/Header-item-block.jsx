import styles from './header-item-block.module.css';
import PropTypes from 'prop-types';

export default function HeaderItemBlock(props) {
    return (
        <div className={`${styles.general} mt-4 mb-4 ml-5 mr-5`}>
            {props.icon}
            <p className={`text text_type_main-default ${props.textColor}`}>
            {props.text}
            </p>
        </div>
    )
}

HeaderItemBlock.propTypes = {
    icon: PropTypes.object.isRequired,
    textColor: PropTypes.string,
    text: PropTypes.string.isRequired,
}