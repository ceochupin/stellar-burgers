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
import { useDispatch, useSelector } from '../../services/store';
import { FC, useEffect } from 'react';
import { fetchIngredients } from '../../slices/ingredients/ingredientsActions';
import { selectIngredientsStatus } from 'src/slices/ingredients/ingredientsSlice';

const App: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes>
        <Route path='/' element={<ConstructorPage />} />

        <Route path='/feed' element={<OnlyAuth component={<Feed />} />} />

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

      <Routes>
        <Route
          path='/feed/:number'
          element={
            <Modal
              title='Информация о заказе'
              onClose={() => navigate('/feed')}
            >
              <OrderInfo />
            </Modal>
          }
        />

        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Детали ингредиента' onClose={() => navigate('/')}>
              <IngredientDetails />
            </Modal>
          }
        />

        <Route
          path='/profile/orders/:number'
          element={
            <Modal
              title='Информация о заказе'
              onClose={() => navigate('/profile/orders')}
            >
              <OrderInfo />
            </Modal>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
