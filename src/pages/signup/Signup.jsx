import React, { useState } from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import '../../Signin.css'


function Signup() {

    const history = useHistory();
    const [user, setuser] = useState();
    const [email, setemail] = useState();
    const [password, setpassword] = useState();

    function submit(e) {

        e.preventDefault();
        const accountDetails = { userName: user, email: email, Password: password };

        axios.post('http://localhost:9000/signup', accountDetails).then((res) => {
            history.push('/login');
        });
    }

    return (
        <div>
            <section className="row" >
                <div className="container" style={{ "marginTop": "20vh" }}>
                    <div className="col-md-6 mx-auto">
                        <form onSubmit={submit} >
                            <div className="mb-3 px-auto " style={{ "display ": " flex", "justifyContent": "center" }}>
                                <h1 id="headerMain"  >Create new account</h1>
                            </div>
                            <p className="error" style={{ "color ": "red" }}></p>
                            <div className="mb-3">
                                <label className="form-label">UserName</label>
                                <input type="text" className="form-control" id="userName" placeholder="Enter your UserName" name="userName" value={user} onChange={(e) => { setuser(e.target.value) }} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email Address</label>
                                <input type="email" className="form-control" id="Email" placeholder="Email Address" name="Email" value={email} onChange={(e) => { setemail(e.target.value) }} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="Password" className="form-control" id="Password" placeholder="Password" name="Password" value={password} onChange={(e) => { setpassword(e.target.value) }} />
                            </div>
                            <div className="mb-3">
                                <Link to="/login" className="float-left">Already have account?</Link>
                                <button className="float-right btn btn-primary">Signup</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Signup
