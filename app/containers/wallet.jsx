import React,{Component} from "react";
import {Link} from "react-router";
import Container from "./container.jsx";
import {AJAX_GET, PORT_URL} from "../ajax.js";

const containerProps = {
	title : "我的钱包",
	isHeader : true,
	grayBj : true
}

export default class Wallet extends Component {
	constructor(props){
		super(props)
		this.state = {
			_data: {}
		}
	}
	componentDidMount (){
		AJAX_GET({
			url: PORT_URL+'info',
			success:(data)=>{
				console.log(data)
				this.setState({
					_data: data
				})
			}
		})
	}
	render(){
		return (
			<Container {...containerProps}>
				<div className="pt20">
					<div className="wallet-amount">
						<div className="wallet-available wallet-over">
							<div className="num">{this.state._data.balance}</div>
							<div className="text">可用余额</div>
						</div>
						<div className="wallet-freeze wallet-over">
							<div className="num">{this.state._data.freeze}</div>
							<div className="text">冻结余额</div>
						</div>
					</div>
					<div className="wallet-btn pt20">
						<Link to="/recharge">充值</Link>
						<Link to="/cash">提现</Link>
					</div>
				</div>
				<div className="fixed-bottom">
					<Link to="/tx-account" className="default-btn">查看提现账号</Link>
				</div>
			</Container>
		)
	}
}
