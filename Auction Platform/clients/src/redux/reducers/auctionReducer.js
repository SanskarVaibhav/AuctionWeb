const initialState = {
    auctions: [],
    loading: false,
    error: null,
};

const auctionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_AUCTIONS_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'FETCH_AUCTIONS_SUCCESS':
            return {
                ...state,
                loading: false,
                auctions: action.payload,
            };
        case 'FETCH_AUCTIONS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'ADD_AUCTION':
            return {
                ...state,
                auctions: [...state.auctions, action.payload],
            };
        case 'REMOVE_AUCTION':
            return {
                ...state,
                auctions: state.auctions.filter(a => a.id !== action.payload),
            };
        default:
            return state;
    }
};

export default auctionReducer;