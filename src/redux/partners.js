import * as ActionTypes from './ActionTypes'


export const Partners = (state = { isLoading: true, errMess: null, partners: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PARTNER:
            return { ...state, isLoading: false, errMess: null, partners: action.payload };;
        case ActionTypes.PARTNER_LOADING:
            return { ...state, isLoading: true, errMess: action.payload };;
        case ActionTypes.PARTNER_FAILED:
            const partners = action.payload;
            return { ...state, isLoading: false, partners: state.partners.concat(partners) };
        default:
            return state;
    }
}