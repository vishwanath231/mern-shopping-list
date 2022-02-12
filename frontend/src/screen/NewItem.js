import React,{ useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../redux/actions/itemActions';
import { clearErrors } from '../redux/actions/errorActions';
import './css/NewItem.css';

const NewItem = ({ addItem, error,clearErrors, isAuthenticated }) => {

    const [data, setData] = useState({
        name: ''
    });
    const [err, setErr] = useState(null);


    const handleChange = e => {
        const { name, value } = e.target;

        setData({
            ...data,
            [name]: value
        })
    }


    const handleSubmit = e => {
        e.preventDefault();

        addItem(data);

        setData({
            name: ''
        })
    }

    useEffect(() => {
        
        if (error.id === "ADD_FAIL") {

            setErr(error.msg.msg);

            setTimeout(() => {
                clearErrors();
            }, 4000);
        }else {
            setErr(null)
        }
        
    }, [error, clearErrors]);

    return (
        <div className='newItem__container'>
            <h2>Shopping List</h2>
            {err && <div className='errorBox'>{err}</div>}
            {
                isAuthenticated ? 
                <form onSubmit={handleSubmit} className='new__form'>
                    <input
                        type="text"
                        name='name'
                        id='name' 
                        placeholder='add item...'
                        onChange={handleChange}
                        value={data.name} 
                        className="name__input"
                    />
                    <button type='submit' className='submit__btn'>add</button>
                </form> : <p>Please log in to manage items.</p>
            }
        
        </div>
    );
};

const mapStateToProps = (state) => ({
    error: state.error,
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps, { addItem, clearErrors })(NewItem);
