import React,{Component} from 'react';
import {Link} from 'react-router';
import {GET_DATE, ORDER_STATE} from '../tool.js';

const OrderItem = ({orderList}) => 
	<div>
		{
			orderList.map((value,index) => {
				const startDate = GET_DATE(value.created*1000),
					  entDate = GET_DATE(value.end*1000)
				return (
					<div key={index} className="order-item">
						<Link to={"/orderDetail/"+value.no}>
							<div className="order-header plr30">
								<div className="order-name">{value.name}</div>
								<div className="order-state">{ORDER_STATE().get(value.state)}</div>
							</div>
							<div className="order-main">
								<ul>
									<li>
										<span>
											<i className="fa fa-hand-paper-o"></i>
										</span>
										<p>服务报价:{value.dealerMoney/100}元</p>
									</li>
									<li>
										<span>
											<i className="fa fa-calculator"></i>
										</span>
										<p>服务时长:{startDate.y+'.'+startDate.m+'.'+startDate.d}-{entDate.y+'.'+entDate.m+'.'+entDate.d}</p>
									</li>
									<li>
										<span>
											<i className="fa fa-map-marker"></i>
										</span>
										<p>{value.serviceRegion}&nbsp;&nbsp;{value.serviceAddress}</p>
									</li>
								</ul>
							</div>
						</Link>
					</div>
				)
			})
		}
	</div>

export default OrderItem



