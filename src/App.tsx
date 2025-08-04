import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store/store";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import Home from "./pages/home/Home";
import SingleProduct from './pages/singleProduct/SingleProduct';

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
          <Route path='/product/:id' element={<SingleProduct/>}/>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
