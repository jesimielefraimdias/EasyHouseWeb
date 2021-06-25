import React, { useState } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { Layout } from "./layout"
export const MapContainer = (props) => {

    
    const {currentLocation, setCurrentLocation } = props;
    const mapClicked = (mapProps, map, clickEvent) => {
        console.log(clickEvent.latLng.lat(), clickEvent.latLng.lng());
        setCurrentLocation({ lat: clickEvent.latLng.lat(), lng: clickEvent.latLng.lng() })
        // ...
    }

    return (

        <Layout>

            <Map
                onClick={mapClicked}
                centerAroundCurrentLocation={true}
                google={props.google}
                containerStyle={{
                    position: "relative",
                    height: 400,
                    width: "80%",
                }}
                zoom={15}
            >
                {!!currentLocation &&
                    <Marker
                        title={'A localização do imóvel'}
                        name={'Imóvel'}
                        position={{ lat: currentLocation.lat, lng: currentLocation.lng }} />
                }
            </Map>
        </Layout>
    );

}

export default GoogleApiWrapper({
    apiKey: "AIzaSyAd1IUZTkJh46Qoj2ZVR_4qJLCL1VdJbEM"
})(MapContainer)
