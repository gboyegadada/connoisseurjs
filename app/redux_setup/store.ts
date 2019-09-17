import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './reducer'

export default function makeStore() {
    const store = createStore(rootReducer, applyMiddleware(thunk))
    
    return store
}