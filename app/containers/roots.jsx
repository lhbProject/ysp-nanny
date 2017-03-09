import React, { Component } from "react";
import { connect } from "react-redux";
import "lib-flexible";

class Roots extends Component {
	constructor(props, context) {
		super(props)
		this.state = {
			height: '100%'
		}
	}
	componentDidMount() {
	}
	render() {
		return(
			<div style={{height:this.state.height}}>
				{this.props.children}
			</div>
		)
	}
}
export default Roots