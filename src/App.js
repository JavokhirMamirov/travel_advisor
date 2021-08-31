/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import {CssBaseline, Grid} from '@material-ui/core';

import { getPlacesData } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
// import PlaceDetails from './components/PlaceDetails/PlaceDetails';


const App  = () => {
    
    const [places, setPlaces] = useState([]);
    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});
    const [childClicked, setChildClicked] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [filterPlaces, setFilterPlaces] = useState([]);

    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(({
            coords: {latitude, longitude}
        })=>{setCoordinates({lat:latitude, lng:longitude})});
    }, []);

    useEffect(() => {
        const filterPlaces = places.filter((place)=> place.rating > rating);
        setFilterPlaces(filterPlaces);
        console.log(filterPlaces);
    }, [rating]);

    useEffect(() => {
        setIsLoading(true);
        getPlacesData( type,bounds.sw, bounds.ne).then((data)=>{
            setPlaces(data);
            setFilterPlaces([]);
            setIsLoading(false);
            
        })
    }, [type, coordinates, bounds]);

    return (
        <>
            <CssBaseline/>
            <Header setCoordinates={setCoordinates}/>
            <Grid container spacing={3} style={{width:'100%'}}>
                <Grid item xs={12}  style={{width:'100%'}} md={4}>
                    <List 
                    places={ filterPlaces.length ? filterPlaces : places} 
                    childClicked={childClicked}
                    isLoading={isLoading}
                    type={type}
                    setType={setType}
                    rating={rating}
                    setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12}  style={{width:'100%'}} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filterPlaces.length ? filterPlaces : places}
                        setChildClicked={setChildClicked}
                    />
                </Grid>
            </Grid>
        </>
    )
}


export default App;