import React from "react";
import { Card, Row, Col, Spin, Alert, Typography } from "antd";
import UserInfo from "../Home/UserInfo/UserInfo";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Post, ReduxState } from "../../utils/types";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

function UserPosts() {
  const location = useLocation();
  const userId = location.pathname.split("/").pop();
  const [posts, sePosts] = React.useState<undefined | Post[]>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const usersState = useSelector(
    (state: ReduxState) => state.users.usersResponse
  );
  const currentUser = usersState.find((user) => user.id === Number(userId));

  React.useEffect(() => {
    const fetchUserPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
        );
        setLoading(false);
        sePosts(response.data);
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    };

    fetchUserPosts();
  }, []);

  return (
    <>
      {!loading && currentUser ? (
        <div className='app-container'>
          <Typography.Title level={2} style={{ margin: 0 }}>
            {currentUser.name}
          </Typography.Title>
          <Row gutter={[16, 16]}>
            <UserInfo user={currentUser} />
          </Row>

          <h1 className='posts-title'>Posts</h1>
          {!error ? (
            <Row gutter={[16, 16]} justify='center'>
              {posts?.map((post) => (
                <Col
                  span={6}
                  key={post.id}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Card
                    title={post.title}
                    bordered={true}
                    style={{ width: "100%", minHeight: "150px" }}
                  >
                    <p>{post.body}</p>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <Alert message='Retrieving posts failed!' type='error' />
          )}
        </div>
      ) : (
        <Spin
          className='spinner'
          indicator={<LoadingOutlined style={{ fontSize: 108 }} spin />}
        />
      )}
    </>
  );
}

export default UserPosts;
