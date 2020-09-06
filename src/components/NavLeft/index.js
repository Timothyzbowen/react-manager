import React, {useState, useEffect} from 'react'
import MenuConfig from './../../config/menuConfig'
import { Menu} from 'antd';
import { connect } from 'react-redux'
import { switchMenu } from './../../redux/action'
import { NavLink } from 'react-router-dom'
import './index.less'
const NavLeft = (props) => {
  useEffect(() => {
    const menuTreeNode = renderMenu(MenuConfig);
      let currentKey = window.location.pathname;
      setState({
        currentKey,
        menuTreeNode
      })
  },[])
  const SubMenu = Menu.SubMenu;
  const [state, setState] = useState({})
  const handleClick = ({ item,key }) => {
    const { dispatch } = props;
    dispatch(switchMenu(item.props.title))
    setState({currentKey:key})
  }
  const renderMenu =(data)=>{
    return data.map((item)=>{
      if(item.children){
        return (
          <SubMenu title={item.title} key={item.key}>
            { renderMenu(item.children) }
          </SubMenu>
        )
      }
      return <Menu.Item title={item.title} key={item.key}>
        <NavLink to={item.key}>{item.title}</NavLink>
      </Menu.Item>
    })
  }
  return (
    <div>  
        <div className="logo">
          <img src="/assets/logo-ant.svg" alt=""/>
          <h1>Antd MS</h1>
        </div>
      <Menu
        selectedKeys={state.currentKey}
        onClick={handleClick}
        theme="dark"
      >
        { renderMenu(MenuConfig) }
      </Menu>
    </div>
  )
}

export default connect()(NavLeft)


