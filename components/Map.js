import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";
import { StarIcon } from '@heroicons/react/solid'
import { HeartIcon } from '@heroicons/react/outline'
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from '../styles/Pop.module.css'

function Map(props) {
  //Transform search results into {latitude:,logitude:

  const coordinates = props.searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const center = getCenter(coordinates);
  const [selectedLocation, setSelectedLocation] = useState({});
  const [viewport, setViewport] = useState({
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });
  return (
    <ReactMapGL
      mapStyle="mapbox://styles/rozen2007/cks17c2qh4hwo18p6sdgj1kdv/draft"
      mapboxApiAccessToken="pk.eyJ1Ijoicm96ZW4yMDA3IiwiYSI6ImNrczE3NDBiNTFxdzEybm44bm9jdjFnOXkifQ.JDPUCSZn5aoKkzkY5-5KzQ"
      {...viewport}
      width="95%"
      height="99%"
      onViewportChange={(viewport) => setViewport(viewport)}
      className=" shadow-xl overlay p-10  rounded-2xl "
    >
      {props.searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-10}
            offsetTop={-10}
          >
            <h1
              onClick={() => setSelectedLocation(result)}
              className="cursor-pointer z-index-1  "
              aria-label="push-pin"
            >
            <img
              onClick={() => {
                setSelectedLocation(result);
              }}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Google_Maps_pin.svg/274px-Google_Maps_pin.svg.png"
              className={"h-8 cursor-pointer"}
              alt=""
            />
            </h1>
          </Marker>
          {selectedLocation.long === result.long ? (
            <Popup
                            onClose={() => setSelectedLocation({})}
                            closeOnClick={true}
                            latitude={result.lat}
                            longitude={result.long}
                            className="rounded-xl"

                           
                        >
                            <div className="p-3 min-w-[300px]  relative z-50">
                                <div className="image_wrapper">
                                  <img src={result.img} loading="lazy" className="w-full object-cover h-48 rounded-lg mb-3 image" alt="" />
                                </div>
                                <h3 className="text-lg font-medium text-black mb-2">{result.title}</h3>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-xl text-black font-semibold">{result.price}</p>
                                        <p className="cursor-pointer flex items-center">
                                            <StarIcon className="h-5 text-yellow-500 mr-1" />
                                            {result.star}
                                        </p>
                                    </div>
                                    <HeartIcon className="cursor-pointer h-7 text-red-600" />

                                </div>
                            </div>
                        </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;