import React from "react";
import '../App.css';
import Cart from './components/Cart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  // const notify = () => toast("Wow so easy!");
  return (
    <div className="App">
        <ToastContainer />
        <Cart />
    </div>
  );
}

export default App;