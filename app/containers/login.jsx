import React, { Component } from "react";
import { Link, hashHistory, Router } from "react-router";
import { connect } from 'react-redux';
import { Modal } from 'antd-mobile';
import Container from "./container.jsx";
import { AJAX_POST, PORT_URL } from "../ajax";
import { validate } from "../validate";

const alert = Modal.alert;
const containerProps = {
	title: "登录",
	isHeader: true
}

class Login extends Component {
	constructor(props, context) {
		super(props);
		this.state = {
			phoneVal: "13600662968",
			passwordVal: ""
		}
	}
	handleChangePhone = (e) => {
		this.setState({
			phoneVal: e.target.value
		});
	}
	handleChangePwd = (e) => {
		this.setState({
			passwordVal: e.target.value
		})
	}
	handleTapLogin = () => {
		const { phoneVal, passwordVal } = this.state;

		const result = validate([{
			"name": phoneVal,
			"method": [{
				"type": "require",
				"text": "请输入手机号"
			}]
		}, {
			"name": passwordVal,
			"method": [{
				"type": "require",
				"text": "请输入密码"
			}]
		}])

		if(!result) return;

		AJAX_POST({
			url: PORT_URL + "login",
			data: {
				"username": this.state.phoneVal,
				"password": this.state.passwordVal
			},
			success: (data) => {
				window.localStorage.setItem('nanny_token', data.accessToken);
				window.localStorage.setItem('nanny_uid', data.uid);
				window.localStorage.setItem('nanny_expires', data.expires);
				this.context.router.replace("/home");
			},
			fail: err => {
				alert(err.detail[0].message)
			}
		})

	}
	render() {
		return(
			<Container {...containerProps}>
				<div className="plr30">
					<div className="form-group">
						<input 
							type="text"
							value = {this.state.phoneVal} 
							className="form-text text-underline btn-b" 
							placeholder="输入手机号码" 
							onChange={this.handleChangePhone}
						/>
					</div>
					<div className="form-group">
						<input
							value = {this.state.passwordVal}
							type="password" 
							className="form-text text-underline btn-b" 
							placeholder="输入密码"
							onChange={this.handleChangePwd}
						/>
					</div>
					<div className="form-group mt50">
						<button className="default-btn radius-shadow-btn" onTouchTap={this.handleTapLogin}>登录</button>
					</div>
					<div className="mt50">
						<Link to="/forget" className="c000">忘记密码</Link>
					</div>
					<div className="wechat-bottom">
						<i className="fa fa-wechat"></i>微信登录
					</div>
				</div>
			</Container>
		)
	}
};

Login.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default connect()(Login)