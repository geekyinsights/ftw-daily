import { types as sdkTypes } from './util/sdkLoader';

const { LatLng, LatLngBounds } = sdkTypes;

// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.
export default [
  {
    id: 'default-jackson',
    predictionPlace: {
      address: 'Jackson, MS',
      bounds: new LatLngBounds(new LatLng(31.298756, -90.184807), new LatLng(32.298756,-91.184807)),
    },
  },
  {
    id: 'default-memphis',
    predictionPlace: {
      address: 'Memphis, TN',
      bounds: new LatLngBounds(new LatLng(34.135422, -89.23288), new LatLng(36.135422, -91.23288)),
    },
  },
  {
    id: 'default-neworleans',
    predictionPlace: {
      address: 'New Orleans, LA',
      bounds: new LatLngBounds(new LatLng(28.951065, -90.071533), new LatLng(29.951065, -91.0715332)),
    },
  },
  {
    id: 'default-chicago',
    predictionPlace: {
      address: 'Chicago, IL',
      bounds: new LatLngBounds(new LatLng(41.974163, -86.907321), new LatLng(42.974163, -87.907321)),
    },
  },
  {
    id: 'default-atlanta',
    predictionPlace: {
      address: 'Atlanta, GA',
      bounds: new LatLngBounds(new LatLng(33.620279, -83.433097), new LatLng(34.620279, -84.433097)),
    },
  },
];
