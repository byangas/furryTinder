import  { actionTypes } from "../actions/actionTypes";

export const initialState = { 
    furries: [],
    filtered:[],
    saved:[],
    current: null,
    index:null,
    settings: {
        profile: "",
        typePreference: "cat",
        ageRange: {
            min: 0,
            max: 100
        }
    }
}

export const FurryReducer =  (state = initialState, action) => {

    const { type, payload } = action;
    switch(type) {
        case actionTypes.UPDATE_SETTINGS: {
            return Object.assign({}, state,{ settings: payload ,index:null });
        }
        case actionTypes.UPDATE_FURRY_LIST: {
            return Object.assign({}, state,{ furries: payload });
        }
        case actionTypes.UPDATE_CURRENT: {
            return Object.assign({}, state,{ current: payload });
        }
        case actionTypes.MOVE_NEXT: {
            let index = state.index;
            //starting over?
            if(index === null)
                index = 0
            else 
                index+=1;
            
            if(index >= state.filtered.length){
               index = 0;
            }
            const current = state.filtered[index];
            return Object.assign({}, state, { current, index });
        } 
        case actionTypes.APPLY_FILTER: {
            const { furries, settings } = state;

            let filtered = furries.filter((furry) => {
                return furry.type === settings.typePreference && furry.age >= settings.ageRange.min && furry.age <= settings.ageRange.max
            })
            return Object.assign({}, state,{ filtered, index:null });
        }
        case actionTypes.UPDATE_SAVED_LIST: {
            const { furries } = state;
            const saved = furries.filter((furry) =>  furry.save)
            return Object.assign({}, state,{ saved });
        }
        default:
            return state;
    }
}
