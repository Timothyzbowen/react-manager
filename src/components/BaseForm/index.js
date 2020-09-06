import React,{ useRef} from 'react'
import { Input, Select, Form, Button, Checkbox, DatePicker} from 'antd'
import Utils from '../../utils/utils';
const FormItem = Form.Item;
function BaseForm(props) {
  const initFormList = ()=>{
    const formList = props.formList;
    const formItemList = [];
    if (formList && formList.length>0){
      formList.forEach((item,i)=>{
        let label = item.label;
        let field = item.field;
        let initialValue = item.initialValue || '';
        let placeholder = item.placeholder;
        let width = item.width;
        if (item.type === '时间查询'){
          const begin_time = <FormItem label="订单时间" key={field+'start'} name="begin_time">
            <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss"/>
          </FormItem>;
            formItemList.push(begin_time)
          const end_time = <FormItem label="~" colon={false} key={field+'end'} name="end_time">
            <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" /> 
          </FormItem>;
            formItemList.push(end_time)
        }else if(item.type === 'INPUT'){
          const INPUT = <FormItem label={label} key={field} name={field} initialValue={initialValue}>
            <Input type="text" placeholder={placeholder} />
          </FormItem>;
            formItemList.push(INPUT)
        } else if (item.type === 'SELECT') {
            const SELECT = <FormItem label={label} key={field} name={field} initialValue={initialValue}>
              <Select
                style={{ width: width }}
                placeholder={placeholder}
              >
                {Utils.getOptionList(item.list)}
              </Select>
            </FormItem>;
            formItemList.push(SELECT)
        } else if (item.type === 'CHECKBOX') {
            const CHECKBOX = <FormItem label={label} key={field} valuePropName='checked' initialValue={initialValue}>
              <Checkbox>
                  {label}
              </Checkbox>
            </FormItem>;
            formItemList.push(CHECKBOX)
        }else if (item.type === 'DATE') {
          const Date = <FormItem label={label} key={field} valuePropName='checked' name="offer_time">
            <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
          </FormItem>;
          formItemList.push(Date)
      }
      })
    }
    return formItemList;
  }
  const handleFilterSubmit = () => {
    let fieldsValue = formRef.current.getFieldsValue();
    props.filterSubmit(fieldsValue);
  }
  const reset = ()=>{
    formRef.current.resetFields();
  }
  const formRef = useRef(null)
  return (
    <Form layout="inline" ref={formRef}>
      { initFormList() }
      <FormItem>
        <Button type="primary" style={{ margin: '0 20px' }} onClick={handleFilterSubmit}>查询</Button>
        <Button onClick={reset} >重置</Button>
      </FormItem>
    </Form>
  )
}

export default BaseForm
