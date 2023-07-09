import { memo, FC } from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './tabs.module.css';
import { BUN, MAIN, SAUCE } from "../../../constants/constants";

type TProps = {
    currentSection : string,
    setCurrentSection : Function,
};

const Tabs:FC<TProps> = memo((props) => {
    const {currentSection, setCurrentSection} = props;

    const scrollToDection =
        (value : string) => {
        let elem = document.getElementById(`${value}_id`);
        elem?.scrollIntoView({behavior: "smooth"});
    };

    return (
        <div className={styles.tabsWrapper} >
            <Tab value={BUN} active={currentSection === BUN} onClick={() => {setCurrentSection(); scrollToDection(BUN)}}>
                Булки
            </Tab>
            <Tab value={SAUCE} active={currentSection ===SAUCE} onClick={() => {setCurrentSection(); scrollToDection(SAUCE)}}>
                Соусы
            </Tab>
            <Tab value={MAIN} active={currentSection === MAIN} onClick={() => {setCurrentSection(); scrollToDection(MAIN)}}>
                Начинки
            </Tab>
        </div>
    )
});

export default Tabs;