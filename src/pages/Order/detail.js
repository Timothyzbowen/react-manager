import React, { useEffect, useState} from 'react'
import { Card } from 'antd'
import axios from '../../axios'
import './detail.less'
const OrderDetail = (props) => {
  const [orderInfo, setOrderInfo] = useState({})
  const getDetailInfo = (orderId)=>{
    axios.ajax({
      url:'/order/detail',
      data:{
        params:{
          orderId: orderId
        }
      }
    }).then((res)=>{
      if (res.code === 0) {
        setOrderInfo(res.result)
        renderMap(res.result);
      }
    })
  }
  useEffect(() => {
    let orderId = props.match.params.orderId;
    if(orderId){
      getDetailInfo(orderId);
    }
  },[])
  const info = orderInfo || {};
  let amap;
  const renderMap = (result) => {
    amap = new window.BMapGL.Map('orderDetailMap');
    // 添加地图控件
    addMapControl();
    // 调用路线图绘制方法
    drawBikeRoute(result.position_list);
    // 调用服务区绘制方法
    drwaServiceArea(result.area);
  }
  // 添加地图控件
  const addMapControl = ()=>{
    let map = amap;
    map.addControl(new window.BMapGL.ScaleControl({ anchor: window.BMapGL_ANCHOR_TOP_RIGHT}));
    map.addControl(new window.BMapGL.ZoomControl({ anchor: window.BMapGL_ANCHOR_TOP_RIGHT }));
    map.enableScrollWheelZoom(true);
}

// 绘制用户的行驶路线
const drawBikeRoute = (positionList)=>{
  let map = amap;
  let startPoint = '';
  let endPoint = '';
  if (positionList.length>0){
    let first = positionList[0];
    let last = positionList[positionList.length-1];
    startPoint = new window.BMapGL.Point(first.lon,first.lat);
    let startIcon = new window.BMapGL.Icon('/assets/start_point.png',new window.BMapGL.Size(36,42),{
        imageSize:new window.BMapGL.Size(36,42),
        anchor: new window.BMapGL.Size(18, 42)
    })

    let startMarker = new window.BMapGL.Marker(startPoint, { icon: startIcon});
    map.addOverlay(startMarker);

    endPoint = new window.BMapGL.Point(last.lon, last.lat);
    let endIcon = new window.BMapGL.Icon('/assets/end_point.png', new window.BMapGL.Size(36, 42), {
        imageSize: new window.BMapGL.Size(36, 42),
        anchor: new window.BMapGL.Size(18, 42)
    })
    let endMarker = new window.BMapGL.Marker(endPoint, { icon: endIcon });
    map.addOverlay(endMarker);

    // 连接路线图
    let trackPoint = [];
    for(let i=0;i<positionList.length;i++){
        let point = positionList[i];
        trackPoint.push(new window.BMapGL.Point(point.lon, point.lat));
    }

    let polyline = new window.BMapGL.Polyline(trackPoint,{
        strokeColor:'#1869AD',
        strokeWeight:3,
        strokeOpacity:1
    })
    map.addOverlay(polyline);
    map.centerAndZoom(endPoint, 11);
  }  
}

// 绘制服务区
  const drwaServiceArea = (positionList)=>{
    // 连接路线图
    let trackPoint = [];
    for (let i = 0; i < positionList.length; i++) {
        let point = positionList[i];
        trackPoint.push(new window.BMapGL.Point(point.lon, point.lat));
    }
    // 绘制服务区
    let polygon = new window.BMapGL.Polygon(trackPoint, {
        strokeColor: '#CE0000',
        strokeWeight: 4,
        strokeOpacity: 1,
        fillColor: '#ff8605',
        fillOpacity:0.4
    })
    amap.addOverlay(polygon);
  }
  return (
    <div>
      <Card>
        <div id="orderDetailMap" className="order-map"></div>
        <div className="detail-items">
          <div className="item-title">基础信息</div>
        <ul className="detail-form">
          <li>
            <div className="detail-form-left">用车模式</div>
            <div className="detail-form-content">{info.mode === 1 ?'服务区':'停车点'}</div>
          </li>
          <li>
            <div className="detail-form-left">订单编号</div>
            <div className="detail-form-content">{info.order_sn}</div>
          </li>
          <li>
            <div className="detail-form-left">车辆编号</div>
            <div className="detail-form-content">{info.bike_sn}</div>
          </li>
          <li>
            <div className="detail-form-left">用户姓名</div>
            <div className="detail-form-content">{info.user_name}</div>
          </li>
          <li>
            <div className="detail-form-left">手机号码</div>
            <div className="detail-form-content">{info.mobile}</div>
          </li>
        </ul>
        </div>
        <div className="detail-items">
            <div className="item-title">行驶轨迹</div>
            <ul className="detail-form">
                <li>
                    <div className="detail-form-left">行程起点</div>
                    <div className="detail-form-content">{info.start_location}</div>
                </li>
                <li>
                    <div className="detail-form-left">行程终点</div>
                    <div className="detail-form-content">{info.end_location}</div>
                </li>
                <li>
                    <div className="detail-form-left">行驶里程</div>
                    <div className="detail-form-content">{info.distance/1000}公里</div>
                </li>
            </ul>
        </div>
      </Card>
    </div>
  )
}

export default OrderDetail
