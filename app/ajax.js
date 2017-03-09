import "whatwg-fetch";
export const PORT_URL = "http://test.yuesaopai.com:8081/nanny/api/" //月嫂端接口地址
export const COMMON_URL = "http://test.yuesaopai.com:8081/api/" //通用接口

const FETCH_FN = (req, success, fail) => { //ajax请求
	fetch(req).then(response => {
		console.log(response)
		if(response.ok) {
			if(response.status == 200) {
				return response.json().then(success)
			} else if(response.status == 201) {
//				console.log(response)
				return response.json().then(success)
			} else if(response.status == 204) {
				return response.text().then(success)
			} else {
				return response.text()
			}
		} else {
//			console.warn(response)
			return response.json().then(fail)
		}
	}).catch(function(err) {
		console.warn("出错了：" + err)
	})
}

export const AJAX_POST = (params) => { //POST请求
	var _headers = new Headers({
		"Content-Type": "application/json",
		"Authorization": window.localStorage.getItem('nanny_token')
	});
	var reqInit = {
		method: "POST",
		headers: _headers,
		body: JSON.stringify(params.data)
	}
	var req = new Request(params.url, reqInit);
	FETCH_FN(req, params.success, params.fail);
}

export const AJAX_GET = (params) => { //GET请求
	let headers = new Headers({
			"Content-Type": "application/json",
			"Authorization": window.localStorage.getItem('nanny_token')
		}),
		req = new Request(params.url, {
			headers: headers
		})
	FETCH_FN(req, params.success, params.fail);
}

export const AJAX_PUT = (params) => { //put请求
	let headers = new Headers({
			"Content-Type": "application/json",
			"Authorization": window.localStorage.getItem('nanny_token')
		}),

		req = new Request(params.url, {
			method: "PUT",
			headers: headers,
			body: JSON.stringify(params.data)
		});
	FETCH_FN(req, params.success, params.fail);
}

export const AJAX_DELETE = (params) => { //del请求
	//	console.log(params)
	let headers = new Headers({
			"Content-Type": "application/json",
			"Authorization": window.localStorage.getItem('nanny_token')
		}),

		req = new Request(params.url, {
			method: "DELETE",
			headers: headers,
			body: JSON.stringify(params.data)
		});
	FETCH_FN(req, params.success, params.fail);
}

export const AJAX_UPLOAD = (value) => { //图片上传，返回一个promise(().then())
	let _FormData = new FormData();
	_FormData.append('file', value);
	return fetch(COMMON_URL + "upload", {
		method: "POST",
		headers: {
			"Authorization": window.localStorage.getItem('nanny_token')
		},
		body: _FormData
	}).then((res) => {
		return res.json()
	})
}