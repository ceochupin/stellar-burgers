import '../../index.css';
import styles from './app.module.css';

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { OnlyUnAuth, OnlyAuth } from '../protected-route/protected-route';
import { useDispatch } from '@store';
import { FC, useEffect } from 'react';
import { getBurgerIngredients } from '../../slices/burger-ingredients/burger-ingredients-actions';

const App: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const background = location.state?.background;

  const closeModal = () => {
    navigate(background.pathname || '/');
  };

  useEffect(() => {
    dispatch(getBurgerIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />

        <Route path='/feed' element={<Feed />} />

        <Route path='/ingredients/:id' element={<IngredientDetails />} />

        <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />

        <Route
          path='/register'
          element={<OnlyUnAuth component={<Register />} />}
        />

        <Route
          path='/forgot-password'
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />

        <Route
          path='/reset-password'
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />

        <Route path='/profile' element={<OnlyAuth component={<Profile />} />}>
          <Route path='orders' element={<ProfileOrders />} />
        </Route>

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='Информация о заказе' onClose={closeModal}>
                <OrderInfo />
              </Modal>
            }
          />

          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            }
          />

          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='Информация о заказе' onClose={closeModal}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
