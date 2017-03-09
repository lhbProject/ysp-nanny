import React, { Component } from 'react';
import { Modal } from "antd-mobile";
import Container from "../containers/container.jsx";
import DemandItem from "../components/demandItem.jsx";
import { AJAX_GET, PORT_URL, AJAX_DELETE } from "../ajax";

const alert = Modal.alert;
const containerProps = {
	title: "我的需求",
	isHeader: true,
	isFooter: true,
	grayBj: true,
	subNav: true
}

export default class Demand extends Component {
	constructor(props) {
		super(props)
		this.state = {
			demandData: []
		}
	}
	componentDidMount() {
		this.getDemandData()
	}
	getDemandData() {
		AJAX_GET({
			url: PORT_URL + "needs/joined?size=10",
			success: data => {
				console.log(data)
				if(data.count) {
					this.setState({
						demandData: data.needs
					})
				}
			}
		});
	}
	handleCancel = (id) => {
		alert('取消抢单', "您确认要取消？", [{
			"text": "否",
		}, {
			"text": "是",
			onPress: () => {
				AJAX_DELETE({
					url: PORT_URL + 'match/' + id,
					success: data => {
						alert("取消成功", "如需抢单可至抢单页面", [{
							"text": "确认",
							onPress: () => {
								this.getDemandData()
							}
						}])
					}
				})
			}
		}]);
	}
	render() {
		const demandData = this.state.demandData;
		return(
			<Container {...containerProps}>
				<div className="order-wrapper">
					{
						demandData.map((item,index)=>{
							return (
								<DemandItem 
									value = {item} 
									key={index}
									handleCancel = {this.handleCancel}
								/>
							)
						})
					}
				</div>
			</Container>
		)
	}
}