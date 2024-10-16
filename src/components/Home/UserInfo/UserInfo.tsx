import React from "react";
import { User } from "../../../utils/types";
import { Card, Button, Col, Row } from "antd";
import { CommentOutlined, EditOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import EditModal from "../../EditModal/EditModal";
import { useLocation, useNavigate } from "react-router-dom";

interface UserInfoProps {
  user: User;
}

function UserInfo(props: UserInfoProps) {
  const { user } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const [modalOpenFlag, setModalOpenFlag] = React.useState(false);

  const setModalFlag = () => {
    setModalOpenFlag(!modalOpenFlag);
  };

  const handlePostsClick = () => {
    navigate(`/posts/${user.id}`);
  };

  const handleEditClick = () => {
    setModalOpenFlag(true);
  };

  const isPostsPage = location.pathname.includes("posts");

  return (
    <>
      <Card
        className='user-card'
        hoverable
        style={{ maxWidth: 900, margin: "20px auto" }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Title level={5}>Personal Info</Title>
            <Text strong>Email:</Text> <Text>{user.email}</Text> <br />
            <Text strong>Phone:</Text> <Text>{user.phone}</Text> <br />
            <div className='button-group'>
              {!isPostsPage && (
                <Button
                  type='primary'
                  icon={<CommentOutlined />}
                  onClick={handlePostsClick}
                >
                  See posts
                </Button>
              )}
              <Button
                type='default'
                icon={<EditOutlined />}
                onClick={handleEditClick}
              >
                Edit Information
              </Button>
            </div>
          </Col>

          <Col xs={24} sm={8}>
            <Title level={5}>Address</Title>
            <Text>
              {user.address.street}, {user.address.suite}
            </Text>{" "}
            <br />
            <Text>
              {user.address.city}, {user.address.zipcode}
            </Text>
          </Col>

          <Col xs={24} sm={8}>
            <Title level={5}>Company</Title>
            <Text strong>Name:</Text> <Text>{user.company.name}</Text> <br />
            <Text strong>Catch Phrase:</Text>{" "}
            <Text>{user.company.catchPhrase}</Text> <br />
            <Text strong>Business:</Text> <Text>{user.company.bs}</Text>
          </Col>
        </Row>
      </Card>
      <EditModal
        user={user}
        setModalFlag={setModalFlag}
        modalOpenFlag={modalOpenFlag}
      />
    </>
  );
}

export default UserInfo;
