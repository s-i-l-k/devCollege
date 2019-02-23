import fetch from 'node-fetch';

const prefix = '[CARDS]';

export const cardsActionsTypes = {
    SEARCH_REQUEST: `${prefix} Search Request`,
    SEARCH_SUCCESS: `${prefix} Search Success`,
    SEARCH_ERRORS: `${prefix} Search Error`,
    RANDOM_CARD_REQUEST: `${prefix} Random Card Request`,
    RANDOM_CARD_SUCCESS: `${prefix} Random Card Success`,
    RANDOM_CARD_ERRORS: `${prefix} Random Card Errors`,
};

export const searchRequest = () => ({
    type: cardsActionsTypes.SEARCH_REQUEST,
});

export const searchSuccess = payload => ({
    type: cardsActionsTypes.SEARCH_SUCCESS,
    payload,
});

export const searchError = errors => ({
    type: cardsActionsTypes.SEARCH_ERRORS,
    errors,
});

export const fetchCards = (selectedFormat, searchPhrase) => {
    return async (dispatch) => {
        dispatch(searchRequest());
        const response = await fetch(`https://api.scryfall.com/cards/search?q=f:${selectedFormat}+${searchPhrase}`);
        const json = await response.json();
        return dispatch(searchSuccess(json.data || []));
    }
}

export const randomCardRequest = () => ({
    type: cardsActionsTypes.RANDOM_CARD_REQUEST,
});

export const randomCardSuccess = payload => ({
    type: cardsActionsTypes.RANDOM_CARD_SUCCESS,
    payload,
});

export const randomCardError = errors => ({
    type: cardsActionsTypes.RANDOM_CARD_ERRORS,
    errors,
});

export const fetchRandomCards = () => {
    return async (dispatch) => {
        dispatch(randomCardRequest());
        const response = await fetch(`https://api.scryfall.com/cards/random`);
        const json = await response.json();
        if(response.status === 200) {
            return dispatch(randomCardSuccess(json.data));
        } else {
            return dispatch(randomCardError(['Random card not found']));
        }
    }
}