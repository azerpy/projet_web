import { Component } from "react";
import React from 'react';
import { TextField, Button } from '@material-ui/core';

export default class Login extends Component{

    constructor(props){
        super(props); 
        this.state = {
            email: 'eve.holt@reqres.in',
            password: 'cityslicka'
        }
    }

    async onChangeMail(e){
        this.state.email = e.target.value;
    }

    async onChangePwd(e){
        this.state.password = e.target.value;
    }

    render(){
        return  (
        <form noValidate autoComplete="off" > 
            <div> 
                <TextField 
                label="Email"
                type="email" 
                onChange={this.onChangeMail.bind(this)}
                defaultValue={this.state.email}
                />
            </div>
            <div> 
                <TextField  
                label="Password"  
                type="password" 
                onChange={this.onChangePwd.bind(this)}
                defaultValue={this.state.password}
                />
            </div> 
            <Button variant="contained" color="primary" onClick={()=>this.connexion()}>
                Se connecter
            </Button>
        </form>
        )
    }

    async connexion(){
        var resultFetch = await fetch('https://reqres.in/api/login', {
            method: 'post',
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body : JSON.stringify
            ({
                "email" : this.state.email,
                "password" : this.state.password
            })
        }).catch(error=> console.log("L'URL n'est pas correcte"));
        if(!resultFetch){
            return;
        }
        if(resultFetch.status===200){
            var resultJson = await resultFetch.json().catch(error => console.log("Can't json"));
            localStorage.setItem('token', resultJson.token);
            localStorage.setItem('mail', this.state.email);
            document.location.href="/Recherche"; 
        }
    }
}