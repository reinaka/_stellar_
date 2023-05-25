import React, { memo } from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './tabs.module.css';
import { BUN, MAIN, SAUCE } from "../../../constants/constants";
import PropTypes from 'prop-types';

const Tabs = memo((props) => {
    const {currentSection, setCurrentSection} = props;

    const scrollToDection =
        (value) => {
        let elem = document.getElementById(`${value}_id`);
        elem.scrollIntoView({behavior: "smooth"});
    };

    return (
        <div className={styles.tabsWrapper} id={props.forId}>
            <Tab value={BUN} active={currentSection === `${BUN}`} onClick={() => {setCurrentSection(); scrollToDection(BUN)}}>
                Булки
            </Tab>
            <Tab value={SAUCE} active={currentSection === `${SAUCE}`} onClick={() => {setCurrentSection(); scrollToDection(SAUCE)}}>
                Соусы
            </Tab>
            <Tab value={MAIN} active={currentSection === `${MAIN}`} onClick={() => {setCurrentSection(); scrollToDection(MAIN)}}>
                Начинки
            </Tab>
        </div>
    )
});

Tabs.propTypes = {
    currentSection: PropTypes.string,
    setCurrentSection: PropTypes.func,
}

export default Tabs;