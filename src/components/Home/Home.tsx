import axios from "axios";
import type { CSSProperties } from "react";
import React from "react";
import { CaretRightOutlined, LoadingOutlined } from "@ant-design/icons";
import type { CollapseProps } from "antd";
import { Alert, Collapse, Spin, theme } from "antd";
import { User } from "../../utils/types";
import UserInfo from "./UserInfo/UserInfo";
import { useDispatch } from "react-redux";
import { add } from "../../store/usersSlice";

const getItems: (
  panelStyle: CSSProperties,
  users: User[] | undefined
) => CollapseProps["items"] = (panelStyle, users) => {
  return (
    users?.map((user) => {
      return {
        key: user.id.toString(),
        label: `${user.name} ( ${user.username} )`,
        style: panelStyle,
        children: <UserInfo user={user} />,
      };
    }) || []
  );
};

const Home = () => {
  const { token } = theme.useToken();
  const dispatch = useDispatch();
  const [users, seUsers] = React.useState<undefined | User[]>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setLoading(false);
        seUsers(response.data);
        dispatch(add(response.data));
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    };

    fetchUsers();
  }, []);

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  return (
    <div className='container'>
      {loading ? (
        <Spin
          className='spinner'
          indicator={<LoadingOutlined style={{ fontSize: 108 }} spin />}
        />
      ) : !error ? (
        <Collapse
          className='custom-collapse'
          bordered={false}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          style={{ background: token.colorBgContainer }}
          items={getItems(panelStyle, users)}
        />
      ) : (
        <Alert message='Retrieving users failed!' type='error' />
      )}
    </div>
  );
};

export default Home;
