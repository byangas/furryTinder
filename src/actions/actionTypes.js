
/****************
 * List of actions that are supported for Furry app
 */
export const actionTypes =  {
     APPLY_FILTER: 'FILTER_FURRY',
     UPDATE_CURRENT: 'UPDATE_CURRENT',
     UPDATE_SAVED_LIST: 'UPDATE_SAVED_LIST',
     NEXT_FURRY: 'NEXT_FURRY',
     UPDATE_SETTINGS: 'UPDATE_SETTINGS',
     UPDATE_FURRY_LIST: 'UPDATE_FURRY_LIST',
     MOVE_NEXT: 'MOVE_NEXT',
}

export const furryActionCreator = {

    updateFurryList: (list) => { return { type: actionTypes.UPDATE_FURRY_LIST,  payload: list }},

    updateSettings: (settings) => { return { type: actionTypes.UPDATE_SETTINGS,  payload: settings }},

    updateFurry: (furry) => { return {type: actionTypes.UPDATE_FURRY, payload: furry }},

    nextFurry: (currentIndex) => { return { type: actionTypes.NEXT_FURRY, payload: currentIndex }},

    updateCurrent: (current) =>  { return { type: actionTypes.UPDATE_CURRENT, payload: current }},

    updateSaved:() => { return { type: actionTypes.UPDATE_SAVED_LIST }},

    applyFilter:() => { return { type: actionTypes.APPLY_FILTER }},

    moveNext:() => { return { type: actionTypes.MOVE_NEXT }}
}

