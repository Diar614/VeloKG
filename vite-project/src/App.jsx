import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "./components/pages/CartContext/CartContext";

const Cart = React.lazy(() => import("./components/pages/Cart/Cart"));
const Register = React.lazy(() => import("./components/pages/register/Register"));
const Main = React.lazy(() => import("./components/pages/main/Main"));
const UserAccount = React.lazy(() => import("./components/pages/userAccaunt/UserAccount"));
const TheMain = React.lazy(() => import("./components/pages/TheMain/TheMain"));
const E_bikes = React.lazy(() => import("./components/pages/E_bikes/E_bikes"));
const Enduro = React.lazy(() => import("./components/pages/enduro/Enduro"));
const FreerideBike = React.lazy(() => import("./components/pages/freerideBikes/FreerideBikes"));
const GravelBike = React.lazy(() => import("./components/pages/gravelBike/GravelBike"));
const CrossCountry = React.lazy(() => import("./components/pages/crossCountry/CrossCountry"));
const KidsBikes = React.lazy(() => import("./components/pages/kidsBikes/KidsBikes"));
const TrailBikes = React.lazy(() => import("./components/pages/trailBikes/TrailBikes"));
const Login = React.lazy(() => import("./components/pages/login/Login"));
const ProductDetail = React.lazy(() => import("./components/pages/ProductDetail/ProductDetail"));
const Altitude = React.lazy(() => import("./components/pages/altitude/Altitude"));

const App = () => {
  return (
    <CartProvider>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Suspense fallback={<div>Загрузка...</div>}>
          <Routes>
            <Route path="/" element={<TheMain />} />
            <Route path="/main" element={<Main />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/userAccount" element={<UserAccount />} />
            <Route path="/E_bikes" element={<E_bikes />} />
            <Route path="/enduro" element={<Enduro />} />
            <Route path="/freerideBike" element={<FreerideBike />} />
            <Route path="/gravelBike" element={<GravelBike />} />
            <Route path="/crossCountry" element={<CrossCountry />} />
            <Route path="/kidsBikes" element={<KidsBikes />} />
            <Route path="/trailBikes" element={<TrailBikes />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/altitude" element={<Altitude />} />
          </Routes>
        </Suspense>
      </Router>
    </CartProvider>
  );
};

export default App;