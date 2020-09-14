import thunk from 'redux-thunk'
import { createStore,  applyMiddleware, compose} from 'redux'
import rootReducer from '../shared/Reducer/rootReducer';


// const store = createStore(
//   (state ={}) => state,
//   applyMiddleware(thunk)
//   );
  
export default function configureStore() {
  const store = createStore(
      rootReducer,
      compose(
      applyMiddleware(thunk),
      (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) ? window.devToolsExtension() : f => f
    )
  );
  return store;
}