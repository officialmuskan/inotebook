import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/notestate';
import Alert from './components/Alert';
import Login from './components/Login';
import Signp from './components/Signp';
import AddNote from './components/Addnote';
import Display from './components/Display';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
    <>
    {/* iske andar jo var h wo sab me chale jayege */}
      <NoteState> 
        <BrowserRouter>
        <Navbar />
        <Alert alert={alert}/>
          <div className="container">
            <Routes>

              <Route
                exact
                path="/*"
                element={
                  <Home showAlert={showAlert}/>
                }
              />
              <Route
                exact
                path="addnote/*"
                element={
                  <AddNote showAlert={showAlert}/>
                }
              />
              <Route
                exact
                path="about/*"
                element={
                  <About />
                }
              />
              <Route
                exact
                path="login/*"
                element={
                  <Login showAlert={showAlert}/>
                }
              />
              <Route
                exact
                path="signup/*"
                element={
                  <Signp showAlert={showAlert}/>
                }
              />
              <Route
                exact
                path="display/:id/*"
                element={
                  <Display showAlert={showAlert}/>
                }
              />
              </Routes>
              </div>
        </BrowserRouter>
      </NoteState>
      

    </>
  )
}

export default App
