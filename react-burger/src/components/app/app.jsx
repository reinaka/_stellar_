import React from 'react';
import AppHeader from '../header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app-styles.module.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            hasError: false,
            data: []
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        const address = 'https://norma.nomoreparties.space/api/ingredients';
        fetch(address)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
            })
            .then(apiData => this.setState({...this.state, data: apiData.data, isLoading: false, hasError: false}))
            .catch(e => this.setState({...this.state, isLoading: false, hasError: true}))
    };
    
    render() {
        return (
            <div className={styles.viewPort}>
                <AppHeader />
                <div className={styles.generalBlock}>
                    <main>
                        <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
                        <div className={styles.contentBlock}>
                            <BurgerIngredients data={this.state.data}/>
                            <BurgerConstructor data={this.state.data}/>
                        </div>
                    </main>
                </div>
            </div>
        )
    }
}

export default App;