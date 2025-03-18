import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from "./components/pages/register/Register";
import Main from './components/pages/main/Main';
import UserAccaunt from './components/pages/userAccaunt/UserAccount';
import TheMain from './components/pages/TheMain/TheMain';
import E_bikes from './components/pages/E_bikes/E_bikes';
import Enduro from './components/pages/enduro/Enduro'
import FreerideBike from "./components/pages/freerideBikes/FreerideBikes";
import GravelBike from "./components/pages/gravelBike/GravelBike"
import CrossCountry from "./components/pages/crossCountry/CrossCountry"
import KidsBikes from "./components/pages/kidsBikes/KidsBikes"
import TrailBikes from './components/pages/trailBikes/TrailBikes';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TheMain />} />
        <Route path="/main" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userAccaunt" element={<UserAccaunt />} />
        <Route path="/E_bikes" element={<E_bikes />} />
        <Route path="/enduro" element={<Enduro />} />
        <Route path="/freerideBike" element={<FreerideBike />} />
        <Route path="/gravelBike" element={<GravelBike/>} />
        <Route path="/crossCountry" element={<CrossCountry/>} />
        <Route path="/kidsBikes" element={<KidsBikes/>} />
        <Route path="/trailBikes" element={<TrailBikes/>} />
      </Routes>
    </Router>
  );
}

export default App;























