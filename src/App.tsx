import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/home/Home';
import Signup from './components/signup/Signup';
import { Login } from './components/login/Login';
import NotFound from './components/common/NotFound';
import RegisterForm from './components/registerForm/RegisterForm';
import ProtectedRoute from './Routes/ProtectedRoute';
import { Store } from './redux/Store';
import Entertainment from './components/entertainment/Entertainment';
import Product from './components/product/Product';
import ProductDetail from './components/product/ProductDetails';
import ShoppingCart from './components/cart/ShoppingCart';
import FAQPag from './components/faq/FAQPag';
import AboutUs from './components/aboutUs/AboutUs';
import Service from './components/services/Service';
import CareTakerService from './components/caretaker/caretaker-service/CareTakerService';
import MessageScreen from './components/common/MessageScreen';
import { UpdateProfile } from './components/profile/UpdateProfile';

function App() {
    return (
        <Provider store={Store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Login />} />
                    <Route path="/entertainment" element={<Entertainment />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/faq" element={<FAQPag />} />
                    <Route path="/regform" element={<RegisterForm />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/product" element={<Product />} />
                        <Route path="/product/:id" element={<ProductDetail />} />
                        <Route path="/shopping-cart" element={<ShoppingCart />} />
                        <Route path="/services" element={<Service />} />
                        <Route path="/caretake-service" element={<CareTakerService />} />
                        <Route path="/msgScreen" element={<MessageScreen />} />
                        <Route path="/updateProfile" element={<UpdateProfile />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
