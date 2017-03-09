 import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Container from "./container.jsx";
import OrderItem from "../components/orderItem.jsx";
import {AJAX_GET,PORT_URL} from "../ajax.js";

const containerProps = {
	title : "订单列表",
	isFooter : true,
	grayBj : true,
	height: true
}

class Order extends Component {
	constructor (props){
		super(props);
		this.state = {
			orderList: []
		}
	}
	componentDidMount (){
		AJAX_GET({
			url: PORT_URL+'orders',
			success: data => {
				console.log(data)
				if(data.count > 0){
					this.setState({
						orderList: data.orders
					})
				}
				
			}
		})
	}
	render(){
		return (
			<Container {...containerProps}>
				<div className="order-wrapper">
					<OrderItem orderList={this.state.orderList} />
				</div>
			</Container>
		)
	}
}

export default Order
