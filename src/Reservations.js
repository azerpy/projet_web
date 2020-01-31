import React from 'react';  
import { Component } from "react"; 
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default class Recherche extends Component {

    constructor(props){
        super(props);
        this.state = {
            billets: []
        }; 
        this.rechargerBillets();
    }

    rechargerBillets(){
        var billets = localStorage.getItem("billets");
        if(!billets){
            return;
        }
        this.state.billets= JSON.parse(billets);
    }

    supprimerBillets(){
        localStorage.removeItem("billets");
        this.rechargerBillets();
    }

    render(){
        return (  
            <>
                {this.state.billets.map(function(billet, index){
                    billet = JSON.parse(billet);
                    return <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {billet.gareDepart}
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {billet.gareArrivee}
                            </Typography>
                            <Typography color="textSecondary">
                                {billet.date}
                            </Typography> 
                            <Typography variant="body2" component="p">
                                {billet.prix}€
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                })} 
                <Button variant="contained" color="secondary" onClick={()=>this.supprimerBillets()}>
                    Supprimer les billets
                </Button>
            </>
    )}

}