import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import Container from "./container.jsx";
import { AJAX_GET, PORT_URL } from "../ajax.js";
import ScoreList from "../components/score.jsx";

const containerProps = {
	isFooter: true,
	grayBj: true
}

class Member extends Component {
	constructor(props) {
		super(props)
		this.state = {
			memberData: {},
			scoreData: []
		}
	}
	componentDidMount() {
		AJAX_GET({
			url: PORT_URL + "info",
			success: data => {
				//				console.log(data)
				this.setState({
					memberData: data
				})
			}
		});
		AJAX_GET({
			url: PORT_URL + "comments",
			success: data => {
				console.log(data)
				this.setState({
					scoreData: data.rate[0]
				})
			}
		});
	}
	render() {
		const { avatar, name } = this.state.memberData;
		const { serviceRate = 0, babyRate = 0, motherRate = 0, foodRate = 0, healthRate = 0 } = this.state.scoreData;
		const scoreData = [{
				title: "服务态度",
				score: Math.round(serviceRate)
			},
			{
				title: "婴儿护理",
				score: Math.round(babyRate)
			},
			{
				title: "产妇护理",
				score: Math.round(motherRate)
			},
			{
				title: "膳食制作",
				score: Math.round(foodRate)
			},
			{
				title: "卫生清洁",
				score: Math.round(healthRate)
			}
		];

		return(
			<Container {...containerProps}>
				<div className="member-wrapper">
					<div className="member-content">
						<div className="m-avater">
							<Link to="/editInfo">
								<img src={avatar} />
							</Link>
						</div>
						<div className="m-name">
							{name}
						</div>
						<div className="m-score">
							<ul>
								{
									scoreData.map(({title,score}, index) => {
										return <ScoreList title={title} score={score} key={index} />
									})
								}
							</ul>
						</div>
						<div className="m-btn clearfix pt35">
							<div className="btn-box">
								<Link to="/wallet">我的钱包</Link>
							</div>
							<div className="btn-box">
								<Link to="/message">我的消息</Link>
							</div>
						</div>
					</div>
					<div className="member-list">
						<div className="member-item">
							<Link to="/file">
								<i className="fa fa-folder"></i>个人档案
							</Link>
						</div>
						<div className="member-item">
							<Link to="/login">
								<i className="fa fa-exchange"></i>更换账号
							</Link>
						</div>
					</div>
				</div>
			</Container>
		)
	}
}

export default Member