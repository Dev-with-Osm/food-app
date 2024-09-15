import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import HomePage from './pages/homePage/HomePage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import AllDishes from './pages/adminPanel/AllDishes';
import AddNewDish from './pages/adminPanel/AddNewDish';
import EditDish from './pages/adminPanel/EditDish';
import DishToModify from './pages/adminPanel/DishToModify';
import Entree from './pages/categoryPages/Entree';
import PlatPrincipal from './pages/categoryPages/PlatPrincipal';
import Dessert from './pages/categoryPages/Dessert';
import Boisson from './pages/categoryPages/Boisson';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/category/entree" element={<Entree />} />
        <Route path="/category/plat-principal" element={<PlatPrincipal />} />
        <Route path="/category/dessert" element={<Dessert />} />
        <Route path="/category/boissons" element={<Boisson />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/all-dishes" element={<AllDishes />} />
          <Route path="/add-new-dish" element={<AddNewDish />} />
          <Route path="/edit-dish" element={<DishToModify />} />
          <Route path="/edit-dish/:dishId" element={<EditDish />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
