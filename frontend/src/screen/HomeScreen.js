import React,{ useEffect } from 'react';
import './css/Home.css';
import { connect } from 'react-redux';
import { getItems, deleteItem, isCheckItem } from '../redux/actions/itemActions';
import { IoClose } from 'react-icons/io5';
import { GoCheck } from 'react-icons/go';
import Loader from '../components/loader/Loader';

const HomeScreen = ({ item, getItems, deleteItem, isCheckItem, isAuthenticated}) => {

    useEffect(() => {
        getItems();
    }, [getItems]);

    const deleteItemHandle = id => {
        deleteItem(id);
    }
    const { items, isLoading } = item;


    // check item
    const checkItem = (id) => isCheckItem(id, {isCheck: true })

    // uncheck item
    const unCheckItem = (id) => isCheckItem(id, {isCheck: false})


    return (

        <div className='item__containter'>
            {
                isLoading ? <Loader /> :  <div className='item__box'>
                { items.map((val)  => (
                    <div key={val._id} className="item__list">
                        <div className='item__name' style={{textDecoration : val.isCheck ? 'line-through': null}} >{val.name}</div>
                        { 
                            isAuthenticated ? 
                            <div className='item__actions'>
                                <button className='action__icon' onClick={val.isCheck ? () => unCheckItem(val._id) : () => checkItem(val._id) }>
                                    <GoCheck className='check__icon' />
                                </button> 
                                <button className='action__icon' onClick={() => deleteItemHandle(val._id)}>
                                    <IoClose className='delete__icon'/>
                                </button>
                            </div> 
                            : null
                        }
                        
                    </div>
                ))}
            </div>
            }
            
        </div>
    );
};

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getItems, deleteItem, isCheckItem })(HomeScreen);
