import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Habits from './pages/Habits';
import AddHabits from './pages/AddHabits';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Products from './pages/Products';
import Finances from './pages/Finances';

//import Calendar from './components/Calendar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="habits" element={<Habits />} />
          <Route path="habits/add" element={<AddHabits />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="products" element={<Products />} />
          <Route path="finances" element={<Finances />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;