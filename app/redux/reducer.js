import { combineReducers } from "redux";


const reducerTab = (state, action) => {
	switch (action.type){
		case "1":
			return state = '已登录';
		case "2":
			return state = '退出登录';
		default: 
			return 1;
	}
}



export default combineReducers({
	reducerTab
})
