import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware} from 'redux';
import { Provider, useSelector } from 'react-redux';
import thunk from 'redux-thunk'
import { createFirestoreInstance} from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase, isLoaded  } from 'react-redux-firebase';
import firebase from './config/fbConfig';
import rootReducer from './store/reducers/rootReducer'

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

// function saveToLocalStorage(store) {
//   try {
//       const serializedStore = JSON.stringify(store);
//       window.localStorage.setItem('store', serializedStore);
//   } catch(e) {
//       console.log(e);
//   }
// }

// function loadFromLocalStorage() {
//   try {
//       const serializedStore = window.localStorage.getItem('store');
//       if(serializedStore === null) return undefined;
//       return JSON.parse(serializedStore);
//   } catch(e) {
//       console.log(e);
//       return undefined;
//   }
// }

// const persistedState = loadFromLocalStorage();


const store = createStore(rootReducer , applyMiddleware(thunk.withExtraArgument({ getFirebase })) );

//store.subscribe(() => saveToLocalStorage(store.getState()));

  const rrfProps = {
    firebase,
    config: {},
    dispatch: store.dispatch,
    createFirestoreInstance
  };

  function AuthIsLoaded({ children }) {
    const auth = useSelector(state => state.firebase.auth);
    if (!isLoaded(auth)) return <div>Loading screen...</div>;
    return children;
  }

    ReactDOM.render(
        <Provider store = {store}>  
          <ReactReduxFirebaseProvider {...rrfProps}>
            <BrowserRouter>
              <AuthIsLoaded>
                  <App />
              </AuthIsLoaded>
            </BrowserRouter>
            </ReactReduxFirebaseProvider>
        </Provider>, document.getElementById('root'));

reportWebVitals();
