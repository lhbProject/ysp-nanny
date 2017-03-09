import React,{Component} from "react";
import {Link} from "react-router";
import Container from "./container.jsx";

const containerProps = {
	title : "充值",
	isHeader : true,
	grayBj: true
}
export default class Recharge extends Component {
	render(){
		
		return (
			<Container {...containerProps}>
				<div className="pt20">
					<div className="form-group plr40">
						<input type="text" placeholder="输入充值金额" className="form-text" />
					</div>
					<div className="select-way mt20">
						<h6 className="plr40">选择充值方式</h6>
						<div className="select-item plr40">
							<div>
								<i className="we-icon"></i>
							</div>
							<div className="tr">
								<span className="hook-btn"></span>
							</div>
						</div>
					</div>
				</div>
				<div className="fixed-bottom">
					<Link className="default-btn">确定</Link>
				</div>
			</Container>
		)
	}
}
