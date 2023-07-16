import styles from './app-styles.module.css';
import { Route, Routes, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { LoginPage } from '../../pages/login-page/login-page';
import { RegistrationPage } from '../../pages/registration-page/registration-page';
import { ForgotPasswordPage } from '../../pages/forgot-password-page/forgot-password-page';
import { ConstructorPage } from '../../pages/constructor-page/constructor-page';
import { AccountPage } from '../../pages/profile-block/account-page';
import { Page404 } from '../../pages/not-found-404/not-found-404';
import { MainLayoutPage } from '../../pages/main-layout-page/main-layout-page';
import { ProfilePage } from '../../pages/profile-block/profile-page/profile-page';
import { OrdersHistoryPage } from '../../pages/profile-block/orders-history-page/orders-history-page';
import ProtectedRouteElement from '../hoc/protected-route';
import { ResetPasswordPage } from '../../pages/reset-password-page/reset-password-page';
import { useDispatch, useSelector} from 'react-redux';
import { useEffect, useMemo } from 'react';
import Modal from '../modal/modal';
import { IngredientPage } from '../../pages/ingredient-page/ingredient-page';
import IngredientDetails from '../modal/ingredient-details/ingredient-details';
import { DELETE_INGREDIENT_DETAILS } from '../../services/actions/current-ingredient-actions';
import { useCallback } from 'react';
import { getData } from '../../services/actions/all-ingredients-actions';
import { selectAllIngredients } from '../../services/functions/selectorFunctions';
import { AUTH_CHECKED, verifyToken } from '../../services/actions/auth-actions';
import { FeedPage } from '../../pages/feed-block/feed-page';
import { OrderDetailedInfo } from '../modal/order-detailed-info/order-detailed-info';
import { DELETE_CURRENT_ORDER_DETAILS } from '../../services/actions/current-order-actions';
import { OrderDetailsPage } from '../../pages/order-details-page/order-details';

export default function App() {
    const dispatch = useDispatch() as any;
    const accessTokenValue = localStorage.getItem("accessToken");
    useEffect(() => {
        dispatch(getData());
        if(accessTokenValue) {
            dispatch(verifyToken())
            .finally(() => {
                dispatch({ type: AUTH_CHECKED });
            })
        } else {
            dispatch({ type: AUTH_CHECKED });
        }
    }, [accessTokenValue, dispatch]);

    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state && location.state.background;
    const prevPage = location.state?.from || '/';
    
    const closeIngredientModal = useCallback(() => {
        navigate("/", {replace: true});
        dispatch({type: DELETE_INGREDIENT_DETAILS});
    }, [dispatch, navigate]);

    const closeOrderModal = useCallback((path : string) => {
        navigate(path, {replace: true});
        dispatch({type: DELETE_CURRENT_ORDER_DETAILS});
    }, [dispatch, navigate]);

    //модальное окно
        const ingredientModal = useMemo(
            () => {
                return (
                    <Modal onClose={closeIngredientModal} title='Детали ингредиента'>
                        <IngredientDetails />
                    </Modal>)
            }, [closeIngredientModal]);

        const orderModalFeed = useMemo(
            () => {
                return (
                    <Modal onClose={() => {closeOrderModal("/feed")}} title='Детали заказа'>
                        <OrderDetailedInfo />
                    </Modal>)
            }, [closeOrderModal]);

        const orderModalProfile = useMemo(
            () => {
                return (
                    <Modal onClose={() => {closeOrderModal("/profile/orders")}} title='Детали заказа'>
                        <OrderDetailedInfo />
                    </Modal>)
            }, [closeOrderModal]);

    const allIngredients = useSelector(selectAllIngredients);

    return allIngredients && (
            <div className={styles.viewPort}>
                    <Routes location={background || location}>
                        <Route path="/" element={<MainLayoutPage />} >
                            <Route path='/ingredients/:ingredientId' element={<IngredientPage />} />
                            <Route path='/feed/:orderId' element={<OrderDetailsPage />} />
                            <Route path='/profile/orders/:orderId' element={<OrderDetailsPage />} />
                            <Route index element={<ConstructorPage/>} />
                            <Route path='/feed' element={<FeedPage />} />
                            <Route path="/login" element={<ProtectedRouteElement element={<LoginPage />} anonymous={true}/>} />
                            <Route path="register" element={<ProtectedRouteElement element={<RegistrationPage />} anonymous={true}/>} />
                            <Route path="/forgot-password" element={<ProtectedRouteElement element={<ForgotPasswordPage />} anonymous={true}/>} />
                            <Route path="/reset-password" 
                                element={<ProtectedRouteElement 
                                        element={
                                            prevPage === "/forgot-password"
                                            ? <ResetPasswordPage />
                                            : <Navigate to={prevPage} replace/>
                                            }
                                anonymous={true}/>} 
                            />
                            <Route path="/profile" element={<ProtectedRouteElement element={<AccountPage />} anonymous={false}/>} >
                                <Route index element={<ProtectedRouteElement element={<ProfilePage />} anonymous={false}/>} />
                                <Route path="/profile/orders" element={<ProtectedRouteElement element={<OrdersHistoryPage />} anonymous={false}/>} />
                            </Route>
                        </Route>
                        <Route path="*" element={< Page404 />} />
                    </Routes>

                    {background &&
                        <Routes>
                            <Route path='/ingredients/:ingredientId' element={ingredientModal}/>
                            <Route path='/feed/:orderId' element={orderModalFeed}/>
                            <Route path='/profile/orders/:orderId' element={orderModalProfile}/>
                        </Routes>
                    }
            </div>
    )
}
