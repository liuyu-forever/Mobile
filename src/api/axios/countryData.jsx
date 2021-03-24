import axios from "axios";

function axiosGetCountryData() {
  return axios({
    url: "/common/countryData",
  });
}

export { axiosGetCountryData };
