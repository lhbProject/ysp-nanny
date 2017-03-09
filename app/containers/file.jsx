import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import Container from "../containers/container.jsx";
import { AJAX_GET, PORT_URL, COMMON_URL } from "../ajax";
import { Tabs, Modal } from "antd-mobile";
import { TabMain1, TabMain2, TabMain3 } from "../components/tab.jsx";

const TabPane = Tabs.TabPane;
const alert = Modal.alert;
const containerProps = {
	title: "个人档案",
	isHeader: true,
	height: "auto"
}

class File extends Component {
	constructor(props) {
		super(props)
		this.state = {
			fileData: {},
			skill: [],
			basicSkills: [],
			advancedSkillsList: [],
			specialSkillsList: [],
			logList: [],
			isPlay: "none"
		}
	}
	componentWillMount() {
		alert("是否加载视频", "建议wifi环境下观看", [{
			text: '取消',
		}, {
			text: '确定',
			onPress: () => this.setState({ isPlay: true })
		}]);
	}
	componentDidMount() {
		AJAX_GET({ //获取基本信息
			url: PORT_URL + "base",
			success: data => {
				//				console.log(data)
				this.setState({
					fileData: data
				})
			}
		});
		AJAX_GET({ //获取当前月嫂技能
			url: PORT_URL + "skill",
			success: (data) => {
				console.log(data)
				this.setState({
					skill: data
				})

			}
		});
		AJAX_GET({ //获取当前月嫂技能
			url: COMMON_URL + "unions/nanny_skill_base",
			success: data => {
				//				console.log(data)
				this.setState({
					basicSkills: data
				})

			}
		});
		AJAX_GET({
			url: COMMON_URL + 'unions/nanny_skill_senior', //月嫂高级技能列表
			success: data => {
				//				console.log(data)
				this.setState({
					advancedSkillsList: data
				})
			}
		});
		AJAX_GET({
			url: COMMON_URL + 'unions/nanny_skill_spec', //月嫂特殊技能列表
			success: data => {
				//				console.log(data)
				this.setState({
					specialSkillsList: data
				})
			}
		});
		AJAX_GET({ //获取服务记录
			url: PORT_URL + 'orders/logs',
			success: data => {
				console.log(data)
				this.setState({
					logList: data
				})
			}
		})
	}
	render() {
		var {
			fileData,
			basicSkills,
			advancedSkillsList,
			specialSkillsList,
			logList,
			isPlay
		} = this.state;
		return(
			<Container {...containerProps}>
				<div className="file-wrap">
					<div className="f-info">
						<div className="f-header">
							<div className="f-photo">
								<img src={fileData.avatar} />
							</div>
							<div className="f-name mt20">
								{fileData.name}
							</div>
							<div className="f-level">
								皇冠月嫂<i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i>
							</div>
							<div className="f-label">
								<div className="f-sub-label">
									<i className="fa fa-newspaper-o"></i>实名认证
								</div>
								<div className="f-sub-label">
									<i className="fa fa-odnoklassniki"></i>体检年审
								</div>
								<div className="f-sub-label">
									<i className="fa fa-shield"></i>公安备案
								</div>
							</div>
							<div className="f-bottom">
								<div className="f-bottom-sub">
									<p className="tit">标准报价(元/天)</p>
									<p className="num">{fileData.money/100}</p>
								</div>
								<div className="f-bottom-sub">
									<p className="tit">服务过宝宝</p>
									<p className="num">{fileData.babies}<span>个</span></p>
								</div>
							</div>
						</div>
					</div>
					<div className="f-video">
						<video src={fileData.video} controls="controls" width="100%" height="100%" preload={isPlay}>
							您的浏览器不支持该视频
						</video>
					</div>
					<div className="f-tag-wrapper">
						<Tabs swipeable={false}>
							<TabPane tab="月嫂简介" key="1">
								<TabMain1 fileData={fileData} />
							</TabPane>
							<TabPane tab="掌握技能" key="2">
								<TabMain2
									basicSkills={basicSkills}
									advancedSkillsList={advancedSkillsList}
									specialSkillsList={specialSkillsList}
								/>
							</TabPane>
							<TabPane tab="服务记录" key="3">
								<TabMain3 logList={logList} />
							</TabPane>
						</Tabs>
					</div>
				</div>
			</Container>
		)
	}
}

export default File