import { useState } from "react";
import { Layout, Button, theme } from "antd";
import FinalMenu from "./FinalMenu";
import MenuOutlined from '@ant-design/icons/MenuOutlined';
import FieldNumberOutlined from '@ant-design/icons/FieldNumberOutlined'
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import "../Css/FinalMenuCss.css"


const { Sider } = Layout;

export function Layoute() {
  const [collapsed, setCollapsed] = useState(false);
  const {
  } = theme.useToken();

  const items = [
    { id: 1, name: 'item', icon: FieldNumberOutlined },
    { id: 2, name: 'item' },
    { id: 3, name: 'item' }
  ];

  return (
    <Layout>
      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        className="sidebar"
      >
        <Button
          type="text"
          className="toggle"
          onClick={() => setCollapsed(!collapsed)}
          icon={collapsed ? <MenuOutlined style={{fontSize: '24px'}}/> : <CloseOutlined style={{fontSize: '24px'}}/>}
        />

        <FinalMenu items={collapsed ? [] : items} />
      </Sider>
      
    </Layout>
  );
}
