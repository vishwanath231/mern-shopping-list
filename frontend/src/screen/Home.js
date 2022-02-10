import React from 'react';
import './css/Home.css';
import { connect } from 'react-redux';
import Dashboard from './DashboardScreen';
import HomeScreen from './HomeScreen';

const Home = ({ auth }) => {

    return (
        <>
            {auth.isAuthenticated ? <Dashboard auth={auth} /> : <HomeScreen />}
        </>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(Home);

