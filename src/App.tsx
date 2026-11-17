import { Navigate, Route, Routes } from 'react-router';

import css from './App.module.css';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import NanniesPage from './pages/NanniesPage/NanniesPage';

export default function App() {
  return (
    <div className={css.app}>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/nannies" element={<NanniesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
