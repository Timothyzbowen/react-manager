import React, { useImperativeHandle, forwardRef } from 'react'
import { Form, Input, Radio, DatePicker, Select } from 'antd'
import moment from 'moment'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const Option = Select.Option;
const UserForm = (props, ref) => {
  const [formRef] = Form.useForm()
  let type = props.type;
  let userInfo = props.userInfo.selectedItem || {};
  const formItemLayout = {
      labelCol:{span:5},
      wrapperCol:{span:19}
  }
    useImperativeHandle(ref,() => {
      return {
        getData() {
          return formRef.getFieldsValue('user_name')
        },
        resetData() {
          formRef.resetFields()
        }
      }
    })
  const getState = (state)=>{
    return {
      '1': '咸鱼一条',
      '2': '风华浪子',
      '3': '北大才子一枚',
      '4': '百度FE',
      '5': '创业者'
    }[state]
  }
  
  return (
    <Form layout="horizontal" form={formRef}>
      <FormItem label="用户名" {...formItemLayout} >
          {
          type === 'detail' ? userInfo.username : <FormItem name="user_name" initialValue={userInfo.username}>
            <Input  type="text" placeholder="请输入用户名"/>
              </FormItem>
          }
      </FormItem>
      <FormItem label="性别" {...formItemLayout}>
          {
          type === 'detail' ? userInfo.sex === 1 ? '男' : '女' : <FormItem name="user_sex" initialValue={userInfo.sex}>
            <RadioGroup>
              <Radio value={1}>男</Radio>
              <Radio value={2}>女</Radio>
            </RadioGroup>
              </FormItem>
          }
      </FormItem>
      <FormItem label="状态" {...formItemLayout}>
          {
          type === 'detail' ? getState(userInfo.state) : <FormItem name="state" initialValue={userInfo.state}>
            <Select>
              <Option value={1}>咸鱼一条</Option>
              <Option value={2}>风华浪子</Option>
              <Option value={3}>北大才子一枚</Option>
              <Option value={4}>百度FE</Option>
              <Option value={5}>创业者</Option>
            </Select>
              </FormItem>
          }
      </FormItem>
      <FormItem label="生日" {...formItemLayout}>
          {
          type === 'detail' ? userInfo.birthday : <FormItem name="birthday" initialValue={moment(userInfo.birthday)}>
            <DatePicker />
              </FormItem>       
          }
      </FormItem>
      <FormItem label="联系地址" {...formItemLayout}>
          {
          type === 'detail' ? userInfo.address : <FormItem name="address" initialValue={userInfo.address}>
            <TextArea rows={3} placeholder="请输入联系地址"/>
              </FormItem>
          }
      </FormItem>
  </Form>
  )
}

export default forwardRef(UserForm)
