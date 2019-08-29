import axios from "axios";
import { MAP_CITIES_TYPE } from './actionTypes'

export const mapCitiesAction = ({ guessCity, hotCities, groupCities }) => ({
  type: MAP_CITIES_TYPE,
  guessCity,
  hotCities,
  groupCities
})

export const RequestCities = () => {
  return (dispatch) => {
    let guess = axios.get("/v1/cities?type=guess")
    let hot = axios.get("/v1/cities?type=hot")
    let group = axios.get("/v1/cities?type=group")

    axios.all([guess, hot, group])
      .then((res) => {
        let guessCity = res[0].data
        let hotCities = res[1].data
        let groupCities = sortCities(res[2].data)
        dispatch(mapCitiesAction({ guessCity, hotCities, groupCities }))
      });


  }
}

//所有城市排序
const sortCities = (unordered) => {
  const ordered = {};
  Object.keys(unordered).sort().forEach(function (key) {
    ordered[key] = unordered[key];
  });
  return ordered;
}



