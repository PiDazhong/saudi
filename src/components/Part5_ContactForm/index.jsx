import React from 'react';
import { Form, Input, Button, message } from 'antd';
import './index.less';

const { TextArea } = Input;

const Part5ContactForm = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log('Form data:', values);
    message.success('Thank you! We will contact you soon.');
    form.resetFields();
  };

  return (
    <section id="contact-form" className="part5-contact">
      <div className="contact-container">
        <h2 className="contact-title">Contact Us</h2>

        {/* Form */}
        <div className="contact-form-wrapper">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="contact-form"
          >
            <div className="form-row">
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
            </div>

            <div className="form-row">
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
            </div>

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
    </section>
  );
};

export default Part5ContactForm;
