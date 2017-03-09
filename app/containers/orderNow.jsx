import React, { Component } from "react";
import { hashHistory } from "react-router";
import { Modal, Toast } from "antd-mobile";
import Container from "./container.jsx";
import { AJAX_POST, AJAX_GET, PORT_URL } from "../ajax.js";
import moment from "moment";
import { validate } from "../validate";

const alert = Modal.alert;
const containerProps = {
	title: "立即抢单",
	isHeader: true,
	grayBj: true,
}

export default class OrderNow extends Component {
	constructor(props, context) {
		super(props)
		this.state = {
			info: {},
			price: '',
			remarks: ''
		}
	}
	componentDidMount() {
		AJAX_GET({
			url: PORT_URL + "needs/" + this.props.params.id,
			success: (data) => {
				//				console.log(data)
				this.setState({
					info: data
				})
			}
		})
	}
	handleSubmit = () => {
		const { price, remarks } = this.state;
		const result = validate([{
			"name": price,
			"method": [{
				"type": "require",
				"text": "请输入整单报价"
			}]
		}])
		if(!result) return;
		alert('确认抢单', "抢单前请确认你填写的信息", [{
			"text": "取消"
		}, {
			"text": "抢单",
			onPress: () => {
				AJAX_POST({
					url: PORT_URL + 'needs/' + this.props.params.id + '/match',
					data: {
						money: parseInt(price * 100),
						memo: remarks
					},
					success: data => {
						console.log(data)
						this.context.router.replace('/orderResult/'+data.count);
					},
					fail: err => {
						console.log(err)
						alert(err.detail[0].message)
					}
				});
			}
		}]);

	}
	handleChange = (e) => {
		this.setState({
			price: e.target.value
		})
	}
	handleChangeText = (e) => {
		this.setState({
			remarks: e.target.value
		})
	}
	render() {
		const { info } = this.state
		const startDate = moment.unix(info.dateStart).format("YYYY.MM.DD");
		const endDate = moment.unix(info.dateEnd).format("YYYY.MM.DD");
		const day = (info.dateEnd - info.dateStart) / 60 / 60 / 24 + 1;
		return(
			<Container {...containerProps}>
				<div className="pt30">
					<div className="order-list mb35">
						<ul>
							<li>
								<label>用户昵称:{info.womanName}</label>
							</li>
							<li>
								<label>服务档期:{startDate}-{endDate}(共{day}天)</label>
							</li>
							<li>
								<label>价格预算:{info.moneyStart/100+'-'+info.moneyEnd/100}(元)</label>
							</li>
						</ul>
					</div>
					<div className="form-group plr40 mb30">
						<input 
							type="tel"
							placeholder="输入您的整单报价(单位/元)" 
							className="form-text" 
							ref="order_price"
							onChange={this.handleChange}
							value={this.state.price}
						/>
					</div>
					<div className="form-group plr40">
						<input 
							type="text"
							placeholder="填写备注信息" 
							className="form-text" 
							ref="order_remarks"
							value={this.state.remarks}
							onChange={this.handleChangeText}
						/>
					</div>
					<div className="plr40 order-tips mt20">
						<p className="price mb30">日单价:{(this.state.price/day).toFixed(2)}元</p>
						<p className="remark color-prompt">注：抢单钱保证可用押金大于订单总额的10%</p>
					</div>
				</div>
				<div className="fixed-bottom">
					<button className="default-btn" onTouchTap={this.handleSubmit}>确认</button>
				</div>
			</Container>
		)
	}
}
OrderNow.contextTypes = {
	router: React.PropTypes.object.isRequired
}