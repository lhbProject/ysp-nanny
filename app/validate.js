import { Modal, Toast } from 'antd-mobile';
const alert = Modal.alert

class Validate {
	constructor() {
		this.regPhone = /^1[0-9]{10}$/;
		this.regCard = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/
	}
	init = checkObjs => {
		for(let obj of checkObjs) {
			let { name, method } = obj;

			for(let m of method) {
				let { type, text, t, cb } = m;
				let result = this[type]({ name, text, t, cb });
				if(!result) {
					return result
				}
			}
		}
		return 1
	}
	require = ({ name, text, t = 2, cb }) => { //验证是否为空
		if(name == "") {
			Toast.info(text, t, cb);
			return false
		}
		return 1
	}
	checkPhone = ({ name, text, t = 2, cb }) => { //验证手机
		let reg = this.regPhone.test(name);
		if(!reg) {
			Toast.info("请输入正确的手机号", t, cb);
			return false;
		}
		return 1
	}
	checkCard = ({ name, text, t = 2, cb }) => { //验证身份证号
		let reg = this.regCard.test(name);
		if(!reg) {
			Toast.info("请填写正确的身份证号", t, cb);
			return false
		}
		return 1
	}

}

const _validate_fn = new Validate();
const validate = _validate_fn.init;

export { validate }