import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";
import { StarIcon } from '@heroicons/react/solid'
import { HeartIcon } from '@heroicons/react/outline'


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
    zoom: 10,
  });
  return (
    <ReactMapGL
      mapStyle="mapbox://styles/rozen2007/cks17c2qh4hwo18p6sdgj1kdv/draft"
      mapboxApiAccessToken="pk.eyJ1Ijoicm96ZW4yMDA3IiwiYSI6ImNrczE3NDBiNTFxdzEybm44bm9jdjFnOXkifQ.JDPUCSZn5aoKkzkY5-5KzQ"
      {...viewport}
      width="95%"
      height="99%"
      onViewportChange={(viewport) => setViewport(viewport)}
      className=" shadow-xl overlay p-5 bg-white rounded-xl py-10 px-10"
    >
      {props.searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              onClick={() => setSelectedLocation(result)}
              className="cursor-pointer animate-bounce "
              aria-label="push-pin"
            >
              📌
            </p>
          </Marker>
          {selectedLocation.long === result.long ? (
            <Popup
                            onClose={() => setSelectedLocation({})}
                            closeOnClick={true}
                            latitude={result.lat}
                            longitude={result.long}
                        >
                            <div className="p-3 min-w-[300px] relative z-50">
                                <div className="image_wrapper">
                                  <img src={result.img} loading="lazy" className="w-full object-cover h-48 rounded-lg mb-3 image" alt="" />
                                </div>
                                <h3 className="text-lg font-medium mb-2">{result.title}</h3>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-xl font-semibold">{result.price}</p>
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