import React,{ useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './css/Form.css';
import { connect } from 'react-redux';
import { register } from '../redux/actions/authActions';
import { clearErrors } from '../redux/actions/errorActions';
import { useNavigate } from 'react-router-dom';

const RegisterScreen = ({ isAuthenticated, error, register, clearErrors }) => {

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
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

        register(data); 
    }


    useEffect(() => {
        
        if (error.id === "REGISTER_FAIL") {
            setErr(error.msg.msg)

            setTimeout(() => {
                clearErrors();
            }, 5000);

        }else{
            setErr('')

            if (isAuthenticated) {
                navigate('/')
            }
        }

    }, [error, setErr, clearErrors, isAuthenticated, navigate]);



    return (
        <>
            <div className="register">
                <div className="register__box">
                    <div className="register__title">register</div>
                    {err && <div className='errorBox'>{err}</div> }
                    <form className="register__form" onSubmit={submitHandle}>
                        <div className="register__input_box">
                            <label htmlFor="name" className="register__label">Username</label>
                            <input 
                                type="text"  
                                placeholder="will smith" 
                                className="register__input"
                                name="name"
                                id="name"
                                onChange={changeHandle}
                                value={data.name} 
                            />
                        </div>    
                        <div className="register__input_box">
                            <label htmlFor="email" className="register__label">Email</label>
                            <input 
                                type="email"  
                                placeholder="example@support.com" 
                                className="register__input"
                                name="email"
                                id="email" 
                                onChange={changeHandle}
                                value={data.email}
                            />
                        </div>    
                        <div className="register__input_box">
                            <label htmlFor="password" className="register__label">Password</label>
                            <input 
                                type="password"  
                                placeholder="******" 
                                className="register__input"
                                name="password"
                                id="password"
                                onChange={changeHandle}
                                value={data.password} 
                            />
                        </div>
                        <div className="register__input_box">
                            <label htmlFor="password2" className="register__label">Confirm Password</label>
                            <input 
                                type="password"  
                                placeholder="******" 
                                className="register__input"
                                name="password2"
                                id="password2"  
                                onChange={changeHandle}
                                value={data.password2}
                            />
                        </div>
                        <button type="submit" className="register__btn">Register</button>
                    </form>
                    <div className="login__link">
                        You have account! &nbsp;
                        <NavLink to="/login">Login here</NavLink>
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



export default connect(mapStateToProps, { register, clearErrors })(RegisterScreen);
