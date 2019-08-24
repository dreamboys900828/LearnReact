import { MAP_CITIES_TYPE } from './actionTypes'

export const mapCitiesAction = ({ guessCity, hotCities, groupCities }) => ({
  type: MAP_CITIES_TYPE,
  guessCity,
  hotCities,
  groupCities
})


