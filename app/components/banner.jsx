import React,{Component} from 'react';
import {Link} from "react-router";
import img from "../images/banner.jpg";


//首页海报图路径
const bannerArr = [
	{
		"img" : img,
		"link" : "#"
	},
	{
		"img" : img,
		"link" : "#"
	}
];
const bannerList = bannerArr.map((items,index)=>
	<li className="img" key={index}><img src={items.img} /></li>
);
const bannerBtn = bannerArr.map((items,index)=>
	<li data-href={items.link} key={index}></li>
);

export default class Banner extends Component {
	componentDidMount (){
		var banner = this.refs.banner,
			banner_ul = this.refs.banner_ul,
			banner_li = banner_ul.childNodes,
			len = banner_li.length,
			_width = banner_li[0].offsetWidth,
			disX = 0,
			disY = 0;
		
		for(var i = 0;i < banner_li.length;i++){
			banner_li[i].style.left = i*_width+'px';
			banner_li[i].index = i;
		}
		
		//手指按下时绑定事件
		banner.addEventListener('touchstart' , function(ev){
			var touchZb = {
				'x': ev.targetTouches[0].pageX,
				'y': ev.targetTouches[0].pageY
			},
			dir = 0,
			_this = this,
			target_li = ev.target.parentNode;
			
			banner_ul.style.transition = "0s";
			//手指移动时绑定事件
			_this.addEventListener('touchmove', _this.moveFn = function(ev){
				disX = ev.targetTouches[0].pageX - touchZb.x;
				disY = ev.targetTouches[0].pageY - touchZb.y;
				_this._boolean = Math.abs(disX) > Math.abs(disY) && Math.abs(disX) > 200  ? true : false;
				
				
				dir = disX > 0 ? -1 : 1;
				banner_ul.style.transform="translate3d("+(disX-target_li.offsetLeft)+"px,0,0)";
			});
			
			//手指抬起时绑定事件
			_this.addEventListener('touchend', _this.endFn = function(ev){
				if(!_this._boolean){
					dir = 0
				}
				var indexNum = target_li.index + dir;
				if(indexNum < 0){
					indexNum = 0; 
				}
				else if (indexNum > len-1){
					indexNum = len -1;
				}
				
				banner_ul.style.transition = "0.5s";
				banner_ul.style.webkitTransition = "0.5s";				
				if(banner_li[indexNum]){
					banner_ul.style.transform = "translateX(" + (-banner_li[indexNum].offsetLeft) + "px)";
				}
				_this.removeEventListener("touchmove",_this.moveFn);
				_this.removeEventListener("touchend",this.endFn);
				
			});
		});
	}
	handleTouchMove = (e) => {
		e.stopPropagation()
	}
	render(){ 
		return (
			<div className="banner" ref='banner' onTouchMove={this.handleTouchMove}>
				<div className="banner-items">
					<ul ref="banner_ul">
						{bannerList}
					</ul>
				</div>
				<ol>
					{bannerBtn}
				</ol>
			</div>
		)
	}
}