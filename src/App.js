import './App.css';
import Customer from './components/Customer';
import Header from './components/Header';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import CreatePurchase from './components/CreatePurchase';
import { CustomerProvider } from './context/CustomerContext';

function App() {
  return (
    <CustomerProvider>
      <Router>
        <Header />
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<Customer />} />
            <Route path="/create-purchase" element={<CreatePurchase />} />
          </Routes>
        </div>
      </Router>
    </CustomerProvider>
  );
}

export default App;
