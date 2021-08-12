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
    zoom: 12,
  });
  return (
    <div className="bg-gradient-to-t from-transparent to-white">  
    <ReactMapGL
      mapStyle="mapbox://styles/rozen2007/cks17c2qh4hwo18p6sdgj1kdv/draft"
      mapboxApiAccessToken="pk.eyJ1Ijoicm96ZW4yMDA3IiwiYSI6ImNrczE3NDBiNTFxdzEybm44bm9jdjFnOXkifQ.JDPUCSZn5aoKkzkY5-5KzQ"
      {...viewport}
      width="100%"
      height="100vh"
      onViewportChange={(viewport) => setViewport(viewport)}
      className=" sticky z-0 -mb-[40vh]  bottom-0   "
      style={{marginBottom: '-40vh', backgroundImage: 'linearGradient(red, yellow)',}}
    >
      {props.searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-10}
            offsetTop={-10}
          >
            <p
              onClick={() => setSelectedLocation(result)}
              className="cursor-pointer      rounded-md w-10 pl-1 hover:animate-bounce "
              aria-label="push-pin"
            >
             
              <img
              onClick={() => {
                setSelectedLocation(result);
              }}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Google_Maps_pin.svg/274px-Google_Maps_pin.svg.png"
              className={"h-8 cursor-pointer z-1"}
              alt=""
            />
            </p>
          </Marker>
          {selectedLocation.long === result.long ? (
            <Popup
                            onClose={() => setSelectedLocation({})}
                            closeOnClick={true}
                            latitude={result.lat}
                            longitude={result.long}
                            className="rounded-2xl"

                           
                        >
                            <div className="p-3 min-w-[300px]  relative z-50 rounded-2xl">
                                <div className="image_wrapper">
                                  <img src={result.img} loading="lazy" className="w-full object-cover z-50 h-48 rounded-lg mb-3 image" alt="" />
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
    </div>  
  );
}

export default Map;