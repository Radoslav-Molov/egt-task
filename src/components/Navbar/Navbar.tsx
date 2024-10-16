import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: "Home",
    key: "mail",
    icon: <HomeOutlined />,
  },
];

const Navbar = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/");
  };

  return <Menu id='navbar' onClick={onClick} mode='horizontal' items={items} />;
};

export default Navbar;
