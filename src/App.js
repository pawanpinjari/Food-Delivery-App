import logo from './logo.svg';
import './App.css';
import Home from './components/User/Home';
import {Route,Routes} from "react-router-dom"
import Cart from './components/User/Cart';
import Payment from './components/User/Payment';
import Login from './components/User/Login';
import Signup from './components/User/Signup';
import Restaurant from './components/Restaurants/Restaurant';
import HotelLogin from './components/Restaurants/HotelLogin';
import HotelSignup from './components/Restaurants/HotelSignup';
import MainNavbar from './components/User/MainNavbar';
import MenuData from './components/User/MenuData';
import Print from './components/Restaurants/Print';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/payment' element={<Payment/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/restaurant' element={<Restaurant/>}/>
      <Route path='/rest_login' element={<HotelLogin />}/>
      <Route path='/rest_signup' element={<HotelSignup />}/>
      <Route path='/mainnavbar' element={<MainNavbar />}/>
      <Route path='/menuData' element={<MenuData />}/>
      <Route path='/print' element={<Print />}/>
      
      
    </Routes>
    
    </>
  );
}

export default App;
