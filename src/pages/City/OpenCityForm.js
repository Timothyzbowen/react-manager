import React, { useState, useRef } from 'react'
import { Form, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const OpenCityForm = (props) => {
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 }
  }
  const openCityFormRef = useRef(null)

  const [cityInfo, setCityInfo] = useState(null)
  const handleChange = () => {
    setCityInfo(openCityFormRef.current.getFieldsValue())
    props.getForm(cityInfo)
  }
  return (
      <Form layout="horizontal" ref={openCityFormRef} >
        <FormItem label="选择城市" {...formItemLayout}>
          <FormItem name="city_id">
          <Select
            onChange={handleChange}
              style={{width:100}}
              placeholder="全部"
            >
              <Option value="">全部</Option>
              <Option value="1">北京市</Option>
              <Option value="2">天津市</Option>
              <Option value="3">深圳市</Option>
            </Select>
          </FormItem>
        </FormItem>
        <FormItem label="营运模式" {...formItemLayout}>
          <FormItem name="op_mode">
            <Select
              style={{ width: 80 }}
              placeholder="全部"
            >
              <Option value="">全部</Option>
              <Option value="1">自营</Option>
              <Option value="2">加盟</Option>
            </Select>
          </FormItem>
        </FormItem>
        <FormItem label="用车模式" {...formItemLayout}>
          <FormItem name="mode">
            <Select
              style={{ width: 120 }}
              placeholder="全部"
            >
              <Option value="">全部</Option>
              <Option value="1">指定停车点模式</Option>
              <Option value="2">禁停区模式</Option>
            </Select>
          </FormItem>
        </FormItem>
    </Form>
  )
}

export default OpenCityForm
