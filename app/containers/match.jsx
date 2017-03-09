import React, { Component } from 'react';
import { Link } from "react-router";
import Container from "../containers/container.jsx";
import { AJAX_GET, PORT_URL, COMMON_URL } from "../ajax.js";
import MatchItem from "../components/matchItem.jsx";

const containerProps = {
	title: "需求匹配",
	isHeader: true,
	grayBj: true,
}

export default class Match extends Component {
	constructor(props) {
		super(props);
		this.state = {
			height: "auto",
			matchDate: [],
			regionList: [],
		}
	}
	componentDidMount() {
		AJAX_GET({
			url: PORT_URL + "needs",
			success: data => {
				console.log(data)
				if(data.count) {
					this.setState({
						matchDate: data.needs
					})
				}
			}
		});
	}
	render() {
		return(
			<Container {...containerProps} height={this.state.height}>
				<div className="order-wrapper">
					{
						this.state.matchDate.map((value, index) => {
							return (
								<MatchItem 
									key = {index}
									value = {value}
									regionList = {this.state.regionList}
								/>
							)
						})
					}
				</div>
			</Container>
		)
	}
}