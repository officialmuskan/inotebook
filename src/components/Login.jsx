import React,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import Img from "../../public/"
//use history let u redirect to other page

export default function Login(props) {
    const [credentials, setCredentials] = useState({
        email: "", password: ""}) 
    const history = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        })
        const json = await response.json()
        console.log(json)
        console.log(json.authtoken);
        if(json.success){
            console.log(json.authtoken);
            localStorage.setItem('token', json.auth_token);
            

            props.showAlert("Login Successfull", "success")
            history('/');
            
        }
        else{
            props.showAlert("Invalid Credentials", "danger")
        }

    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name] : e.target.value})
    }


    return (
        <>


            
            <div id="main-wrapper" className="container" >
    <div className="row justify-content-center" >
        <div className="col-xl-10" style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    }}>
            <div className="card border-0" style={{backgroundColor:"#12192ca5", color:"white"}}>
                <div className="card-body p-0">
                    <div className="row no-gutters">
                        <div className="col-lg-6">
                            <div className="p-5">
                                <div className="mb-5">
                                    <h3 className="h4 font-weight-bold text-theme">Login</h3>
                                </div>

                                <h6 className="h5 mb-0">Welcome back!</h6>
                                <p className="mt-2 mb-5">Enter your email address and password to access admin panel.</p>

                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">Email address</label>
                                        <input type="email" className="form-control" value={credentials.email} onChange={onChange}  id="email" name="email" aria-describedby="emailHelp" />
                    
                                    </div>
                                    <div className="form-group mb-5">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input type="password" value={credentials.password} onChange={onChange} className="form-control" name="password" id="password" />
                
                                    </div>
                                    <button type="submit" className="btn btn-theme">Login</button>
                                    {/* <a href="#l" className="forgot-link float-right text-primary">Forgot password?</a> */}
                                    <p className="text-center mt-3 mb-0">Don't have an account? <Link to="/signup" className="text-primary ml-1">register</Link></p>

                                </form>
                            </div>
                        </div>

                        <div className="col-lg-6 d-none d-lg-inline-block">
                            <div className="account-block rounded-right">
                                <div className="overlay rounded-right"></div>
                                <Img/>
                            </div>
                        </div>
                    </div>

                </div>
                
            </div>
            

           

        </div>
        
    </div>
    
</div>
            
        </>
  )
}
