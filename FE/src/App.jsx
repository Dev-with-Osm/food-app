import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import HomePage from './pages/homePage/HomePage';
import CategoryPage from './pages/categoryPage/CategoryPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import AllDishes from './pages/adminPanel/AllDishes';
import AddNewDish from './pages/adminPanel/AddNewDish';
import EditDish from './pages/adminPanel/EditDish';
import DeleteDish from './pages/adminPanel/DeleteDish';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/all-dishes" element={<AllDishes />} />
          <Route path="/add-new-dish" element={<AddNewDish />} />
          <Route path="/edit-dish" element={<EditDish />} />
          <Route path="/delete-dish" element={<DeleteDish />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
