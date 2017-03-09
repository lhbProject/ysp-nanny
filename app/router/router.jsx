import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import Roots from "../containers/roots.jsx";
import Home from "../containers/home.jsx";
import Match from "../containers/match.jsx";
import Order from "../containers/order.jsx";
import OrderDetail from "../containers/orderDetail.jsx";
import MatchDetail from "../containers/matchDetail.jsx";
import OrderNow from "../containers/orderNow.jsx";
import OrderResult from "../containers/orderResult.jsx";
import Demand from "../containers/demand.jsx";
import OrderFail from "../containers/orderFail.jsx";
import Login from "../containers/login.jsx";
import Forget from "../containers/forget.jsx";
import Member from "../containers/member.jsx";
import EditInfo from "../containers/editInfo.jsx";
import Wallet from "../containers/wallet.jsx";
import Recharge from "../containers/recharge.jsx";
import Cash from "../containers/cash.jsx";
import CashSuccess from "../containers/cashSuccess.jsx";
import File from "../containers/file.jsx";
import Message from "../containers/message.jsx";
import MessageDetail from "../containers/messageDetail.jsx";
import { PORT_URL } from "../ajax.js";
import auth from "../auth.js";

const isLogin = (nextState, replace) => {
	if(!window.localStorage.getItem('nanny_token')) {
		replace({ pathname: '/login' })
	} else {
		var headers = new Headers({
				"Content-Type": "application/json",
				"Authorization": window.localStorage.getItem('nanny_token')
			}),
			req = new Request(PORT_URL + 'info', {
				headers: headers
			})

		fetch(req).then(function(res) {
			if(!res.ok) {
				if(res.status == 401 && res.statusText == "Unauthorized") {
					hashHistory.replace('/login');
					alert("请登录账号");
				}
			}
		})
	}
}

//路由管理
const routeConfig = [{
	path: '/',
	component: Roots,
	indexRoute: {
		component: Login
	},
	childRoutes: [{ //首页
			path: 'home',
			component: Home
		},
		{ //订单列表
			path: 'order',
			component: Order,
			onEnter: isLogin
		},
		{ //订单详情
			path: 'orderDetail/:id',
			component: OrderDetail,
			onEnter: isLogin
		},
		{ //匹配
			path: 'match',
			component: Match,
			onEnter: isLogin
		},
		{ //需求详情
			path: 'matchDetail/:id',
			component: MatchDetail,
			onEnter: isLogin
		},
		{ //立即抢单
			path: 'orderNow/:id',
			component: OrderNow,
			onEnter: isLogin
		},
		{ //抢单状态
			path: 'orderResult/:id',
			component: OrderResult,
			onEnter: isLogin
		},
		{ //正在抢单
			path: 'demand',
			component: Demand,
			onEnter: isLogin
		},
		{ //抢单失败
			path: 'orderFail',
			component: OrderFail,
			onEnter: isLogin
		},
		{ //用户登录
			path: 'login',
			component: Login
		},
		{
			path: 'forget',
			component: Forget
		},
		{
			path: 'member/:id',
			component: Member,
			onEnter: isLogin
		},
		{
			path: 'editInfo',
			component: EditInfo,
			onEnter: isLogin
		},
		{
			path: 'wallet',
			component: Wallet,
			onEnter: isLogin
		},
		{
			path: 'recharge',
			component: Recharge,
			onEnter: isLogin
		},
		{
			path: 'cash',
			component: Cash,
			onEnter: isLogin
		},
		{
			path: 'cashSuccess',
			component: CashSuccess,
			onEnter: isLogin
		},
		{
			path: 'file',
			component: File,
			onEnter: isLogin
		},
		{
			path: 'message',
			component: Message,
			onEnter: isLogin
		},
		{
			path: 'messageDetail/:id',
			component: MessageDetail,
			onEnter: isLogin
		}
	]
}];

const RouterComponent = <Router routes={routeConfig} history={hashHistory } />;

export default RouterComponent;