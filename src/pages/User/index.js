import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  Button,
  Modal,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "../../axios";
import Utils from "../../utils/utils";
import BaseForm from "../../components/BaseForm";
import ETable from "../../components/ETable";
import UserForm from "./userform";
const User = () => {
  const [list, setList] = useState([]);
  const [pagination, setPagination] = useState({});
  const [title, setTitle] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [operateType, setOperateType] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const userInfoRef = useRef(null);
  let params = {
    page: 1,
  };
  const formList = [
    {
      type: "INPUT",
      label: "用户名",
      field: "user_name",
      placeholder: "请输入用户名称",
      width: 130,
    },
    {
      type: "INPUT",
      label: "用户手机号",
      field: "user_mobile",
      placeholder: "请输入用户手机号",
      width: 140,
    },
    {
      type: "DATE",
      label: "请选择入职日期",
      field: "user_date",
      placeholder: "请输入日期",
    },
  ];
  useEffect(() => {
    getList();
  }, []);
  const getList = () => {
    axios.getList("/user/list", params, true, setList, setPagination);
  };
  const handleFilter = (param) => {
    params = param;
    axios.getList("/user/list", params, true, setList, setPagination);
  };
  //功能区操作
  const hanleOperate = (type) => {
    setOperateType(type);
    console.log(userInfo);
    let item = userInfo.selectedItem;
    if (type === "create") {
      item = {};
      setOperateType("create");
      setIsVisible(true);
      setTitle("创建员工");
    } else if (type === "edit") {
      if (!item) {
        Modal.info({
          title: "提示",
          content: "请选择一个用户",
        });
        return;
      }
      setOperateType("edit");
      setIsVisible(true);
      setTitle("编辑员工");
    } else if (type === "detail") {
      if (!item) {
        Modal.info({
          title: "提示",
          content: "请选择一个用户",
        });
        return;
      }
      setOperateType("detail");
      setIsVisible(true);
      setTitle("员工详情");
    } else {
      if (!item) {
        Modal.info({
          title: "提示",
          content: "请选择一个用户",
        });
        return;
      }
      Modal.confirm({
        title: "确认删除",
        content: "是否要删除当前选中的员工",
        onOk() {
          axios
            .ajax({
              url: "/user/delete",
              data: {
                params: {
                  id: item.id,
                },
              },
            })
            .then((res) => {
              if (res.code === 0) {
                setIsVisible(false);
                getList();
              }
            });
        },
      });
    }
  };
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      align: "center",
    },
    {
      title: "用户名",
      dataIndex: "username",
      align: "center",
    },
    {
      title: "性别",
      dataIndex: "sex",
      align: "center",
      render(sex) {
        return sex === 1 ? "男" : "女";
      },
    },
    {
      title: "状态",
      dataIndex: "state",
      align: "center",
      render(state) {
        return {
          1: "咸鱼一条",
          2: "风华浪子",
          3: "北大才子一枚",
          4: "百度FE",
          5: "创业者",
        }[state];
      },
    },
    {
      title: "爱好",
      dataIndex: "interest",
      align: "center",
      render(interest) {
        return {
          1: "游泳",
          2: "打篮球",
          3: "踢足球",
          4: "跑步",
          5: "爬山",
          6: "骑行",
          7: "桌球",
          8: "麦霸",
        }[interest];
      },
    },
    {
      title: "生日",
      dataIndex: "birthday",
      align: "center",
    },
    {
      title: "联系地址",
      dataIndex: "address",
      align: "center",
    },
    {
      title: "早起时间",
      dataIndex: "time",
      align: "center",
    },
  ];
  // 创建员工提交
  const handleSubmit = () => {
    let type = operateType;
    let data = userInfoRef.current.getData();
    console.log(data);
    axios
      .ajax({
        url: type === "create" ? "/user/add" : "/user/edit",
        data: {
          params: data,
        },
      })
      .then((res) => {
        if (res.code === 0) {
          userInfoRef.current.resetData();
          setIsVisible(false);
          getList();
        }
      });
  };
  let footer = {};
  if (operateType === "detail") {
    footer = {
      footer: null,
    };
  }

  return (
    <div>
      <Card>
        <BaseForm formList={formList} filterSubmit={handleFilter} />
      </Card>
      <Card style={{ marginTop: 10 }} className="operate-wrap">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => hanleOperate("create")}
        >
          创建员工
        </Button>
        <Button icon={<EditOutlined />} onClick={() => hanleOperate("edit")}>
          编辑员工
        </Button>
        <Button onClick={() => hanleOperate("detail")}>员工详情</Button>
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => hanleOperate("delete")}
        >
          删除员工
        </Button>
      </Card>
      <div className="content-wrap">
        <ETable
          updateSelectedItem={Utils.updateSelectedItem}
          columns={columns}
          dataSource={list}
          selectedRowKeys={userInfo.selectedRowKeys}
          selectedItem={userInfo.selectedItem}
          pagination={pagination}
          setInfo={setUserInfo}
        />
      </div>
      <Modal
        destroyOnClose
        title={title}
        visible={isVisible}
        onOk={handleSubmit}
        onCancel={() => {
          userInfoRef.current.resetData();
          setIsVisible(false);
        }}
        width={600}
        {...footer}
      >
        <UserForm type={operateType} userInfo={userInfo} ref={userInfoRef} />
      </Modal>
    </div>
  );
};

export default User;
