import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './features/navbar/components/Navbar';
import { HomePage } from './features/homepage/pages/HomePage';
import { QuizSession } from './features/quizz/pages/QuizzSession';
import { CreateCardPage } from './features/cards/pages/CreateCardPage';
import { CardsListPage } from './features/cards/pages/CardsListPage';


export const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Navbar reste visible sur toutes les pages */}
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quizz" element={<QuizSession />} />
            <Route path="/create-card" element={<CreateCardPage />} />
            <Route path="/cards" element={<CardsListPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};