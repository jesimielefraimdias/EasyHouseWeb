import React, { useState } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { Layout } from "./layout"
export const MapContainer = (props) => {
    const { locations = [] } = props;
    return (

        <Layout>

            <Map
                centerAroundCurrentLocation={true}
                google={props.google}
                containerStyle={{
                    position: "relative",
                    height: "75vh",
                    width: "100%",
                }}
                zoom={15}
            >{
                    !!locations && locations.map(element => {

                        return (
                            <Marker
                                title={element.nickname}
                                name={element.complement}
                                position={{ lat: element.lat, lng: element.lng }} />
                        );
                    })
                }
            </Map>
        </Layout>
    );

}

export default GoogleApiWrapper({
    apiKey: "AIzaSyAd1IUZTkJh46Qoj2ZVR_4qJLCL1VdJbEM"
})(MapContainer)
