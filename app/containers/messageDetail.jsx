import React, { Component } from 'react';
import Container from "./container.jsx";
import { AJAX_GET, PORT_URL } from "../ajax.js";

let containerProps = {
	title: "消息详情",
	isHeader: true
}

export default class MessageDetail extends Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		AJAX_GET({
			url: PORT_URL + 'messages/' + this.props.params.id,
			success: data => {
				console.log(data)
			}
		})
	}
	render() {
		return(
			<Container {...containerProps}>
				<div className="message-wrap plr30">
					<div className="m-detail pt35">
						<h1 className="tc">消息详情</h1>
						<h6 className="tc">2016-5-5 12:43</h6>
						<div className="m-content">
							亲爱滴，有一位新的月嫂抢单啦~可点击我的订单-我的需求进行查看
						</div>
					</div>
				</div>
			</Container>
		)
	}
}