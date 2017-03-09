import React, { Component } from "react";
import { Link } from "react-router";
import Container from "./container.jsx";

const containerProps = {
	title: "抢单成功",
	isHeader: true
}
let timer = null
export default class OrderResult extends Component {
	constructor(props, context) {
		super(props);
		this.state = {
			num: 15
		}
	}
	componentDidMount() {
		clearInterval(timer)
		timer = setInterval(() => {
			if(this.state.num <= 0) {
				clearInterval(timer)
				this.context.router.replace('/demand');
				return false
			}
			this.setState({
				num: this.state.num - 1
			});
		}, 1000)
	}
	componentWillUnmount() {
		clearInterval(timer)
	}
	render() {
		return(
			<Container {...containerProps}>
				<div className="waitting-order">
					<h6>抢单成功,请耐心等待~</h6>
					<p>在您之前已有{this.props.params.id}位月嫂抢单</p>
					<p>前5位月嫂会有更多展示机会哟</p>
					<p className="mt40"><span className="color-red">{this.state.num}</span>秒后跳转至订单中心</p>
					<p>
						<Link to="/order" style={{color:"#77d9d4"}}>立即跳转</Link>
					</p>
				</div>
			</Container>
		)
	}
}
OrderResult.contextTypes = {
	router: React.PropTypes.object.isRequired
}