import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { saveCard, getNextReviewDate } from './utils/helper';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Study from './components/Study';
import Cards from './components/Cards';
import AddCard from './components/AddCard';
import EditCard from './components/EditCard';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/study" element={<Study />} />
          <Route
            path="/add"
            element={
              <AddCard
                saveCard={saveCard}
                getNextReviewDate={getNextReviewDate}
              />
            }
          />
          <Route path="/edit/:id" element={<EditCard />} />
          <Route path="/cards" element={<Cards />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
