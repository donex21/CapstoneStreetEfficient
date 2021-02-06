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

const store = createStore(rootReducer, applyMiddleware(thunk.withExtraArgument({ getFirebase })) );

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
