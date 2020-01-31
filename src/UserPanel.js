import { Component } from "react";
import React from 'react';
import { TextField, Button } from '@material-ui/core';

export default class UserPanel extends Component{

    constructor(props){
        super(props);
        this.state = {
            promo : '',
            promoApplique: localStorage.getItem("promo"),
            billets: localStorage.getItem("billets"),
            email: localStorage.getItem('mail')
        };
    }

    ajouterPromo(){
        if(!this.getBillets()){
        localStorage.setItem("promo", JSON.stringify(this.state.promo));
        this.state.promoApplique = this.state.promo;
        }
    }

    onChangePromo(e){
        this.state.promo = e.target.value;
    }

    supprimerPromo(){
        if(!this.getBillets()){
            localStorage.removeItem("promo");
            this.state.promoApplique = null;
        }
    }
    
    getBillets(){
        var billets = localStorage.getItem("billets");
        if(billets){
            this.state.billets = billets;
        }
        return billets;
    }

    render(){
        if(this.state.promoApplique == null){
        return  (
        <>
        <div>Email : {this.state.email} </div>
        <form noValidate autoComplete="off" >
            <div> 
                <TextField 
                label="Code promotionnel" 
                onChange={this.onChangePromo.bind(this)}
                defaultValue={this.state.promo}
                />
                <Button variant="contained" color="primary" onClick={()=>this.ajouterPromo()}>
                    Ajouter une promotion
                </Button>
            </div> 
        </form> 
        </>
        )} else {
            return (
        <>
        <div>Email : {this.state.email} </div>
        <div>
            
        Votre code promo : {JSON.parse(this.state.promoApplique)}
        
        <Button variant="contained" color="secondary" onClick={()=>this.supprimerPromo()}>
        Supprimer votre code promo.
        </Button>
    
        </div>
        </>
        )};
    }
}