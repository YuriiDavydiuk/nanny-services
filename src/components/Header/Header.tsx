import clsx from 'clsx';
import { Link, NavLink, useLocation } from 'react-router';

import css from './Header.module.css';

export default function Header() {
  const isHome = useLocation().pathname === '/';

  return (
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
          <button type="button" title="Log in will be available in a future update" disabled>
            Log In
          </button>
          <button
            className={css.registration}
            type="button"
            title="Registration will be available in a future update"
            disabled
          >
            Registration
          </button>
        </div>
      </div>
    </header>
  );
}
