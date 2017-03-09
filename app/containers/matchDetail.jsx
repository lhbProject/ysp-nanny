import React, { Component } from "react";
import { Link } from "react-router";
import Container from "./container.jsx";
import { AJAX_GET, PORT_URL } from "../ajax.js";
import moment from "moment";
import { FILTER_REGION } from "../tool.js";

const containerProps = {
	title: "需求详情",
	isHeader: true,
	grayBj: true
}

export default class MatchDetail extends Component {
	constructor(props) {
		super(props)
		this.state = {
			matchData: {
				priorityCondText: []
			}
		}
	}
	componentDidMount() {
		AJAX_GET({
			url: PORT_URL + "needs/" + this.props.params.id,
			success: (data) => {
				this.setState({
					matchData: data
				})
				console.log(data)
			}
		})
	}
	render() {
		const matchData = this.state.matchData;
		const startDate = moment.unix(matchData.dateStart).format("YYYY月MM月DD日");
		const endDate = moment.unix(matchData.dateEnd).format("YYYY月MM月DD日");
		const { pText, cText, aText } = FILTER_REGION(matchData.region) || "无";
		return(
			<Container {...containerProps}>
				<div className="pt30">
					<div className="order-list">
						<ul>
							<li>
								<label>用户昵称:</label>
								<span>{matchData.womanName}</span>
							</li>
							<li>
								<label>服务档期:</label>
								<span>{startDate}&nbsp;-&nbsp;{endDate}</span>
							</li>
							<li>
								<label>价格预算:</label>
								<span>{matchData.moneyStart/100}-{matchData.moneyEnd/100}元</span>
							</li>
							<li>
								<label>服务地区:</label>
								<span>{matchData.regionText}</span>
							</li>
							<li>
								<label>服务胎数:</label>
								<span>{matchData.num}</span>
							</li>
							<li>
								<label>年龄偏好:</label>
								<span>{matchData.ageStart}-{matchData.ageEnd}</span>
							</li>
							<li>
								<label>能力偏好:</label>
								<span>
									{matchData.priorityCondText.map((value,index)=>{
										return <b key={index} style={{fontWeight:"normal"}}>{value}&nbsp;</b>
									})}
								</span>
							</li>
							<li>
								<label>地域偏好:</label>
								<span>{pText},{cText},{aText}</span>
							</li>
							<li>
								<label>宗教信仰:</label>
								<span>{matchData.womanReligiousText}</span>
							</li>
							<li>
								<label>生育经验:</label>
								<span>{matchData.womanExperienceText}</span>
							</li>
							<li>
								<label>备注:</label>
								<span>{matchData.memo}</span>
							</li>
						</ul>
					</div>
				</div>
				<div className="fixed-bottom">
					{
						matchData.ismatch?<button className="tip-btn">已抢单</button>:<Link className="default-btn" to={"/orderNow/"+matchData.id}>立即抢单</Link>
					}
				</div>
			</Container>
		)
	}
}