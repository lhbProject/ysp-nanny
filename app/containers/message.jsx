import React, { Component } from 'react';
import Container from "./container.jsx";
import MessageItem from "../components/messageItem.jsx"
import { AJAX_GET, PORT_URL } from "../ajax";

let containerProps = {
	title: "我的消息",
	isHeader: true
}
export default class Message extends Component {
	constructor(props) {
		super(props)
		this.state = {
			messageData: []
		}
	}
	componentDidMount() {
		AJAX_GET({
			url: PORT_URL + "messages",
			success: data => {
				console.log(data)
				if(data.count) {
					this.setState({
						messageData: data.messages
					})
				}
			}
		})
	}
	render() {
		const { messageData } = this.state;
		return(
			<Container {...containerProps}>
				<div className="message-wrap plr30">
					{
						messageData.map((value,index)=>{
							return (
								<MessageItem 
									value={value} 
									key= {index}
								/>
							)
						})
					}
				</div>
			</Container>
		)
	}
}