import React, {useState, useEffect, useRef} from 'react'
import { Card, Button, Modal } from 'antd'
import ETable from './../../components/ETable'
import Utils from './../../utils/utils'
import axios from './../../axios'
import RoleForm from './roleform'
import PermEditForm from './permEditForm'
import RoleAuthForm from './roleAuthForm'
const PermissionUser = () => {
  const [list, setList] = useState([])
  const [pagination, setPagination] = useState([])
  const [permissionInfo, setPermissionInfo] = useState({})
  const addFormRef = useRef(null)
  const permFormRef = useRef(null)
  useEffect(() => {
    axios.getList('/role/list', {}, true, setList, setPagination);
  },[])
  
  const handleRole = () => {
    setState({
      isRoleVisible:true
    })
  }
  const handleRoleSubmit = () => {
    let data = addFormRef.current.getData();
    console.log(data)
      axios.ajax({
        url:'/role/create',
        data:{
          params:data
        }
      }).then((res)=>{
        if(res.code === "0"){
          setState({
              isRoleVisible:false
          })
          addFormRef.current.resetData();
          axios.getList('/role/list', {}, true, setList, setPagination);
        }
      })
    }
  
  const handlePermission = () => {
    let item = permissionInfo.selectedItem;
    console.log(item)
      if (!item){
        Modal.info({
          title: '提示',
          content:'请选择一个角色'
        })
        return;
      }
      setState({
        isPermVisible:true,
        detailInfo:item,
        menuInfo: item.menus
      })
    }
  const handlePermEditSubmit = () => {
    let data = permFormRef.current.getData();
    console.log(data)
    data.role_id = permissionInfo.selectedItem.id;
    data.menus = permissionInfo.menuInfo;
    axios.ajax({
      url:'/permission/edit',
      data:{
        params:{
          ...data
        }
      }
    }).then((res)=>{
      if(res){
        setState(preState => { 
          return {...preState, isPermVisible:false}
        })
        axios.getList('/role/list', {}, true, setList, setPagination);
      }
    })
  }
  const getAuthUserList = (dataSource) => {
    console.log(permissionInfo)
    const mockData = [];
    const targetKeys = [];
    if (dataSource && dataSource.length>0){
      for(let i=0;i< dataSource.length;i++){
        const data = {
          key: dataSource[i].user_id,
          title: dataSource[i].user_name,
          status: dataSource[i].status
        }
        if(data.status === 1){
          targetKeys.push(data.key);
        }
        mockData.push(data);
      }
      setState(preState => { 
        return {...preState, mockData, targetKeys}
      }
      )
    }
  }
  const getRoleUserList = (id) => {
    axios.ajax({
      url:'/role/user_list',
      data:{
        params:{
          id
        }
      }
    }).then((res)=>{
      if(res){
        getAuthUserList(res.result);
      }
    })
  }
  const hanldeUserAuth = () => {
    let item = permissionInfo.selectedItem;
    console.log(item)
      if (!item) {
        Modal.info({
          title: '提示',
          content: '请选择一个角色'
        })
        return;
      }
      setState({
        isUserVisible: true,
        detailInfo: item
      })
    getRoleUserList(item.id);
  }
  const handleUserSubmit = () => {
    let data = {}
    console.log(state)
    data.user_ids = state.targetKeys;
    data.role_id = state.detailInfo.id;
    axios.ajax({
      url:'/role/user_role_edit',
      data:{
        params:{
          ...data
        }
      }
    }).then((res)=>{
      if(res){
        setState({
          isUserVisible:false
        })
        axios.getList('/role/list', {}, true, setList, setPagination);
      }
    })
  }
  const [state, setState] = useState({})
  const columns = [
    {
      title:'角色ID',
      dataIndex: 'id',
      align:'center'
    }, {
      title: '角色名称',
      dataIndex: 'role_name',
      align:'center'
    }, {
      title: '创建时间',
      dataIndex: 'create_time',
      align:'center',
      render: Utils.formateDate
    }, {
      title: '使用状态',
      dataIndex: 'status',
      align:'center',
      render(status){
        return status === 1?'启用':'停用'
      }
    }, {
      title: '授权时间',
      dataIndex: 'authorize_time',
      align:'center',
      render: Utils.formateDate
    }, {
      title: '授权人',
      dataIndex: 'authorize_user_name',
      align:'center'
    }
  ]

  return (
    <div>
      <Card>
        <Button type="primary" onClick={handleRole}>创建角色</Button>
        <Button type="primary" style={{marginLeft:10,marginRight:10}} onClick={handlePermission}>设置权限</Button>
        <Button type="primary" onClick={hanldeUserAuth}>用户授权</Button>
      </Card>
      <div className="content-wrap">
        <ETable 
          updateSelectedItem={Utils.updateSelectedItem}
          selectedRowKeys={permissionInfo.selectedRowKeys}
          dataSource={list}
          selectedItem={permissionInfo.selectedItem}
          columns={columns}
          setInfo={setPermissionInfo}
        />
      </div>
      <Modal
        destroyOnClose
        title="创建角色"
        visible={state.isRoleVisible}
        onOk={handleRoleSubmit}
        onCancel={()=>{
          setState({
            isRoleVisible:false
          })
        }}
      >
        <RoleForm ref={addFormRef}></RoleForm>
      </Modal>
      <Modal
        title="设置权限"
        destroyOnClose
        visible={state.isPermVisible}
        width={600}
        onOk={handlePermEditSubmit}
        onCancel={()=>{
          setState({
            isPermVisible:false
          })
        }}
      >
        <PermEditForm
          ref={permFormRef}
          detailInfo={state.detailInfo} 
          menuInfo={state.menuInfo}
          patchMenuInfo={(checkedKeys)=>{
            setState(pre => {
              console.log(pre)
              console.log(checkedKeys)
              return { ...pre, menuInfo: checkedKeys }
            })
          }}
        />
      </Modal>
      <Modal
        destroyOnClose
        title="用户授权"
        visible={state.isUserVisible}
        width={800}
        onOk={handleUserSubmit}
        onCancel={() => {
          setState({
            isUserVisible: false
          })
        }}
      >
        <RoleAuthForm
          detailInfo={permissionInfo.selectedItem}
          targetKeys={state.targetKeys}
          mockData={state.mockData}
          patchUserInfo={(targetKeys)=>{
            setState(preState => { 
              return { ...preState, targetKeys}
            })
          }}
        />
    </Modal>
    </div>
  )
}

export default PermissionUser
