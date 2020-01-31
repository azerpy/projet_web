import React from 'react';  
import { Component } from "react"; 
import { TextField, Button } from '@material-ui/core'; 
import Autocomplete from '@material-ui/lab/Autocomplete';


export default class Recherche extends Component {

    constructor(props){
        super(props);
        this.state = {
            gareDepart: '',
            gareArrivee: '',
            date : '',
            resultDepart : [],
            resultArrivee: [],
            prix : 20
        };
        if(localStorage.getItem("promo")){
            this.state.prix = 10;
        }
    }

    async rechercherGare(gare) {
        var resultFetch = await fetch('https://ressources.data.sncf.com/api/records/1.0/search/?dataset=referentiel-gares-voyageurs&q='+gare).catch(error=> console.log("L'URL n'est pas correcte"));
        if(!resultFetch){
            return;
        }
        var resultJson = await resultFetch.json().catch(error => console.log("Can't json"));
        var tabResults = resultJson.records.map(function(record){
            return record.fields.gare_ut_libelle;
        });
       this.setState({
        resultDepart: tabResults
       })
    }

    componentDidMount(){ 
        this.rechercherGare(this.state.gare);
    } 

    async onChangeDepart(e){ 
        this.rechercherGare(e.target.value);
    }

    async onChangeArrivee(e){
        this.rechercherGare(e.target.value);
    }

    async onChangeDate(e){
        this.state.date = e.target.value;
    }

    onChangeSelectedDepart(e){ 
        this.state.gareDepart = e.target.innerHTML;
    }

    onChangeSelectedArrivee(e){
        this.state.gareArrivee = e.target.innerHTML;
    }

    reserverBillet(){
        var billet = JSON.stringify({
            "gareDepart": this.state.gareDepart,
            "gareArrivee" : this.state.gareArrivee,
            "date": this.state.date,
            "prix": this.state.prix
        }); 
        var billets = localStorage.getItem("billets") ; 
        
        if(billets) {
            billets = JSON.parse(billets);
            billets = [...billets, billet];
        } else {
            billets = [billet];
            
        } 
        localStorage.setItem("billets", JSON.stringify(billets));
        document.location.href="/Reservations"; 
    }
    
    render(){
        return (
        <div style={{width: "18rem"}}>
            <br></br>
            <Autocomplete 
                options={this.state.resultDepart} 
                style={{ width: 300 }} 
                onChange={this.onChangeSelectedDepart.bind(this)}
                renderInput={params => (
                    <TextField {...params} label="Gare depart" variant="outlined" fullWidth defaultValue={this.state.gareDepart} 
                    onChange={this.onChangeDepart.bind(this)}/>
                )}
            /> 
            <br></br>
            <Autocomplete 
                options={this.state.resultDepart} 
                style={{ width: 300 }} 
                onChange={this.onChangeSelectedArrivee.bind(this)}
                renderInput={params => (
                    <TextField {...params} label="Gare arrivée" variant="outlined" fullWidth defaultValue={this.state.gareArrivee} 
                    onChange={this.onChangeArrivee.bind(this)}/>
                )}
            /> 
            <br></br>
            <TextField 
                label="Date"
                type="date"
                defaultValue= {this.state.date}
                onChange={this.onChangeDate.bind(this)}
                InputLabelProps={{
                shrink: true,
                }}
            />
            <br></br>
            <br></br>
            <Button variant="contained" color="primary" onClick={()=> this.reserverBillet()}>
                Réserver ce billet
            </Button>
        </div>	
        )
    }       
}