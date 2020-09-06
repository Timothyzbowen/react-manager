import React, { useImperativeHandle, forwardRef}from 'react'
import { Form, Select, Input } from 'antd'
const Option = Select.Option;
const FormItem = Form.Item;
const RoleForm = (props,ref) => {
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 }
  }
  const [formRef] = Form.useForm()
  useImperativeHandle(ref, () => {
    return {
      getData() {
        return formRef.getFieldsValue('role_name')
      },
      resetData() {
        formRef.resetFields()
      }
    }
  }
  )
  return (
    <Form layout="horizontal" form={formRef}>
      <FormItem label="角色名称" {...formItemLayout} name="role_name">
        <Input type="text" placeholder="请输入角色名称" />
      </FormItem>
      <FormItem label="状态" {...formItemLayout} name="state">
        <Select>
          <Option value={1}>开启</Option>
          <Option value={0}>关闭</Option>
        </Select>
      </FormItem>
    </Form>
  )
}

export default forwardRef(RoleForm)
