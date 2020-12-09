import { CAMPSITES } from '../shared/campsites';
import * as ActionTypes from './ActionTypes';

export const addComment = (campsiteId, rating, author, text) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        campsiteId: campsiteId,
        rating: rating,
        author: author,
        text: text
    }
});


export const fetchCampsites = () => dispatch => {
    dispatch(campsiteLoading());

    setTimeout(() => {
        dispatch(addCampsite(CAMPSITES));
    }, 2000);
};


export const campsiteLoading = () => ({
    type: ActionTypes.CAMPSITE_LOADING,
});

export const campsiteFailed = errMess => ({
    type: ActionTypes.CAMPSITE_FAILED,
    payload: errMess
});

export const addCampsite = campsites => ({
    type: ActionTypes.ADD_CAMPSITE,
    payload: campsites
});

