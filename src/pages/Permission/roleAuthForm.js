import React from 'react'
import { Form, Input, Transfer } from 'antd'
const FormItem = Form.Item;

const RoleAuthForm = (props) => {
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 }
  }
  const detail_info = props.detailInfo
  const filterOption = (inputValue, option) => {
    return option.title.indexOf(inputValue) > -1;
  }
  const handleChange = (targetKeys)=>{
    props.patchUserInfo(targetKeys);
  }
  return (
    <Form layout="horizontal">
      <FormItem label="角色名称" {...formItemLayout}>
        <Input disabled placeholder={detail_info.role_name} />
      </FormItem>
      <FormItem label="选择用户" {...formItemLayout}>
        <Transfer
          listStyle={{width:200,height:400}}
          dataSource={props.mockData}
          titles={['待选用户', '已选用户']}
          showSearch
          searchPlaceholder='输入用户名'
          filterOption={filterOption}
          targetKeys={props.targetKeys}
          onChange={handleChange}
          render={item => item.title}
        />
      </FormItem>
  </Form>
  )
}

export default RoleAuthForm
