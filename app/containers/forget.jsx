import React, { Component } from "react";
import { Link } from "react-router";
import { Modal } from "antd-mobile";
import Container from "./container.jsx";
import { AJAX_POST, AJAX_PUT, PORT_URL, COMMON_URL } from "../ajax.js";
import { validate } from "../validate";
import ButtonCode from "../components/buttonCode.jsx";

const alert = Modal.alert;
const containerProps = {
	title: "忘记密码",
	isHeader: true
}
export default class Forget extends Component {
	constructor(props) {
		super(props)
		this.state = {
			phone: "",
			code: "",
			pwd: ""
		}
	}
	handleChange = () => {
		this.setState({
			phone: this.refs.phone.value,
			code: this.refs.code.value,
			pwd: this.refs.pwd.value,
		})
	}
	handleForgetPwd = () => {
		const { phone, code, pwd } = this.state;

		const result = validate([{
			"name": phone,
			"method": [{
				"type": "require",
				"text": "请输入手机号"
			}, {
				"type": "checkPhone"
			}]
		}, {
			"name": code,
			"method": [{
				"type": "require",
				"text": "请输入验证码"
			}]
		}, {
			"name": pwd,
			"method": [{
				"type": "require",
				"text": "请输入密码"
			}]
		}])

		if(!result) return;

		AJAX_PUT({
			url: PORT_URL + "getbackpassword",
			data: {
				mobile: phone,
				valid: code,
				password: pwd
			},
			success: (data) => {
				console.log(data)
			},
			fail: (err) => {
				//				console.log(err)
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
							type="tel"
							className="form-text text-underline btn-b" 
							placeholder="输入手机号码"
							onChange={this.handleChange}
							value={this.state.phone}
							ref="phone"
						/>
					</div>
					<div className="form-group form-yzm">
						<input 
							type="tel" 
							className="form-text text-underline btn-b" 
							placeholder="输入验证码"
							value={this.state.code}
							ref="code"
							onChange={this.handleChange}
						/>
						<ButtonCode
							mobile={this.state.phone} 
						/>
					</div>
					<div className="form-group">
						<input 
							type="password"
							className="form-text text-underline btn-b" 
							placeholder="输入密码"
							onChange={this.handleChange}
							value={this.state.pwd}
							ref="pwd"
						/>
					</div>
					<div className="form-group mt50">
						<button className="default-btn radius-shadow-btn" onTouchEnd={this.handleForgetPwd}>确认</button>
					</div>
					<div className="wechat-bottom">
						<i className="fa fa-wechat"></i>微信登录
					</div>
				</div>
			</Container>
		)
	}
}