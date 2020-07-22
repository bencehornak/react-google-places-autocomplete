import GooglePlacesAutocomplete from './GooglePlacesAutocomplete';
import injectScript from './helpers/injectScript';
import { geocodeByAddress, geocodeByPlaceId, getLatLng } from './utils/googleGeocodesHelper';

export {
  geocodeByAddress, geocodeByPlaceId, getLatLng, injectScript,
};
export default GooglePlacesAutocomplete;
