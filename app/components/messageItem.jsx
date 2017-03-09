import React, { Component } from 'react';
import { Link } from "react-router";
import { AJAX_GET, PORT_URL } from "../ajax";
import moment from "moment";

const MessageItem = ({ value }) => {
	const { id, title, content, created, readed } = value;
	const time = moment.unix(created).format('YYYY-MM-DD');
	return(
		<div className="m-list">
			<Link to={"/messageDetail/" + id}>
				<h6>
					{title}
					<span>{readed > 0 ? "已读":"未读"}</span>
				</h6>
				<div className="m-text">
					<div dangerouslySetInnerHTML={{__html:content}}></div>
				</div>
				<div className="m-date">
					{time}
				</div>
			</Link>
		</div>
	)
}

export default MessageItem