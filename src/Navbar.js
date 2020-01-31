import { Component } from "react";
import React from 'react';
import { AppBar, Button, Toolbar, Typography, Link } from '@material-ui/core';  
export default class Navbar extends Component{

    constructor(props){
        super(props);
        this.state = {
            email: localStorage.getItem('mail')
        };
    }

    logout(){
        localStorage.removeItem("mail");
        localStorage.removeItem("token");
    }

    render(){
        if(!this.state.email){
        return (
            <AppBar position="static">
                <Toolbar>  
                    <Typography>
                        <Link href="/" color="inherit">
                            <Button>
                            Login
                            </Button>
                        </Link>
                        
                    </Typography>
                </Toolbar>
            </AppBar>
        )
        } else {
            return (
            <AppBar position="static">
                <Toolbar>  
                    <Typography>
                        <Link href="/" color="inherit" onClick={() => this.logout()}>
                            <Button>
                            Logout
                            </Button>
                        </Link>
                        <Link href="/Recherche" color="inherit">
                            <Button>
                            Recherche
                            </Button>
                        </Link>
                        <Link href="/Reservations" color="inherit">
                            <Button>
                            Reservations
                            </Button>
                        </Link> 
                        <Link href="/User" color="inherit">
                            <Button>
                                User
                            </Button>
                        </Link> 
                    </Typography>
                </Toolbar>
            </AppBar>
            )
        }
    }

}