const addToLibraryReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_TO_LIBRARY_SUCCESS':
        console.log('added')
        return {
            state
        }    
        case 'ADD_TO_LIBRARY_ERROR':
        console.log('error', action.err)
        return{
            state
        } 
    }
}