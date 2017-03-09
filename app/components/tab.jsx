import React, { Component } from "react";
import moment from "moment";

const selectSkill = (id, arrList) => {
	var newArr = arrList.map(item => {
		return item.skillID
	})
	return newArr.indexOf(id.toString())
}
//tab内容
const TabMain1 = ({
	fileData
}) => (
	<div className="YS_intro">
		<ul>
			<li>身高: {fileData.height}</li>
			<li>体重: {fileData.weight}</li>
			<li>视力: {fileData.visionText}</li>
			<li>民族: {fileData.nationText}</li>
			<li>宗教信仰: {fileData.religiousText}</li>
			<li>从业时间: {moment.unix(fileData.workingTime).format("YYYY年MM月DD日")}</li>
			<li>最高学历: {fileData.eduBackgroundText}</li>
			<li>婚姻状况: {fileData.maritalStatusText}</li>
			<li>生育状况: {fileData.hasBaby?"是":"否"}</li>
			<li>使用服务区域: {fileData.serviceRegionText}</li>
			<li>春节休息: {fileData.restAtNewyear?"是":"否"}</li>
			<li>带多胞胎: {fileData.canServiceMultBirth?"是":"否"}</li>
			<li>带大宝宝: {fileData.canServiceLargeAgeBaby?"是":"否"}</li>
			<li>家庭住址: {fileData.address}</li>
			<li>资质标签: {fileData.tags}</li>
		</ul>
		<div className="color-prompt">注：如需修改个人档案，请联系4000-611-866</div>
	</div>
)

const TabMain2 = ({
	basicSkills,
	advancedSkillsList,
	specialSkillsList
}) => (
	<div className="YS_skill">
			<dl>
				<dt>
					<h6 className="text-center">基本技能</h6>
				</dt>
				{
					basicSkills.map(({id,name},index)=>{
						return (
							<dd key={id}><i className="fa fa-square"></i>{name}</dd>
						)
					})
				}
			</dl>
			<dl>
				<dt>
					<h6 className="text-center">高级技能</h6>
				</dt>
				{
					advancedSkillsList.map(({id,name},index)=>{
						return (
							<dd key={id}><i className="fa fa-square"></i>{name}</dd>
						)
					})
				}
			</dl>
			<dl>
				<dt>
					<h6 className="text-center">特殊技能</h6>
				</dt>
				{
					specialSkillsList.map(({id,name},index)=>{
						return (
							<dd key={id}><i className="fa fa-square"></i>{name}</dd>
						)
					})
				}
			</dl>
		</div>
)
const TabMain3 = () => (
	<div className="YS_server">
		<ul>
			<li>2017.01.22-2017.02.20</li>
		</ul>
	</div>
)

export { TabMain1, TabMain2, TabMain3 }