// ================ Action types ================ //

export const LOCATION_CHANGED = 'app/Routing/LOCATION_CHANGED';

// ================ Reducer ================ //

const initialState = {
  currentLocation: null,
  currentCanonicalUrl: null,
};

export default function routingReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case LOCATION_CHANGED:
      return {
        ...state,
        currentLocation: payload.location,
        currentCanonicalUrl: payload.canonicalUrl,
      };

    default:
      return state;
  }
}

// ================ Action creators ================ //

export const locationChanged = (location, canonicalUrl) => ({
  type: LOCATION_CHANGED,
  payload: { location, canonicalUrl },
});
