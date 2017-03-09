import React,{Component} from "react";
import { hashHistory } from "react-router";
import Container from "../containers/container.jsx";


const containerProps = {
	title : "提现成功",
	isHeader : true
}
export default class cashSuccess extends Component {
	constructor(props){
		super(props)
		this.state = {
			time: 5
		}
	}
	componentDidMount(){
		var time = this.state.time;
		setInterval(()=>{
			if(this.state.time>0){
				this.setState({
					time: --time
				})
			}
			else{
				hashHistory.replace('/member')
			}
		},1000)
	}
	render(){
		return (
			<Container {...containerProps}>
				<div className="waitting-order">
					<p>已收到您的提现申请</p>
					<p>月嫂派会在3个工作日内处理!</p>
					<p className="mt40"><span className="color-red">{this.state.time}</span>秒后返回个人中心</p>
				</div>
			</Container>
		)
	}
}
