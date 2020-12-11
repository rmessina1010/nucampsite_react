import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';



export const fetchCampsites = () => dispatch => {
    dispatch(campsiteLoading());

    return fetch(baseUrl + 'campsites')
        .then(response => response.json())
        .then(campsites => dispatch(addCampsite(campsites)))
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

export const addComment = (campsiteId, rating, author, text) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        campsiteId: campsiteId,
        rating: rating,
        author: author,
        text: text
    }
});

export const fetchComments = () => dispatch => {
    return fetch(baseUrl + 'comments')
        .then(response => response.json())
        .then(campsites => dispatch(addComment(campsites)))
};

export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});


export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromotions = () => dispatch => {
    dispatch(promotionsLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => response.json())
        .then(promotions => dispatch(addPromotions(promotions)))
};

export const promotionsLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING
});

export const promotionsFailed = errMess => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errMess
});

export const addPromotions = promotions => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions
});
