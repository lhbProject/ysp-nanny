import React, { Component } from "react";
import { Link } from "react-router"
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx"

//获取一个对象的translate3d的值，返回值为一个数组[x,y,z]
const translate3D = (obj) => obj.style.transform.match(/translate3d\((.+)\)/)[1].split(',')

export default class Container extends Component {
	constructor(props) {
		super(props)
		this.isMove = true;
		this.startY = 0; //手指按下的初始坐标
		this.disY = 0; //手指移动的距离
		this.currentY = 0; // 当前translateY的值
		this.lastTime = 0; //当前按下的时间
		this.moveDisY = 0; //手指移动时之间的差值
	}
	componentDidMount() {
		let wrap_height = this.refs.scroll_wrap.offsetHeight;
		let box_height = this.refs.scroll_box.offsetHeight;
		wrap_height >= box_height ? this.isMove = false : this.isMove = true;
		this.refs.scroll_box.style.minHeight = wrap_height + 'px';
		this.refs.scroll_box.style.transform = "translate3d(0px,0px,1px)";
	}
	componentDidUpdate() {
		let wrap_height = this.refs.scroll_wrap.offsetHeight;
		let box_height = this.refs.scroll_box.offsetHeight;
		wrap_height >= box_height ? this.isMove = false : this.isMove = true;
		
	}
	handleTouchStart = (e) => { //手指按下事件
		this.refs.scroll_box.style.transition = "0s";
		this.startY = e.changedTouches[0].pageY;
		this.currentY = parseInt(translate3D(this.refs.scroll_box)[1]);
		this.lastTime = new Date().getTime(); //手指按下的时间
		this.lastY = this.disTime = 0; //上次Y坐标值和时初始值
	}
	handleTouchMove = (e) => { //手指滑动事件
		e.preventDefault();
		if(!this.isMove) return;
		this.disY = e.changedTouches[0].pageY - this.startY;
		let nowTime = new Date().getTime();
		let translateY = this.disY + this.currentY; //
		this.refs.scroll_box.style.transform = "translate3D(0px," + translateY + "px,1px)";

		this.moveDisY = e.changedTouches[0].pageY - this.lastY;
		this.lastY = e.changedTouches[0].pageY;
		this.disTime = nowTime - this.lastTime;
		this.lastTime = nowTime;
	}
	handleTouchEnd = (e) => { //手指抬起事件
		if(!this.isMove) return;
		let endY = parseInt(translate3D(this.refs.scroll_box)[1]);
		let endTime = new Date().getTime();
		let speed = (endTime - this.lastTime) > 300 ? 0 : Math.round(this.moveDisY / this.disTime * 10);
		speed = this.disTime <= 0 ? 0 : speed;
		//		console.log(speed)
		let buffY = speed * 20 + endY;
		let maxY = this.refs.scroll_wrap.clientHeight - this.refs.scroll_box.clientHeight;

		if(buffY >= 0) {
			buffY = 0
		} else if(buffY <= maxY) {
			buffY = maxY
		}
		//		console.log(buffY)
		this.refs.scroll_box.style.transition = "0.5s ease-out";
		this.refs.scroll_box.style.transform = "translate3D(0px," + buffY + "px,1px)";

		//		console.log(endY)
	}
	render() {
		let classVal = this.props.grayBj ? "gray-bg" : "",
			header = null,
			footer = null;
		if(this.props.isHeader) { header = <Header title = {this.props.title} /> };
		if(this.props.isFooter) { footer = <Footer /> };
		return(
			<div className="flex-wrapper flex-vertical">
				{header}
				{
					this.props.subNav && (
						<div className="order-nav">
							<Link to="/demand" className="order-nav-link" activeClassName="active">正在抢单</Link>
							<Link to="/orderFail" className="order-nav-link" activeClassName="active">抢单失败</Link>
						</div>
					)
				}
				<div className={'flex-scroll-wrap ' + classVal}
					ref="scroll_wrap"
					onTouchStart = {this.handleTouchStart}
					onTouchMove = {this.handleTouchMove}
					onTouchEnd = {this.handleTouchEnd}
				>
					<div className="scroll-box" ref="scroll_box">
						{this.props.children}
					</div>
				</div>
				{footer}
			</div>
		)
	}
}