import React,{Component} from "react";
import {IndexLink,Link} from "react-router";


export default class Footer extends Component {
	render(){
		const uid = window.localStorage.getItem("nanny_uid");
		return (
			<footer className="footer">
				<IndexLink to="/home" className="home" activeClassName="active">
					<span className="icon"></span>
					<p>首页</p>
				</IndexLink>
				<Link to="/order" className="order" activeClassName="active">
					<span className="icon"></span>
					<p>我的订单</p>
				</Link>
				<Link to="/demand" className="demand" activeClassName="active">
					<span className="icon"></span>
					<p>我的需求</p>
				</Link>
				<Link to={"/member/"+uid} className="member" activeClassName="active">
					<span className="icon"></span>
					<p>个人中心</p>
				</Link>
			</footer>
		)
	}
}
