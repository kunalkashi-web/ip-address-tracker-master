const input = document.querySelector("input");
const form = document.querySelector("form");
const button = document.querySelector(".submit-button");

let map = L.map("map");

button.addEventListener("click", (e) => {
  e.preventDefault();
  updateLocation(input.value);
});

const getLocation = (lat, lon) => {
  map.setView([lat, lon], 15);
  marker = L.marker([lat, lon]).addTo(map);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
};

const updateLocation = async (address) => {
  const res = await axios.get(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_USNgkMYCXFsSTZBxyjhW1xRhhX0h9&ipAddress=${address}`
  );

  document.querySelector(".ip-address").innerHTML = `${res.data.ip}`;
  document.querySelector(
    ".location"
  ).innerHTML = `${res.data.location.country},${res.data.location.city}`;
  document.querySelector(
    ".Timezone"
  ).innerHTML = `UTC ${res.data.location.timezone}`;
  document.querySelector(".isp").innerHTML = `${res.data.isp}`;

  let lat = res.data.location.lat;
  let lon = res.data.location.lng;

  getLocation(lat, lon);
};

updateLocation("");
