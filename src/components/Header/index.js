import React, { useState, useEffect } from 'react'
import { Row,Col } from "antd"
import './index.less'
import Util from '../../utils/utils'
import { connect } from 'react-redux'
const mapStateToProps = state => {
	return {
		menuName:state.menuName
	}
}
const Header = (props) => {
  const [userName, setUserName] = useState('张博文')
	const [sysTime, setSysTime] = useState(Util.formateDate(new Date().getTime()))
	
	const { menuName, menuType } = props;
  useEffect(() => {
    let timer = setInterval(() => {
      let sysTime = Util.formateDate(new Date().getTime());
      setSysTime(sysTime)
    }, 1000);
    return () => {
      clearInterval(timer)
    }
  })
  return (
    <div className="header">
			<Row className="header-top">
				{
					menuType?
						<Col span="6" className="logo">
							<img src="/assets/logo-ant.svg" alt=""/>
							<span>IMooc 通用管理系统</span>
						</Col>:''
				}
				<Col span={menuType?18:24}>
					<span>欢迎，{userName}</span>
					<a href="#">退出</a>
				</Col>
			</Row>
			{
				menuType?'':
					<Row className="breadcrumb">
						<Col span="4" className="breadcrumb-title">
							{menuName || '首页'}
						</Col>
						<Col span="20" className="weather">
							<span className="date">{sysTime}</span>
						</Col>
					</Row>
			}
			</div>
  )
}

export default connect(mapStateToProps)(Header)
