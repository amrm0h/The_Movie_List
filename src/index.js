import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "./shared/redux/Store/storeConfiguration";

import AppRouters from "./components/AppRouters";

import 'bootstrap/dist/css/bootstrap.min.css';
import "normalize.css";
import './shared/css/App.scss';


const JSX = () => (
    <Provider store={store}>
        <div className="container">
            <AppRouters />
        </div>
    </Provider>
);

ReactDOM.render(<JSX />, document.getElementById('root'));