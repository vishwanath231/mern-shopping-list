import React,{ useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './css/Form.css';
import { connect } from 'react-redux';
import { login } from '../redux/actions/authActions';
import { clearErrors } from '../redux/actions/errorActions';
import { useNavigate } from 'react-router-dom';


const LoginScreen = ({ isAuthenticated, error, login, clearErrors }) => {


    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const [err, setErr] = useState(null);

    const changeHandle = e => {
        const { name, value } = e.target;
        
        setData({
            ...data,
            [name]: value
        })
    }

    const navigate = useNavigate();

    const submitHandle = e => {
        e.preventDefault();

        login(data);
    }


    useEffect(() => {
        
        if (error.id === "LOGIN_FAIL") {
            setErr(error.msg.msg)

            setTimeout(() => {
                clearErrors();
            }, 5000);

        }else{
            setErr('')
        }

        if (isAuthenticated) {
            navigate('/')
        }

    }, [error, setErr, clearErrors, isAuthenticated, navigate]);

    
    return (
        <>  <div className="login">
                <div className="login__box">
                    <div className="login__title">Login</div>
                    {err && <div className='errorBox'>{err}</div> }
                    <form className="login__form" onSubmit={submitHandle}>
                        <div className="login__input_box">
                            <label htmlFor="email" className="login__label">Email</label>
                            <input 
                                type="email"  
                                placeholder="example@support.com" 
                                className="login__input"
                                name="email"
                                id="email"
                                onChange={changeHandle}
                                value={data.email}  
                            />
                        </div>    
                        <div className="login__input_box">
                            <label htmlFor="Password" className="login__label">Password</label>
                            <input 
                                type="password"  
                                placeholder="******" 
                                className="login__input"
                                name="password"
                                id="password" 
                                onChange={changeHandle}
                                value={data.password}
                            />
                        </div>
                        <button type="submit" className="login__btn">Login</button>
                    </form>
                    <div className="register__link">
                        You don't have account! &nbsp;
                        <NavLink to="/register">SignUp here</NavLink>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});


export default connect(mapStateToProps, { login, clearErrors })(LoginScreen);
