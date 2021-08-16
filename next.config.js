const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["links.papareact.com","i.ibb.co", "a0.muscache.com","res.cloudinary.com", "https://media.giphy.com/","static.dezeen.com","cdn.dribbble.com"],
  },
  env : {
    mapbox_key: 'pk.eyJ1Ijoicm96ZW4yMDA3IiwiYSI6ImNrczBvM3kwNTFseGsycXM3dzljOWdlc20ifQ.mazu3J8KWa6Xlix7K4nzoQ'
  }
};
