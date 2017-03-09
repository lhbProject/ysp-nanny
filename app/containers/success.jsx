import React,{Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import Container from './container.jsx';


const containerProps = {
	title: "抢单成功",
	isHeader: true
}
let timer = null
export default class Success extends Component {
	constructor (props,context){
		super(props);
		this.state = {
			num: 5
		}
	}
	componentDidMount (){
		clearInterval(timer)
		timer = setInterval(() => {
			if(this.state.num <= 0) {
				clearInterval(timer)
				this.context.router.replace('/demand');
				return false
			}
			this.setState({
				num: this.state.num - 1
			});
		}, 1000)
	}
	componentWillUnmount (){
		clearInterval(timer)
	}
	render(){
		return (
			<Container {...containerProps}>
				<div className="succuss-wrap">
					<div className="text">
						需求提交成功，等待推荐月嫂<br /> <span id="countdown" ref="count">{this.state.num}</span>秒后返回我的需求
						<p
							onTouchTap = {()=>this.context.router.replace("/demand")}
							style={{color:'#77d9d4'}}
						>
							立即跳转
						</p>
					</div>
				</div>
			</Container>
		)
	}
}
Success.contextTypes = {
	router: React.PropTypes.object.isRequired
}

