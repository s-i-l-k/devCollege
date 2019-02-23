import {cardsActionsTypes} from '../actions/cardActions';

const initialState = {
    results: [],
    details: [],
    errors: [],
    isFetching: false,
    randomCardResults: [],
    randomCardDetails: [],
    randomCardErrors: [],
    isRandomCardFetching: false,
};

function cards(state = initialState, action) {
    switch (action.type) {
        case cardsActionsTypes.SEARCH_REQUEST: {
            return {
                ...state,
                isFetching: true,
            };
        }
        case cardsActionsTypes.SEARCH_SUCCESS: {
            return {
                ...state,
                results: action.payload,
                isFetching: false,
            }
        }
        case cardsActionsTypes.RANDOM_CARD_REQUEST: {
            return {
                ...state,
                isRandomCardFetching: true,
            };
        }
        case cardsActionsTypes.RANDOM_CARD_SUCCESS: {
            return {
                ...state,
                randomCardResults: action.payload,
                isRandomCardFetching: false,
            }
        }
        case cardsActionsTypes.RANDOM_CARD_ERROR: {
            return {
                ...state,
                randomCardErrors: action.payload,
                isRandomCardFetching: false,
            }
        }
        default:
        return state;
    }
}
export default cards;