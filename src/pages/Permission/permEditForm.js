import React, { useImperativeHandle, forwardRef}from 'react'
import { Form, Select, Input, Tree } from 'antd'
import menuConfig from './../../config/menuConfig'
const Option = Select.Option;
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;
const PermEditForm = (props, ref) => {
  const [formRef] = Form.useForm()
  console.log(props)
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 }
  }
  const detail_info = props.detailInfo
  const menuInfo = props.menuInfo
  const renderTreeNodes = (data)=>{
    return data.map((item)=>{
      if(item.children){
        return <TreeNode title={item.title} key={item.key}>
          {renderTreeNodes(item.children)}
        </TreeNode>
      }else{
        return <TreeNode {...item}/>
      }
    })
  }
  const onCheck = (checkedKeys)=>{
    props.patchMenuInfo(checkedKeys)
  }
  useImperativeHandle(ref, () => {
    return {
      getData() {
        return { ...formRef.getFieldsValue(), menuInfo }
      },
      resetData() {
        formRef.resetFields()
      }
    }
  }
  )
  return (
    <Form layout="horizontal" form={formRef}>
      <FormItem label="角色名称" {...formItemLayout}>
        <Input disabled placeholder={detail_info.role_name}/>
      </FormItem>
        <FormItem label="状态" {...formItemLayout} initialValue='1' name="status">
          <Select>
            <Option value="1">启用</Option>
            <Option value="0">停用</Option>
          </Select>
      </FormItem>
      <Tree
        checkable
        defaultExpandAll
        onCheck={(checkedKeys)=>{
          onCheck(checkedKeys)
        }}
        checkedKeys={menuInfo}
      >
        <TreeNode title="平台权限" key="platform_all">
          {renderTreeNodes(menuConfig)}
        </TreeNode>
      </Tree>
    </Form>
  )
}

export default forwardRef(PermEditForm)
