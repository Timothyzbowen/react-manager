import React, { useState, useEffect}from 'react'
import { Card, Button, Table, Form, Modal, message} from 'antd'
import axios from '../../axios'
import BaseForm from '../../components/BaseForm'
const FormItem = Form.Item;

function Order() {
	let params = { page: 1 }
	const [list, setList] = useState([])
	const [pagination, setPagination] = useState({})
	const [selectedRowKeys, setSelectedRowKeys] = useState([])
	const [selectedItem, setSelectedItem] = useState(null)
	const [orderConfirmVisble, setOrderConfirmVisble] = useState(false)
	const [orderInfo, setOrderInfo] = useState({})
	const formList = [
		{
			type:'SELECT',
			label:'城市',
			field:'city',
			placeholder:'全部',
			initialValue:'1',
			width:80,
			list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '3', name: '上海' }]
		},
		{
			type: '时间查询'
		},
		{
			type: 'SELECT',
			label: '订单状态',
			field:'order_status',
			placeholder: '全部',
			initialValue: '1',
			width: 80,
			list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '结束行程' }]
		}
	]
	const handleFilter = (param) => {
		params = param;
		axios.getList('/order/list', params, true, setList, setPagination);
	}
	const columns = [
		{
			title:'订单编号',
			dataIndex: 'order_sn',
			align: 'center'
		},
		{
			title: '车辆编号',
			dataIndex: 'bike_sn',
			align: 'center'
		},
		{
			title: '用户名',
			dataIndex: 'user_name',
			align: 'center'
		},
		{
			title: '手机号',
			dataIndex: 'mobile',
			align: 'center'
		},
		{
			title: '里程',
			dataIndex: 'distance',
			align: 'center',
			render(distance){
					return distance/1000 + 'Km';
			}
		},
		{
			title: '行驶时长',
			dataIndex: 'total_time',
			align: 'center'
		},
		{
			title: '状态',
			dataIndex: 'status',
			align: 'center'
		},
		{
			title: '开始时间',
			dataIndex: 'start_time',
			align: 'center'
		},
		{
			title: '结束时间',
			dataIndex: 'end_time',
			align: 'center'
		},
		{
			title: '订单金额',
			dataIndex: 'total_fee',
			align: 'center'
		},
		{
			title: '实付金额',
			dataIndex: 'user_pay',
			align: 'center'
		}
	]
	const formItemLayout = {
		labelCol:{span:5},
		wrapperCol:{span:19}
	}
	const rowSelection = {
		type: 'radio',
		selectedRowKeys
	}
	const onRowClick = (record, index) => {
		let selectKey = [index];
		setSelectedRowKeys(selectKey);
		setSelectedItem(record);
	}
	useEffect(() => {
		axios.getList('/order/list', params,  true, setList, setPagination)
	}, [])
	const openOrderDetail = ()=>{
		let item = selectedItem;
		if (!item) {
			Modal.info({
				title: '信息',
				content: '请先选择一条订单'
			})
			return;
		}
		window.open(`/common/order/detail/${item.id}`,'_blank')
	}
	//结束订单
	const handleConfirm = ()=>{
    let item = selectedItem;
		if (!item) {
			Modal.info({
				title: '信息',
				content: '请选择一条订单进行结束'
			})
			return;
		}
		axios.ajax({
			url:'/order/ebike_info',
			data:{
				params:{
					orderId: item.id
				}
			}
		}).then((res)=>{
			if (res.code === "0") {
				setOrderConfirmVisble(true)
				setOrderInfo(res.result)
			}
		})
	}
	//确认结束订单
	const handleFinishOrder = () => {
		let item = selectedItem;
		axios.ajax({
			url: '/order/finish_order',
			data: {
				params: {
					orderId: item.id
				}
			}
		}).then((res) => {
			if (res.code === "0") {
				message.success('订单结束成功')
				setOrderConfirmVisble(false)
				axios.getList('/order/list', params,  true, setList, setPagination);
			}
		})
	}
	return (
		<div style={{'width':'100%'}}>
			<Card>
				<BaseForm formList={formList} filterSubmit={handleFilter}/>
			</Card>
			<Card style={{marginTop:10}}>
				<Button type="primary" onClick={openOrderDetail}>订单详情</Button>
				<Button type="primary" style={{marginLeft:10}} onClick={handleConfirm}>结束订单</Button>
			</Card>
			<div className="content-wrap">
				<Table
					bordered
					columns={columns}
					dataSource={list}
					pagination={pagination}
					rowSelection={rowSelection}
					onRow={(record, index) => {
						return {
							onClick: () => {
								onRowClick(record, index);
							}
						};
					}}
				/>
			</div>
			<Modal
				title="结束订单"
				visible={orderConfirmVisble}
				onCancel={()=>{
					setOrderConfirmVisble(false)
				}}
				onOk={handleFinishOrder}
				width={600}
			>
				<Form layout="horizontal">
					<FormItem label="车辆编号" {...formItemLayout}>
						{orderInfo.bike_sn}
					</FormItem>
					<FormItem label="剩余电量" {...formItemLayout}>
						{orderInfo.battery + '%'}
					</FormItem>
					<FormItem label="行程开始时间" {...formItemLayout}>
						{orderInfo.start_time}
					</FormItem>
					<FormItem label="当前位置" {...formItemLayout}>
						{orderInfo.location}
					</FormItem>
				</Form>
			</Modal>
		</div> 
	)
}

export default Order
