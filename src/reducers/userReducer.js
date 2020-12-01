
const intialState = {
    email: ''
}


export default (state = intialState, action) => {

    if(action.type === 'SET_EMAIL') {
        return {...state, email:action.payload.email};
    }

    return state;
}