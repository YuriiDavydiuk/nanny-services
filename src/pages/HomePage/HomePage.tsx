import { Link } from 'react-router';

import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <main className={css.page}>
      <section className={css.hero} aria-labelledby="home-title">
        <div className={css.content}>
          <h1 id="home-title">Make Life Easier for the Family:</h1>
          <p className={css.slogan}>Find Babysitters Online for All Occasions</p>
          <Link className={css.start} to="/nannies">
            Get started
            <span className={css.arrow}>
              <img src="/icons/arrow.svg" alt="" />
            </span>
          </Link>
        </div>
        <div className={css.visual}>
          <img className={css.photo} src="/images/home-photo.png" alt="" />
          <div className={css.statistics}>
            <span className={css.check}>
              <img src="/icons/check.svg" alt="" />
            </span>
            <div>
              <p className={css.label}>Experienced nannies</p>
              <p className={css.count}>15,000</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
