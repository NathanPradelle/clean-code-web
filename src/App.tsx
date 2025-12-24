import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './ui/components/navbar/Navbar';
import { HomePage } from './ui/pages/homepage/HomePage';
import { QuizSession } from './ui/pages/quizzSession/QuizzSession';
import { CreateCardPage } from './ui/pages/cards/CreateCardPage';
import { CardsListPage } from './ui/pages/cards/CardsListPage';


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