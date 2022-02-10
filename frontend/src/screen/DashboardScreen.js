import React from 'react';

const DashboardScreen = ({ auth }) => {

    return (
        <div className='dashboardscreen__container'>
            <h2>hi.. {auth.user.name} 🖐</h2>
        </div>
    );
};



export default DashboardScreen;
