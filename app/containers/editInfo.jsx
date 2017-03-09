import React, { Component } from "react";
import { render } from "react-dom";
import { Link } from "react-router";
import { Modal } from "antd-mobile";
import Container from "../containers/container.jsx";
import { AJAX_POST, AJAX_GET, AJAX_PUT, AJAX_UPLOAD, PORT_URL } from "../ajax.js";
import { validate } from "../validate";

const alert = Modal.alert;
const containerProps = {
	title: "编辑个人资料",
	isHeader: true
}

export default class editInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			address: "",
			avatar: "",
			thunmurl: "",
			fileurl: ""
		}
	}
	componentDidMount() {
		AJAX_GET({
			url: PORT_URL + "info",
			success: (data) => {
				console.log(data)
				let avatar = data.avatar;
				this.setState({
					name: data.name,
					address: data.address,
					avatar: avatar,
					thunmurl: avatar
				})
			}
		})
	}
	handleChangeName = (e) => {
		this.setState({
			name: e.target.value
		})
	}
	handleChangeAddr = (e) => {
		this.setState({
			address: e.target.value
		})
	}
	handleChange = (e) => { //预览图片
		let files = e.target.files;
		if(files.length) {
			files[0].thunm = URL.createObjectURL(files[0])
			this.setState({
				avatar: files[0].thunm,
				thunmurl: files[0].name,
				fileurl: files[0]
			})
		}

	}
	handleTap = () => {
		const { name, address } = this.state;
		console.log(this.state)
		const result = validate([{
			"name": name,
			"method": [{
				"type": "require",
				"text": "请输入姓名"
			}]
		}, {
			"name": address,
			"method": [{
				"type": "require",
				"text": "请输入地址"
			}]
		}]);

		if(!result) return;

		if(this.state.fileurl == "") {
			AJAX_PUT({
				url: PORT_URL + "info",
				data: {
					'name': this.state.name,
					'address': this.state.address,
					'avatar': this.state.avatar
				},
				success: (data) => {
					alert("修改成功");
					this.setState({
						name: this.state.name,
						address: this.state.address,
						avatar: this.state.avatar
					})
				}
			});
		} else {
			AJAX_UPLOAD(this.state.fileurl).then((data) => {
				let urlData = data.file;
				AJAX_PUT({
					url: PORT_URL + "info",
					data: {
						'name': this.state.name,
						'address': this.state.address,
						'avatar': urlData
					},
					success: (data) => {
						alert("修改成功");
						this.setState({
							name: this.state.name,
							address: this.state.address,
							avatar: urlData
						})
					}
				})
			});
		}

	}
	render() {
		console.log(this.state)
		return(
			<Container {...containerProps}>
				<div className="plr30">
					<div className="form-group info-text">
						<input 
							type="text" 
							value={this.state.thunmurl} 
							className="form-text text-underline btn-b" 
							placeholder="头像"
						/>
						<input 
							type="file"
							className="form-text text-underline btn-b form-file" 
							ref="info_avatar"
							onChange={this.handleChange}
						/>
						<div className="photo" style={{"backgroundImage":"url("+this.state.avatar+")"}}>
						</div>
					</div>
					<div className="form-group info-text">
						<input 
							type="text" 
							value={this.state.name} 
							className="form-text text-underline btn-b"
							placeholder="姓名"
							ref="info_name"
							onChange={this.handleChangeName}
						/>
						<div className="arrow">
							<i className="fa fa-chevron-right"></i>
						</div>
					</div>
					<div className="form-group info-text">
						<input 
							type="text" 
							value={this.state.address} 
							className="form-text text-underline btn-b" 
							placeholder="地址"
							ref="info_address"
							onChange={this.handleChangeAddr}
						/>
						<div className="arrow">
							<i className="fa fa-chevron-right"></i>
						</div>
					</div>
				</div>
				<div className="fixed-bottom">
					<button className="default-btn" onTouchTap={this.handleTap}>保存</button>
				</div>
			</Container>
		)
	}
}