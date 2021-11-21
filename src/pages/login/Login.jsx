import React, { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import '../../Style.css';
import '../../Signin.css';
import { Context } from '../../Context'

function Login() {

    const history = useHistory();
    const [user, setuser] = useState('');
    const [password, setpassword] = useState('');
    const [wrong, setWrong] = useState();

    const { setlogin } = useContext(Context);

    function submit(e) {
        e.preventDefault();
        // console.log(e);
        const details = { userName: user, Password: password };
        axios.post('/login', details).then((res) => {
            if (!res.data.wrong) {
                setlogin(true);
                history.push('/');
            } else {
                setuser('');
                setpassword('');
                setWrong(res.data.wrong);
            }
        });

    }

    return (
        <div>
            <section className="row" >
                <div className="container" style={{ "marginTop": "25vh" }} >
                    <div className="col-md-6 col-12 mx-auto">
                        <form onSubmit={submit} >
                            <div className="mb-3">
                                <h1 className="mx-auto" style={{ "width": "125px" }}>LOGIN</h1>
                            </div>
                            <p className="error" style={{ "color": "red" }}>{wrong}</p>
                            <div className="mb-3">
                                <label className="form-label">User Name</label>
                                <input type="text" className="form-control" id="userName" placeholder="UserName" value={user} onChange={e => { setuser(e.target.value) }} name="userName" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" className="form-control" id="Password" placeholder="Password" value={password} onChange={e => { setpassword(e.target.value) }} name="Password" />
                            </div>
                            <div className="mb-3">
                                <Link to='/signup' > create new account </Link>
                                <button className="float-right btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login
