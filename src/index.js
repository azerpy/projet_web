import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; 
import Login from './Login'; 
import Recherche from './Recherche';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Reservations from './Reservations';
import Navbar from './Navbar';
import UserPanel from './UserPanel'; 

function App({isLogged}){
    return ( 
        <>
        <Router>
            <Navbar></Navbar> 
                <Route exact path="/" component={Login}/> 
                <Route path= "/Recherche" component={Recherche}/>
                <Route path= "/Reservations" component={Reservations}/>
                <Route path= "/User" component={UserPanel}/>
        </Router>

        </>
    ) 
}


ReactDOM.render(<App isLogged={false} />, document.getElementById('root'));