const request = require("postman-request");

const geocode = (address, callback) => {
  const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      encodeURI(address) +
      ".json?access_token=pk.eyJ1IjoibW9pbi04MjciLCJhIjoiY2tzczNpMXV6MGw5YzMxcG5xOTRhMDFyOCJ9.WDp4IlJxh8XayRfNrBdx6A&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect location services.", undefined);
    } else if (!body.features.length) {
      callback(
        "Unable to find the location. Try with different search term",
        undefined
      );
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
