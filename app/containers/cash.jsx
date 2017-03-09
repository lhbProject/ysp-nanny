import React,{Component} from "react";
import {Link} from "react-router";
import Container from "../containers/container.jsx";

const containerProps = {
	title : "提现",
	isHeader : true,
	grayBj: true
}

export default class Cash extends Component {
	render(){
		return (
				<Container {...containerProps}>
					<div className="pt20">
						<div className="form-group plr40">
							<input type="text" placeholder="输入提现金额" className="form-text" />
						</div>
						<div className="over-num plr40">
							可用金额：1500元
						</div>
						<div className="select-way">
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
						<div className="over-num plr40">
							注：请在我的钱包中确认提现账号是否正确
						</div>
					</div>
					<div className="fixed-bottom">
						<Link to="/cashSuccess" className="default-btn">确定</Link>
					</div>
				</Container>
		)
	}
}
