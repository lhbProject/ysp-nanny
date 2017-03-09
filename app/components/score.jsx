import React, { Component } from "react";

const scoreMap = new Map([
	[0, []],
	[1, [0]],
	[2, [1]],
	[3, [1, 0]],
	[4, [1, 1]],
	[5, [1, 1, 0]],
	[6, [1, 1, 1]],
	[7, [1, 1, 1, 0]],
	[8, [1, 1, 1, 1]],
	[9, [1, 1, 1, 1, 0]],
	[10, [1, 1, 1, 1, 1]],
])

const ScoreList = ({ title, score }) => (
	<li>
		{title}<StarList scoreList = {scoreMap.get(score)}  />
	</li>
);

const StarList = ({ scoreList }) => (
	<div className="star-i">
		{
			scoreList.map((value,index)=>{
				return value == 1 ? <i className="fa fa-star" key={index}></i> : <i className="fa fa-star fa-star-half" key={index}></i>
			})
		}
	</div>
)

export default ScoreList