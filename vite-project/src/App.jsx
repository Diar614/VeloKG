import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from "./components/pages/register/Register";
import Main from './components/pages/main/Main';
import UserAccaunt from './components/pages/userAccaunt/UserAccount';
import ProductDetail from './components/pages/ProductDetail/ProductDetail'; 
import TheMain from './components/pages/TheMain/TheMain';
import E_bikes from './components/pages/E_bikes/E_bikes';
import Enduro from './components/pages/enduro/Enduro'
import FreerideBike from "./components/pages/freerideBikes/FreerideBikes";
import GravelBike from "./components/pages/gravelBike/GravelBike"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/theMain" element={<TheMain />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userAccaunt" element={<UserAccaunt />} />
        <Route path="/product/:productId" element={<ProductDetail />} /> 
        <Route path="/E_bikes" element={<E_bikes />} />
        <Route path="/enduro" element={<Enduro />} />
        <Route path="/freerideBike" element={<FreerideBike />} />
        <Route path="/gravelBike" element={<GravelBike/>} />
      </Routes>
    </Router>
  );
}

export default App;