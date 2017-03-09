import React, { Component } from 'react';
import { Link } from "react-router";
import { Carousel } from "antd-mobile";
import Container from "./container.jsx";
import img from "../images/banner.jpg";

const containerProps = {
	isFooter: true,
	height: "auto"
}
export default class Home extends Component {
	render() {
		return(
			<Container {...containerProps}>
				<div className="pb30">
					<Carousel
				     	className = "carousel"
				     	infinite
				    >
					    {
					    	[img,img].map((value,index) => (
					    		<a key={index}><img src={value} /></a>
					    	))
					    }
				    </Carousel>
					<OrderLive />
					<div className="btn-box">
						<Link to="/match" className="default-btn">
							我要抢单
						</Link>	
					</div>
				</div>
			</Container>
		)
	}
};
//抢单直播
class OrderLive extends Component {
	componentDidMount() {
		var live_ul = this.refs.live_list.childNodes[0],
			live_li = live_ul.childNodes[0],
			val = live_li.offsetHeight,
			t = 0,
			arr_li = [],
			frag = document.createDocumentFragment();

		for(var i = 0; i < 5; i++) {
			frag.appendChild(live_ul.childNodes[i].cloneNode(true));
		};
		live_ul.appendChild(frag);
		setInterval(() => {
			t++;
			live_ul.style.transition = "0.5s";
			live_ul.style.transform = "translateY(" + (-val * t) + "px)";
		}, 3000);

		live_ul.addEventListener('transitionend', function() {
			if(t >= 5) {
				t = 0;
				live_ul.style.transition = "0s";
				live_ul.style.transform = "translateY(0px)";
			}
		})
	}
	render() {
		return(
			<div className="live-wrap">
				<div className="title">
					<span>抢单直播</span>
				</div>
				<div className="live-layout">
					<div className="live_list" ref="live_list">
						<ul>
							<li>
								<div className="img">
									<img src="" alt="" />
								</div>
								<div className="text">
									张阿姨于30分钟前抢单成功1
								</div>
							</li>
							<li>
								<div className="img">
									<img src="" alt="" />
								</div>
								<div className="text">
									张阿姨于1小时前抢单成功2
								</div>
							</li>
							<li>
								<div className="img">
									<img src="" alt="" />
								</div>
								<div className="text">
									张阿姨于1小时前抢单成功3
								</div>
							</li>
							<li>
								<div className="img">
									<img src="" alt="" />
								</div>
								<div className="text">
									张阿姨于1小时前抢单成功4
								</div>
							</li>
							<li>
								<div className="img">
									<img src="" alt="" />
								</div>
								<div className="text">
									张阿姨于1小时前抢单成功5
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		)
	}
}