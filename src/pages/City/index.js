import React, { useState, useEffect } from 'react'
import { Card, Button, Table, Modal, message } from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/utils';
import OpenCityForm from './OpenCityForm'
import BaseForm from '../../components/BaseForm'
const City = () => {
  let params = { page: 1 }
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
			type:'SELECT',
			label:'用车模式',
			field:'mode',
			placeholder:'全部',
			initialValue:'0',
			width:100,
			list: [{ id: '0', name: '全部' }, { id: '1', name: '指定停车点模式' }, { id: '2', name: '禁停区模式' }]
		},
		{
			type:'SELECT',
			label:'运营模式',
			field:'run',
			placeholder:'全部',
			initialValue:'0',
			width:80,
			list: [{ id: '0', name: '全部' }, { id: '1', name: '自营' }, { id: '2', name: '加盟' }]
    },
    {
			type:'SELECT',
			label:'加盟商授权状态',
			field:'status',
			placeholder:'全部',
			initialValue:'0',
			width:100,
			list: [{ id: '0', name: '全部' }, { id: '1', name: '已授权' }, { id: '2', name: '未授权' }]
		}
	]
  const [list, setList] = useState([])
  const [pagination, setPagination] = useState({})
  const [isShowOpenCity, setIsShowOpenCity] = useState(false)
  const handleFilter = (params) => {
    params = params;
		axios.getList('/open_city', params, true, setList, setPagination);
  }
  const handleForm = (val) => {
    return val
  }
  const handleOpenCity = () => {
    setIsShowOpenCity(true)
  }
  const getList = () => {
    axios.getList('/open_city', {}, true, setList, setPagination);
  }
  const handleSubmit = () => {
    let cityInfo = handleForm()
      console.log(cityInfo);
      axios.ajax({
        url:'/city/open',
        data:{
          params:cityInfo
        }
      }).then((res)=>{
        if(res.code === 0){
          message.success('开通成功');
          setIsShowOpenCity(false)
          getList();
        }
      })
  }
  
  useEffect(() => {
    getList()
  },[]);
  
    const columns = [
      {
        title: '城市ID',
        dataIndex: 'id',
        align: 'center'
      }, {
        title: '城市名称',
        dataIndex: 'name',
        align: 'center'
      }, {
        title: '用车模式',
        dataIndex: 'mode',
        align: 'center',
        render(mode) {
          return mode == 1 ? '停车点' : '禁停区';
        }
      }, {
        title: '营运模式',
        dataIndex: 'op_mode',
        align: 'center',
        render(op_mode) {
          return op_mode == 1 ? '自营' : '加盟';
        }
      }, {
        title: '授权加盟商',
        dataIndex: 'franchisee_name',
        align: 'center'
      }, {
        title: '城市管理员',
        dataIndex: 'city_admins',
        align: 'center',
        render(arr) {
          return arr.map((item) => {
            return item.user_name;
          }).join(',');
        }
      }, {
        title: '城市开通时间',
        dataIndex: 'open_time',
        align: 'center'
      }, {
        title: '操作时间',
        dataIndex: 'update_time',
        render: Utils.formateDate,
        align: 'center'
      }, {
        title: '操作人',
        dataIndex: 'sys_user_name',
        align: 'center'
      }
    ]
    return (
      <div style={{'width':'100%'}}>
        <Card>
        <BaseForm formList={formList} filterSubmit={handleFilter}/>
        </Card>
        <Card style={{ marginTop: 10 }}>
          <Button type="primary" onClick={handleOpenCity}>开通城市</Button>
        </Card>
        <div className="content-wrap">
          <Table 
            bordered
            columns={columns}
            dataSource={list}
            pagination={pagination}
          />
        </div>
        <Modal
          title="开通城市"
          visible={isShowOpenCity}
          onCancel={() => {
            setIsShowOpenCity(false)
          }}
          onOk={handleSubmit}
        >
          <OpenCityForm getForm={handleForm} />
        </Modal>
      </div>
    )
}
export default City
