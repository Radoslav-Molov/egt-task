import React from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Typography,
  Row,
  Col,
  message,
} from "antd";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";
import { User } from "../../utils/types";
import axios from "axios";

const { Title } = Typography;

const validationSchema = Yup.object({
  name: Yup.string(),
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string(),
  address: Yup.object({
    street: Yup.string().required("Street is required"),
    suite: Yup.string().required("Suite is required"),
    city: Yup.string().required("City is required"),
    zipcode: Yup.string(),
    geo: Yup.object({
      lat: Yup.string(),
      lng: Yup.string(),
    }),
  }),
  company: Yup.object({
    name: Yup.string(),
    catchPhrase: Yup.string(),
    bs: Yup.string(),
  }),
});

interface EditModalProps {
  user: User;
  setModalFlag: () => void;
  modalOpenFlag: boolean;
}

const EditModal = (props: EditModalProps) => {
  const onSubmit = async (values: any) => {
    try {
      await axios.put(
        `https://jsonplaceholder.typicode.com/users/${values.id}`,
        values
      );
      message.success("Form submitted successfully!");
    } catch (error) {
      message.error("Edit was not successful");
    }
  };

  return (
    <>
      <Modal
        title='Edit Information'
        centered
        open={props.modalOpenFlag}
        footer={null}
        onCancel={props.setModalFlag}
      >
        <Formik
          initialValues={props.user}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, resetForm, dirty }) => (
            <Form
              layout='vertical'
              onFinish={handleSubmit}
              style={{ maxWidth: 800, margin: "0 auto" }}
            >
              <Title level={4}>Personal Information</Title>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label='Name'>
                    <Field name='name' as={Input} placeholder='Name' />
                    <ErrorMessage
                      name='name'
                      component='div'
                      className='ant-form-item-explain-error'
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='Username'>
                    <Field name='username' as={Input} placeholder='Username' />
                    <ErrorMessage
                      name='username'
                      component='div'
                      className='ant-form-item-explain-error'
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label='Email'>
                    <Field name='email' as={Input} placeholder='Email' />
                    <ErrorMessage
                      name='email'
                      component='div'
                      className='ant-form-item-explain-error'
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='Phone'>
                    <Field name='phone' as={Input} placeholder='Phone' />
                    <ErrorMessage
                      name='phone'
                      component='div'
                      className='ant-form-item-explain-error'
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Title level={4}>Address Information</Title>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label='Street'>
                    <Field
                      name='address.street'
                      as={Input}
                      placeholder='Street'
                    />
                    <ErrorMessage
                      name='address.street'
                      component='div'
                      className='ant-form-item-explain-error'
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='Suite'>
                    <Field
                      name='address.suite'
                      as={Input}
                      placeholder='Suite'
                    />
                    <ErrorMessage
                      name='address.suite'
                      component='div'
                      className='ant-form-item-explain-error'
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label='City'>
                    <Field name='address.city' as={Input} placeholder='City' />
                    <ErrorMessage
                      name='address.city'
                      component='div'
                      className='ant-form-item-explain-error'
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='Zipcode'>
                    <Field
                      name='address.zipcode'
                      as={Input}
                      placeholder='Zipcode'
                    />
                    <ErrorMessage
                      name='address.zipcode'
                      component='div'
                      className='ant-form-item-explain-error'
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label='Latitude'>
                    <Field
                      name='address.geo.lat'
                      as={Input}
                      placeholder='Latitude'
                    />
                    <ErrorMessage
                      name='address.geo.lat'
                      component='div'
                      className='ant-form-item-explain-error'
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='Longitude'>
                    <Field
                      name='address.geo.lng'
                      as={Input}
                      placeholder='Longitude'
                    />
                    <ErrorMessage
                      name='address.geo.lng'
                      component='div'
                      className='ant-form-item-explain-error'
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Title level={4}>Company Information</Title>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label='Company Name'>
                    <Field
                      name='company.name'
                      as={Input}
                      placeholder='Company Name'
                    />
                    <ErrorMessage
                      name='company.name'
                      component='div'
                      className='ant-form-item-explain-error'
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='Catch Phrase'>
                    <Field
                      name='company.catchPhrase'
                      as={Input}
                      placeholder='Catch Phrase'
                    />
                    <ErrorMessage
                      name='company.catchPhrase'
                      component='div'
                      className='ant-form-item-explain-error'
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label='Business'>
                <Field name='company.bs' as={Input} placeholder='Business' />
                <ErrorMessage
                  name='company.bs'
                  component='div'
                  className='ant-form-item-explain-error'
                />
              </Form.Item>

              <Form.Item>
                <Row justify='end' gutter={16}>
                  <Col>
                    <Button onClick={() => resetForm()} disabled={!dirty}>
                      Reset
                    </Button>
                  </Col>
                  <Col>
                    <Button disabled={!dirty} type='primary' htmlType='submit'>
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default EditModal;
