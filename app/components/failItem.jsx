import React,{Component} from 'react';
import {Link} from "react-router";
import {DEMAND_STATE} from "../tool.js";

const FailItem = props => (
	<div className="order-item order-radius order-shadow">
		<div className="order-header plr30">
			<div className="order-name">张女士</div>
		</div>
		<div className="order-main">
			<ul>
				<li>
					<span>
						<i className="fa fa-hand-paper-o"></i>
					</span>
					<p>服务报价:20000元(500天)</p>
				</li>
				<li>
					<span>
						<i className="fa fa-calculator"></i>
					</span>
					<p>服务时长:2016.1.1-2016.2.2（共计30天）</p>
				</li>
				<li>
					<span>
						<i className="fa fa-map-marker"></i>
					</span>
					<p>温州市鹿城区</p>
				</li>
			</ul>
		</div>
		<div className="order-btn">
			<Link className="default-btn btn-s ">查看退款</Link>
		</div>
	</div>
)

export default FailItem



