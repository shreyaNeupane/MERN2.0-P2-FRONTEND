import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<h1>Hello world</h1>} />
            <Route path="/register" element={<h1>This is register page</h1>} />
            <Route path="/login" element={<h1>This is login page</h1>} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
