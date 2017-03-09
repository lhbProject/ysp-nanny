import React,{Component} from "react";
import {Link, IndexLink, hashHistory } from "react-router";

export default class Header extends Component {
	constructor(props){
		super(props)
	}
	render(){
		return (
			<header className="header">
				<ul>
					<li>
						<a href="javascript:;" onTouchTap={()=>hashHistory .goBack()}>
							<i className="fa fa-chevron-left"></i>
						</a>
					</li>
					<li className="tc">
						{this.props.title}
					</li>
					<li className="tr">
						<IndexLink to="/home">
							<i className="fa fa-home fa-lg"></i>
						</IndexLink>
					</li>
				</ul>
			</header>
		)
	}
}