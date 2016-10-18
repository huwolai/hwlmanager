import {
	handleActions
} from 'redux-actions';

const pre = handleActions({
	['pre/image/toggle'](state, action) {

		return {...state,
			previewVisible: action.payload.previewVisible,
			previewImage: action.payload.previewImage
		};
	}
}, {
	previewVisible: false,
	previewImage: ''
})

export default pre;