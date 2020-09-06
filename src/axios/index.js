import axios from 'axios'
import { Modal } from 'antd'
import Utils from './../utils/utils'
export default class Axios {
	static getList(url,params,isMock,setlist,setpagination){
		var data = {
				params: params,
				isMock
		}
		this.ajax({
				url,
				data
		}).then((data) => {
			if (data && data.result){
				let list = data.result.item_list.map((item, index) => {
					item.key = index;
					return item;
				});
				setlist(list)
				setpagination(Utils.pagination(data, (current) => {
					Axios.getList(url, {'page': current}, isMock,setlist,setpagination);
				}))
			}
		});
}
	static ajax(options) {
		let loading;
		if (options.data && options.data.isShowLoading !== false) {
			loading = document.getElementById('ajaxLoading');
			loading.style.display = 'block';
		}
		let baseApi = '';
        if(options.isMock){
            baseApi = 'https://www.fastmock.site/mock/794c3994bf2df823f7293332b8771e7f/v1';
        }else{
            baseApi = 'https://www.fastmock.site/mock/794c3994bf2df823f7293332b8771e7f/v1';
        }
		return new Promise((resolve, reject) => {
			axios({
				url: options.url,
				method: 'get',
				baseURL: baseApi,
				timeout: 5000,
				params: (options.data && options.data.params) || ''
			}).then((response) => {
				if (options.data && options.data.isShowLoading !== false) {
					loading = document.getElementById('ajaxLoading');
					loading.style.display = 'none';
				}
				if (response.status === 200) {
					let res = response.data;
					if (res.code === 0) {
						resolve(res);
					} else {
						Modal.info({
							title: "提示",
							content: res.msg
						})
					}
				} else {
					reject(response.data);
				}
			})
		});
	}
}