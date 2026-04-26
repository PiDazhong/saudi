import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useTranslation } from '../../hooks/useTranslation';
import { writeLog, sendEmail } from '../../utils/log';
import './index.less';

const { TextArea } = Input;

const Part5ContactForm = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      await sendEmail(values);
      message.success(t('form.success'));
      writeLog('submit', values);
      form.resetFields();
    } catch {
      message.success(t('form.error'));
    }
  };

  return (
    <section id="contact-form" className="part5-contact">
      <div className="contact-container">
        <h2 className="contact-title">{t('contact.title')}</h2>

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
                label={t('form.name.label')}
                name="name"
                rules={[{ required: true, message: t('form.name.required') }]}
              >
                <Input placeholder={t('form.name.placeholder')} size="large" />
              </Form.Item>

              <Form.Item label={t('form.company.label')} name="company">
                <Input placeholder={t('form.company.placeholder')} size="large" />
              </Form.Item>
            </div>

            <div className="form-row">
              <Form.Item
                label={t('form.phone.label')}
                name="phone"
                rules={[{ required: true, message: t('form.phone.required') }]}
              >
                <Input placeholder={t('form.phone.placeholder')} size="large" />
              </Form.Item>

              <Form.Item
                label={t('form.email.label')}
                name="email"
                rules={[
                  { required: true, message: t('form.email.required') },
                  { type: 'email', message: t('form.email.invalid') },
                ]}
              >
                <Input placeholder={t('form.email.placeholder')} size="large" />
              </Form.Item>
            </div>

            <Form.Item
              label={t('form.message.label')}
              name="message"
              rules={[{ required: true, message: t('form.message.required') }]}
            >
              <TextArea
                placeholder={t('form.message.placeholder')}
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
                {t('form.submit')}
              </Button>
            </Form.Item>
          </Form>
        </div>

      </div>
    </section>
  );
};

export default Part5ContactForm;
