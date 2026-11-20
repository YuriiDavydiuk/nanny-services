import clsx from 'clsx';
import { signOut } from 'firebase/auth';
import { useContext, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';

import { AuthContext } from '../../context/AuthContext';
import { auth } from '../../services/firebase';
import LoginForm from '../LoginForm/LoginForm';
import Modal from '../Modal/Modal';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import css from './Header.module.css';

export default function Header() {
  const { user, isLoading } = useContext(AuthContext);
  const [authModal, setAuthModal] = useState<'login' | 'registration' | null>(null);
  const isHome = useLocation().pathname === '/';

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch {
      window.alert('Could not log out. Please try again.');
    }
  };

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
            {!isLoading &&
              (user ? (
                <>
                  <div className={css.userInfo}>
                    <span className={css.userIcon} aria-hidden="true">
                      <img src="/icons/user.svg" alt="" />
                    </span>
                    <span className={css.user}>{user.displayName || user.email || 'User'}</span>
                  </div>
                  <button type="button" onClick={handleLogout}>
                    Log out
                  </button>
                </>
              ) : (
                <>
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
                </>
              ))}
          </div>
        </div>
      </header>
      {authModal && (
        <Modal labelledBy={`${authModal}-title`} onClose={() => setAuthModal(null)}>
          {authModal === 'login' ? (
            <LoginForm onSuccess={() => setAuthModal(null)} />
          ) : (
            <RegistrationForm onSuccess={() => setAuthModal(null)} />
          )}
        </Modal>
      )}
    </>
  );
}
