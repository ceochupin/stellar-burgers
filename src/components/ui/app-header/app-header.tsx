import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';
import { clsx } from 'clsx';

export const AppHeaderUI = ({ userName }: TAppHeaderUIProps): JSX.Element => (
  <header className={`${styles.header} pt-4 pb-4`}>
    <nav className={`${styles.menu}`}>
      <div className={styles.menu_part_left}>
        <NavLink
          to='/'
          className={({ isActive }) =>
            clsx(
              styles.link,
              isActive && styles.link_active,
              `pl-5 pr-5 pt-4 pb-4 mr-2`
            )
          }
        >
          {({ isActive }) => (
            <>
              <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
              <p className='text text_type_main-default ml-2'>Конструктор</p>
            </>
          )}
        </NavLink>

        <NavLink
          to='/feed'
          className={({ isActive }) =>
            clsx(
              styles.link,
              isActive && styles.link_active,
              `pl-5 pr-5 pt-4 pb-4`
            )
          }
        >
          {({ isActive }) => (
            <>
              <ListIcon type={isActive ? 'primary' : 'secondary'} />
              <p className='text text_type_main-default ml-2'>Лента заказов</p>
            </>
          )}
        </NavLink>
      </div>

      <div className={styles.logo}>
        <Link to='/'>
          <Logo className='' />
        </Link>
      </div>

      <div className={styles.link_position_last}>
        <NavLink
          to='/profile'
          className={({ isActive }) =>
            clsx(
              styles.link,
              isActive && styles.link_active,
              `pl-5 pr-5 pt-4 pb-4`
            )
          }
        >
          {({ isActive }) => (
            <>
              <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
              <p className='text text_type_main-default ml-2'>
                {userName || 'Личный кабинет'}
              </p>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  </header>
);
