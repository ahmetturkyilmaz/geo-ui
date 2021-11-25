import React, {useEffect, useRef, useState} from "react";
import mapboxgl from "mapbox-gl";
import {OfficeResponse} from "./types/OfficeResponse";


export function Map(props: { offices: OfficeResponse[]; }) {
    const mapRef = useRef(null);
    const [map, setMap] = useState<mapboxgl.Map>();

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYWhtZXR0dXJreWlsbWF6IiwiYSI6ImNrdzZyNGIzdzB0N3Ayb2xqZ3dxc3k0czQifQ.X-cuanxvxvl2E6ojfV0c2A';

        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-0.142571, 51.5144636],
            zoom: 8
        })
        console.log("2", map)

        map.on("load", () => {
            map.addSource('places', {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    // @ts-ignore
                    features: companyInfo()
                }
            });

            map.addLayer({
                id: 'places',
                type: 'circle',
                source: 'places',
                paint: {
                    'circle-color': '#4264fb',
                    'circle-radius': 6,
                    'circle-stroke-width': 2,
                    'circle-stroke-color': '#ffffff'
                }
            });
            const popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false
            });

            map.on('mouseenter', 'places', (e) => {
                // Change the cursor style as a UI indicator.
                map.getCanvas().style.cursor = 'pointer';

                // Copy coordinates array.
                // @ts-ignore
                const coordinates = e.features[0].geometry.coordinates.slice();
                // @ts-ignore
                const description = e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

// Populate the popup and set its coordinates
// based on the feature found.
                popup.setLngLat(coordinates).setHTML(description).addTo(map);
            });

            map.on('mouseleave', 'places', () => {
                map.getCanvas().style.cursor = '';
                popup.remove();
            });
            setMap(map)
        });
        return () => map.remove();
    }, [mapRef]);

    useEffect(() => {
        addData();
    }, [props.offices]);

    const addData = () => {
        if (map) {
            // @ts-ignore
            map.getSource('places').setData({
                type: "FeatureCollection",
                // @ts-ignore
                features: companyInfo()
            })
        }
    };

    const companyInfo = () => {
        console.log("offices", props.offices)
        return props.offices.map(item => {
            return {
                type: 'Feature',
                properties: {
                    description: `<strong>${item.organization}<strong><br/><p>${item.services}</p>`
                },
                geometry: {
                    type: 'Point',
                    coordinates: item.coordinates
                }
            }
        });
    }

    return (
      <div className="App-Map" ref={mapRef} id="map">

      </div>
    );

}
