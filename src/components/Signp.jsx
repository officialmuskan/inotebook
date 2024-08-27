import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signp(props) {
    const [credentials, setCredentials] = useState({
       name:"", email: "", password: "", cpassword:""}) 
    const history = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/create",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: credentials.name,email: credentials.email, password: credentials.password})
        })
        const json = await response.json()
        console.log(json)
        if(json.success){

            localStorage.setItem('token', json.auth_token);
            
            props.showAlert("Created account successfully", "success")
            history("/");
            
        }
        else{
            props.showAlert("User already exists", "danger")
        }

    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name] : e.target.value})
    }

  return (

    <div id="main-wrapper" class="container">
    <div class="row justify-content-center">
        <div class="col-xl-10" style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    }}>
            <div class="card border-0" style={{backgroundColor:"#12192ca5", color:"white"}}>
                <div class="card-body p-0">
                    <div class="row no-gutters">
                        <div class="col-lg-6">
                            <div class="p-5">
                                <div class="mb-5">
                                    <h3 class="h4 font-weight-bold text-theme">Create your account</h3>
                                </div>

                                
                                <p class="mt-2 mb-5">Enter your personal details to create a free account on iNoteBook.</p>

                                <form onSubmit={handleSubmit}>
                                    <div class="form-group">
                                    <label htmlFor="email" className="form-label">Name</label>
                                    <input type="text" className="form-control"   onChange={onChange} id="name" name="name" aria-describedby="emailHelp" />

                                    </div>
                                    <div class="form-group ">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" className="form-control"   onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                                    </div>
                                    <div class="form-group mb-5">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password"  className="form-control" name="password" onChange={onChange} id="password" />
                
                                    </div>
                                    <button type="submit" class="btn btn-theme">Register</button>
                                    {/* <a href="#l" class="forgot-link float-right text-primary">Forgot password?</a> */}
                                    
                                </form>
                            </div>
                        </div>

                        <div class="col-lg-6 d-none d-lg-inline-block">
                            <div class="account-block rounded-right">
                                <div class="overlay rounded-right"></div>
                                
                            </div>
                        </div>
                    </div>

                </div>
                
            </div>
            

           

        </div>
        
    </div>
    
</div>
            
  )
}
