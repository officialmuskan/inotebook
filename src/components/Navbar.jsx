import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from 'react-router-dom';

function Navbar() {


  let location = useLocation();                          //print the location
  useEffect(() =>{

  }, [location])
  const history = useNavigate();
  const handlelog = ()=>{
    localStorage.removeItem('token')
    history('/login')
  }
  return (
    <>
      <nav style={{backgroundColor: "#12192c", color:"white"}} className="navbar navbar-expand-lg" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand mx-5" to="/">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item ps-5" >
                <Link className="nav-link " aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item  ps-5">
                <Link className={`nav-link ${location.pathname === '/about' ? "active":""}`} to="about">
                  About
                </Link>
              </li>
            </ul>
            
              {!localStorage.getItem('token') ? <div> <Link className="btn btn-outline-theme ms-5 " type="submit" to="/login">Login
              
              </Link>
              <Link className="btn btn-theme mx-5 px-4 py-1" type="submit" to="/signup">
                Signup
              </Link></div>: <button onClick={handlelog} className="btn btn-theme mx-5">
                LogOut
              </button>}
            
          </div>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
