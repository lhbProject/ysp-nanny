import { AJAX_GET, COMMON_URL } from "./ajax";
const GET_DATE = (d) => { //将时间戳转换为时间
	var _date = new Date();

	_date.setTime(d)

	return {
		dates: _date,
		y: _date.getFullYear(),
		m: _date.getMonth() + 1,
		d: _date.getDate()
	}
}

const DEMAND_STATE = () => {
	var _d_map = new Map([
		['1', '订单待审核'],
		['2', '审核不通过'],
		['3', '审核通过'],
		['4', '已取消抢单']
	])

	return _d_map
};

const ORDER_STATE = () => {
	var _o_map = new Map([
		['1', '等待用户付款'],
		['2', '订单违约或完成合约'],
		['3', '订单已付款，待确认...'],
		['4', '订单进行中'],
		['5', '订单已完成'],
		['6', '订单被拒绝'],
		['7', '订单已取消'],
		['8', '订单完成，退款中...'],
		['9', '退款成功']
	])
	return _o_map
}

const GET_REGION = () => {
	//	localStorage.clear();
	AJAX_GET({
		url: COMMON_URL + 'regions/00000000',
		success: data => {
			var province = data.regions; //获得省列表
			var city = [];
			var area = [];
			province.map(({ regions }, index) => { //获得市列表
				if(regions) {
					regions.map((value, index) => {
						city.push(value)
					})
				}
			});
			city.map(({ regions }, index) => {
				if(regions) {
					regions.map((value, index) => {
						area.push(value)
					})
				}
			})
			localStorage.setItem('province', JSON.stringify(province));
			localStorage.setItem('city', JSON.stringify(city));
			localStorage.setItem('area', JSON.stringify(area));
		}
	});

}

const FILTER_REGION = rid => {
	if(!rid) return
	var province = localStorage.getItem('province') && JSON.parse(localStorage.getItem('province'));
	var city = localStorage.getItem('city') && JSON.parse(localStorage.getItem('city'));
	var area = localStorage.getItem('area') && JSON.parse(localStorage.getItem('area'));
	var pid = rid.slice(0, 2) + "000000";
	var cid = rid.slice(0, 4) + "0000";
	var pText = "",
		cText = "",
		aText = "";
	
	for(var { id, name } of province) {
		if(pid == id) {
			pText = name;
		}
	}
	for(var { id, name } of city) {
		if(cid == id) {
			cText = name;
		}
	}
	for(var { id, name } of area) {
		if(rid == id) {
			aText = name;
		}
	}
	return { pText, cText, aText }
}

export { GET_DATE, DEMAND_STATE, ORDER_STATE, GET_REGION, FILTER_REGION }