import React,{ useState } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import LOGO from './logo.png';
import { logoutUser } from '../redux/actions/authActions';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';



const Navbar = ({ auth ,logoutUser }) => {

    const [show, setShow] = useState(false);

    const navigate = useNavigate();

    const logoutHandle = () => {
        logoutUser();
        navigate('/')
    }

    const showBox = () => setShow(!show);


    return (
        <>
            <div className='navbar'>
                <div className='nav'>
                    <div className='navbar__left'>
                        <NavLink to='/'>
                            <img src={LOGO} alt='logo' className='logo' />
                        </NavLink>
                    </div>
                    <div className='navbar__right'>
                        {auth.isAuthenticated ? (
                            <div className='user__box'>
                                <div onClick={showBox} className="user__name">
                                    {auth.user ? auth.user.name : ''}
                                    {show ? <HiChevronUp className='up__icon' /> : <HiChevronDown className='down__icon' />} 
                                    </div>
                                {show ? (
                                    <div className='user__list'>
                                        <p>{auth.user.email}</p>
                                        <button onClick={logoutHandle}>logout</button> 
                                    </div>
                                ) : null}
                            </div> 
                        ) : 
                            (
                                <div className='navbar__btns'>
                                    <NavLink to="/login"  className='signIn__btn'>sign in</NavLink>
                                    <NavLink to="/register" className='signUp__btn'>sign up</NavLink>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
};


const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
