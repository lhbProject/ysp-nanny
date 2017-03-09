import React, { Component } from 'react';
import moment from "moment"
import { DEMAND_STATE, FILTER_REGION } from "../tool.js";

const DemandItem = ({ value, handleCancel }) => {
	const {
		matchID,
		nickname,
		money,
		dateStart,
		dateEnd,
		region,
	} = value;
	const { pText, cText, aText } = FILTER_REGION(region);
	const startDate = moment.unix(dateStart).format("YYYY.MM.DD");
	const endDate = moment.unix(dateEnd).format("YYYY.MM.DD");
	return(
		<div className="order-item order-radius order-shadow">
			<div className="order-header plr30">
				<div className="order-name">{nickname}</div>
			</div>
			<div className="order-main">
				<ul>
					<li>
						<span>
							<i className="fa fa-hand-paper-o"></i>
						</span>
						<p>服务报价:{money/100}元</p>
					</li>
					<li>
						<span>
							<i className="fa fa-calculator"></i>
						</span>
						<p>服务时长:{startDate}-{endDate}</p>
					</li>
					<li>
						<span>
							<i className="fa fa-map-marker"></i>
						</span>
						<p>{ pText + ","+ cText + "," + aText }</p>
					</li>
				</ul>
			</div>
			<div className="order-btn">
				<button className="disable-btn btn-s" onTouchTap={() => handleCancel(matchID)}>取消抢单</button>
			</div>
		</div>
	)
}

export default DemandItem