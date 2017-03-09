import React, { Component } from 'react';
import { Link } from 'react-router';
import { Modal } from "antd-mobile";
import moment from "moment";
import Container from "./container.jsx";
import { AJAX_GET, AJAX_DELETE, PORT_URL } from "../ajax.js";

const alert = Modal.alert;
const containerProps = {
	title: "订单详情",
	isHeader: true,
	grayBj: true,
}
class OrderDetail extends Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: false,
			details: {}
		}
	}
	componentDidMount() {
		AJAX_GET({
			url: PORT_URL + 'orders/' + this.props.params.id,
			success: data => {
				console.log(data)
				this.setState({
					details: data[0]
				})
			}
		})
	}
	handleContract = (e) => { //查看电子合同
		e.preventDefault
		this.setState({
			visible: true
		})
	}
	cancelOrder = () => {
		alert("取消订单", "确认取消该订单？", [{
			"text": "否"
		}, {
			"text": "是",
			onPress: () => {
				AJAX_DELETE({
					url: PORT_URL + 'orders/' + this.props.params.id,
					success: data => {
						console.log(data)
					}
				})
			}
		}])
	}
	onClose = () => {
		this.setState({
			visible: false
		})
	}
	render() {
		const {
			visible,
			details
		} = this.state;
		const {
			id,
			no,
			avatar,
			name,
			dealerMoney,
			account,
			motherMobile,
			start,
			end,
			contract
		} = details;
		const startDate = moment.unix(start).format("YYYY年MM月DD日")
		const endDate = moment.unix(end).format("YYYY年MM月DD日")
		return(
			<Container {...containerProps}>
				<div className="order-detail">
					<div className="order-detail-content">
						<div className="od-num">
							订单号:{no}
						</div>
						<div className="od-info">
							<div className="plr30">
								<div className="od-img">
									<img src={avatar} alt={name} />
								</div>
								<div className="od-name tc">
									{name}
								</div>
								<div className="od-price mb20">
									服务报价:{dealerMoney/100}元
								</div>
								<div className="od-cash mb20">
									签约押金:{account/100}元
								</div>
								<div className="od-tel mb20">
									联系方式:{motherMobile}
								</div>
								<div className="od-deadline">
									服务期限:{startDate}-{endDate}
								</div>
								<div className="od-btn-box">
									<Link to={"/matchDetail/"+id} className="od-btn">需求详情</Link>
									<button className="od-btn" onTouchTap={this.handleContract}>电子合同</button>
								</div>
								<div className="od-process">
									<ul>
										<li>
											<i></i>
											<p>用户下单</p>
										</li>
										<li>
											<i></i>
											<p>选择月嫂</p>
										</li>
										<li>
											<i></i>
											<p>双方支付押金</p>
										</li>
										<li>
											<i></i>
											<p>订单成立 等候服务</p>
										</li>
										<li>
											<i></i>
											<p>服务中</p>
										</li>
										<li>
											<i></i>
											<p>服务结束</p>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="fixed-bottom">
					<button className="default-btn" onTouchTap={this.cancelOrder}>取消订单</button>
				</div>
				<Modal
					title = "电子合同"
					onClose = {this.onClose}
					maskClosable = {true}
					visible = {visible}
				>
					<div dangerouslySetInnerHTML={{__html:contract}}>
					</div>
				</Modal>
			</Container>
		)
	}
}
export default OrderDetail