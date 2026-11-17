import clsx from 'clsx';
import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';

import LoginForm from '../LoginForm/LoginForm';
import Modal from '../Modal/Modal';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import css from './Header.module.css';

export default function Header() {
  const [authModal, setAuthModal] = useState<'login' | 'registration' | null>(null);
  const isHome = useLocation().pathname === '/';

  return (
    <>
      <header className={clsx(css.header, { [css.home]: isHome })}>
        <div className={css.inner}>
          <Link className={css.logo} to="/">
            Nanny.Services
          </Link>
          <nav className={css.navigation} aria-label="Main navigation">
            <NavLink
              className={({ isActive }) => clsx(css.link, { [css.active]: isActive })}
              to="/"
              end
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) => clsx(css.link, { [css.active]: isActive })}
              to="/nannies"
            >
              Nannies
            </NavLink>
          </nav>
          <div className={css.actions}>
            <button type="button" onClick={() => setAuthModal('login')}>
              Log In
            </button>
            <button
              className={css.registration}
              type="button"
              onClick={() => setAuthModal('registration')}
            >
              Registration
            </button>
          </div>
        </div>
      </header>
      {authModal && (
        <Modal labelledBy={`${authModal}-title`} onClose={() => setAuthModal(null)}>
          {authModal === 'login' ? <LoginForm /> : <RegistrationForm />}
        </Modal>
      )}
    </>
  );
}
