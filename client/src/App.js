import Navbar from "./components/Navbar";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import EditEvent from "./pages/EditEvent";
import Delete from "./pages/Delete";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
        <Routes>
        <Route path='/' element={<Events />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/edit/:id' element={<EditEvent/>} />
          <Route path='/delete/:id' element={<Delete />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
