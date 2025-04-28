import React, { FC } from 'react';
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
import { TIconProps } from '@zlden/react-developer-burger-ui-components/dist/ui/icons/utils';

interface NavIconLinkProps {
  to: string;
  Icon: React.ComponentType<TIconProps>;
  text: string;
  userName?: string;
  withMarginRight?: boolean;
}

const NavIconLink = ({
  to,
  Icon,
  text,
  userName,
  withMarginRight = true
}: NavIconLinkProps) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      clsx(styles.link, isActive && styles.link_active)
    }
  >
    {({ isActive }) => (
      <>
        <Icon type={isActive ? 'primary' : 'secondary'} />
        <p
          className={`text text_type_main-default ml-2 ${withMarginRight ? 'mr-10' : ''}`}
        >
          {userName || text}
        </p>
      </>
    )}
  </NavLink>
);

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <NavIconLink to='/' Icon={BurgerIcon} text='Конструктор' />

        <NavIconLink
          to='/feed'
          Icon={ListIcon}
          text='Лента заказов'
          withMarginRight={false}
        />
      </div>

      <div className={styles.logo}>
        <Link to='/'>
          <Logo className='' />
        </Link>
      </div>

      <div className={styles.link_position_last}>
        <NavIconLink
          to='/profile'
          Icon={ProfileIcon}
          text='Личный кабинет'
          userName={userName}
        />
      </div>
    </nav>
  </header>
);
