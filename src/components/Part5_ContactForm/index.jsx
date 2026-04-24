import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons';
import './index.less';

const { TextArea } = Input;

const Part5ContactForm = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log('Form data:', values);
    message.success('Thank you! We will contact you soon.');
    form.resetFields();
  };

  const companyInfo = {
    name: 'WORKSPACE FURNITURE',
    description:
      'We are a leading Dubai-based manufacturer, designer and supplier of modern office furniture. Committed to providing workplace furniture that delivers great value by combining modern design, dependable quality and exceptional service.',
    phone: '+971 4 123 4567',
    email: 'info@workspace.ae',
    address: 'Dubai, United Arab Emirates',
  };

  return (
    <section id="contact-form" className="part5-contact">
      <div className="contact-container">
        <h2 className="contact-title">Contact Us</h2>
        <div className="contact-content">
          {/* Left: Company Info */}
          <div className="company-info">
            <h3 className="company-name">{companyInfo.name}</h3>
            <p className="company-description">{companyInfo.description}</p>
            <div className="contact-details">
              <div className="contact-item">
                <PhoneOutlined className="contact-icon" />
                <span>{companyInfo.phone}</span>
              </div>
              <div className="contact-item">
                <MailOutlined className="contact-icon" />
                <span>{companyInfo.email}</span>
              </div>
              <div className="contact-item">
                <EnvironmentOutlined className="contact-icon" />
                <span>{companyInfo.address}</span>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-form-wrapper">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              className="contact-form"
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input placeholder="Your name" size="large" />
              </Form.Item>

              <Form.Item label="Company" name="company">
                <Input placeholder="Your company (optional)" size="large" />
              </Form.Item>

              <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true, message: 'Please enter your phone' }]}
              >
                <Input placeholder="Your phone number" size="large" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
              >
                <Input placeholder="Your email" size="large" />
              </Form.Item>

              <Form.Item
                label="Message"
                name="message"
                rules={[{ required: true, message: 'Please describe your requirements' }]}
              >
                <TextArea
                  placeholder="Tell us about your project..."
                  rows={4}
                  size="large"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  className="submit-button"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Part5ContactForm;
