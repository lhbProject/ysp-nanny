import React, { Component } from "react";
import { Link } from "react-router";
import moment from "moment";
import { FILTER_REGION } from "../tool";
const MatchItem = ({
	value,
	regionList
}) => {
	const dateStart = moment.unix(value.dateStart).format("YYYY.MM.DD");
	const dateEnd = moment.unix(value.dateEnd).format("YYYY.MM.DD");
	const { pText, cText, aText } = FILTER_REGION(value.region) || "无";
	return(
		<div className="order-item">
			<Link to={"/matchDetail/"+value.id}>
				<div className="order-header plr30" >
					<div className="order-name">{value.nickname}</div>
				</div>
				<div className="order-main">
					<ul>
						<li>
							<span>
								<i className="fa fa-hand-paper-o"></i>
							</span>
							<p>服务报价:&nbsp;{value.moneyStart/100 + "-" + value.moneyEnd/100 + "元"}</p>
						</li>
						<li>
							<span>
								<i className="fa fa-calculator"></i>
							</span>
							<p>服务时长:&nbsp;{dateStart+"-"+dateEnd}</p>
						</li>
						<li>
							<span>
								<i className="fa fa-map-marker"></i>
							</span>
							<p>{pText},{cText},{aText}</p>
						</li>
					</ul>
				</div>
			</Link>
		</div>
	)
}
export default MatchItem