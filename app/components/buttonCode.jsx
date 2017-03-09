import React, { Component } from "react";
import { Modal, } from 'antd-mobile';
import { AJAX_POST, PORT } from '../ajax.js';
import { validate } from '../validate.js';

const alert = Modal.alert
let timer = null;
class ButtonCode extends Component {
	constructor(props) {
		super(props)
		this.state = {
			text: '发送验证码',
			disabeldVal: false
		}
	}
	componentWillUnmount (){
		clearInterval(timer);
	}
	handleCode = (mobile, e) => {
		let _button = e.target;
		let _mobile = mobile.trim();

		let result = validate([{
			"name": mobile,
			"method": [{
				type: "require",
				text: "请输入手机号",
			}, {
				type: "checkPhone"
			}]
		}]);
		if(!result) return;
		clearInterval(timer);
		if(!this.state.disabeldVal) {
			AJAX_POST({
				url: PORT + 'sms',
				data: {
					"mobile": mobile
				}
			}).done(data => {
				let t = 60;
				this.setState({
					disabeldVal: true,
					text: '重新获取(' + t + '秒)'
				})
				_button.classList.add('disabled');
				timer = setInterval(() => {
					if(t <= 0) {
						this.setState({
							text: '发送验证码',
							disabeldVal: false
						})
						_button.classList.remove('disabled');
						clearInterval(timer);
						return false
					}
					t--;
					this.setState({
						text: '重新获取(' + t + '秒)'
					})
				}, 1000)
			}).fail(err => {
				console.log(err)
				alert('发送失败', "请勿频繁发送，请稍后再试")
			})
		}
	}
	render() {
		const { mobile } = this.props;
		let { disabeldVal, text } = this.state;
		return(
			<button
				className="code-style"
				type = "button"
				disabled = {disabeldVal}
				onTouchTap = {(e) => this.handleCode(mobile,e)}
			>
				{text}
			</button>
		)
	}
}

export default ButtonCode