
import { Menu } from "antd"


interface ListItem {
  id: number;
  name: string;
}

interface ListProps {
  items: ListItem[];
}


function FinalMenu({ items }: ListProps) {
  return (
    <div>
      <Menu className="menu-bar-id" theme="dark" mode="inline">
        {items.map(item => (
          <Menu.Item key={item.id}>
            <a href="index.html"
              style={{ textDecoration: "none", alignItems: "center" }}>
              {item.name}</a>
          </Menu.Item>))}
      </Menu>
    </div>


  );
}

export default FinalMenu;