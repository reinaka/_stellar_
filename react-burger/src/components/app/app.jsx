import styles from './app-styles.module.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { LoginPage } from '../pages/login-page/login-page';
import { RegistrationPage } from '../pages/registration-page/registration-page';
import { ForgotPasswordPage } from '../pages/forgot-password-page/forgot-password-page';
import { ConstructorPage } from '../pages/constructor-page/constructor-page';
import { AccountPage } from '../pages/profile-block/account-page';
import { Page404 } from '../pages/not-found-404/not-found-404';
import { MainLayoutPage } from '../pages/main-layout-page/main-layout-page';
import { ProfilePage } from '../pages/profile-block/profile-page/profile-page';
import { OrdersHistoryPage } from '../pages/profile-block/orders-history-page/orders-history-page';
import { ProtectedRouteElement } from '../hoc/protected-route';
import { ResetPasswordPage } from '../pages/reset-password-page/reset-password-page';
import { ForbiddenForLoggedInRoute } from '../hoc/forbidden-for-loggedin-route';
import { useDispatch, useSelector} from 'react-redux';
import { useEffect, useMemo } from 'react';
import { getUser } from '../../services/functions/getUser';
import Modal from '../modal/modal';
import { IngredientPage } from '../pages/ingredient-page/ingredient-page';
import IngredientDetails from '../modal/ingredient-details/ingredient-details';
import { DELETE_INGREDIENT_DETAILS } from '../../services/actions/current-ingredient-actions';
import { useCallback } from 'react';
import { getData } from '../../services/actions/all-ingredients-actions';
import { selectAllIngredients } from '../../services/functions/selectorFunctions';

export default function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getData())
        dispatch(getUser());
    }, [dispatch])

    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state && location.state.background;
    
    const closeModal = useCallback(() => {
        dispatch({type: DELETE_INGREDIENT_DETAILS});
        navigate("/", {replace: true});
    }, [dispatch, navigate]);

    //модальное окно
    const modal = useMemo(
        () => {
            return (
                <Modal onClose={closeModal} title='Детали ингредиента'>
                    <IngredientDetails />
                </Modal>)
        }, [closeModal]);

    const allIngredients = useSelector(selectAllIngredients);

    return allIngredients && (
            <div className={styles.viewPort}>
                    <Routes location={background || location}>
                        <Route path="/" element={<MainLayoutPage />} end>
                        <Route path='/ingredients/:ingredientId' element={<IngredientPage />} />
                        <Route index element={<ConstructorPage/>}/>
                        <Route path="/login" element={<ForbiddenForLoggedInRoute element={<LoginPage />} />}/>
                        <Route path="register" element={<ForbiddenForLoggedInRoute element={<RegistrationPage />} />}/>
                        <Route path="/forgot-password" element={<ForbiddenForLoggedInRoute element={<ForgotPasswordPage />} />}/>
                        <Route path="/reset-password" element={<ForbiddenForLoggedInRoute element={<ResetPasswordPage />} />}/>
                        <Route path="/profile" element={<ProtectedRouteElement element={<AccountPage />}/>}>
                            <Route index element={<ProtectedRouteElement element={<ProfilePage />}/>}/>
                            <Route path="/profile/orders" element={<ProtectedRouteElement element={<OrdersHistoryPage />}/>}/>
                        </Route>
                        </Route>
                        <Route path="*" element={< Page404 />}/>
                    </Routes>

                    {background &&
                        <Routes>
                            <Route path='/ingredients/:ingredientId' element={modal}/>
                        </Routes>
                    }
            </div>
    )
}
