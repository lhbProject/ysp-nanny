import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { createStore } from "redux";
import { Provider } from 'react-redux';
import RouterComponent from './router/router.jsx';
import reducer from './redux/reducer';
import { GET_REGION } from './tool';
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();
//引入less
import './less/base.less';
import './less/member.less';

const store = createStore(reducer);
document.querySelector('body').addEventListener('touchmove', (e) => {
	e.preventDefault()
})

var _div = document.createElement('div');
_div.setAttribute('id', 'app-wrapper');
_div.className = "app-wrapper";
_div.style.height = document.documentElement.clientHeight + 'px';
GET_REGION();
render(
	<Provider store = {store}>
		{RouterComponent}
	</Provider>, document.body.appendChild(_div)
);