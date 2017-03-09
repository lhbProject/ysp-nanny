import React, { Component } from "react";
import Container from "./container.jsx";
import FailItem from "../components/failItem.jsx";


let containerProps = {
	title: "我的需求",
	isHeader: true,
	isFooter: true,
	grayBj: true,
	subNav: true
}

export default class OrderFail extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return(
			<Container {...containerProps}>
				<div className="order-wrapper">
					<FailItem />
				</div>
			</Container>
		)
	}
}