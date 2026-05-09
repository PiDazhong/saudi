import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useTranslation } from '../../hooks/useTranslation';
import { writeLog, sendEmail } from '../../utils/log';
import './index.less';

const { TextArea } = Input;

const RATE_LIMIT_KEY = 'contact_form_last_submit';
const COOLDOWN_MS = 10000;

const getRemainingCooldown = () => {
  const last = localStorage.getItem(RATE_LIMIT_KEY);
  if (!last) return 0;
  const elapsed = Date.now() - parseInt(last, 10);
  return Math.max(0, COOLDOWN_MS - elapsed);
};

const sanitizeString = (str) => {
  if (typeof str !== 'string') return str;
  return str.replace(/<[^>]*>/g, '');
};

const SPAM_KEYWORDS = ['test', 'spam', 'xxx', 'http', 'https', 'www.'];

const Part5ContactForm = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    let sanitizedValues = values;
    try {
      const remaining = getRemainingCooldown();
      if (remaining > 0) {
        const seconds = Math.ceil(remaining / 1000);
        message.warning(t('form.rateLimit').replace('{{seconds}}', seconds));
        return;
      }

      if (values.website) {
        return;
      }

      sanitizedValues = Object.fromEntries(
        Object.entries(values).map(([k, v]) => [
          k,
          typeof v === 'string' ? sanitizeString(v) : v,
        ])
      );

      const hasSpam = Object.values(sanitizedValues).some(
        (v) =>
          typeof v === 'string' &&
          SPAM_KEYWORDS.some((kw) => v.toLowerCase().includes(kw))
      );

      if (!hasSpam) {
        await sendEmail(sanitizedValues);
      }

      localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
      message.success(t('form.success'), 6);
      writeLog('submit', sanitizedValues);
      form.resetFields();
    } catch (err) {
      message.error(t('form.error'));
      writeLog('submit_error', {
        error: err?.message || String(err),
        values: sanitizedValues,
      });
    } finally {
      setSubmitting(false);
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
                <Input placeholder={t('form.name.placeholder')} size="large" maxLength={50} />
              </Form.Item>

              <Form.Item label={t('form.company.label')} name="company">
                <Input placeholder={t('form.company.placeholder')} size="large" maxLength={100} />
              </Form.Item>
            </div>

            <div className="form-row">
              <Form.Item
                label={t('form.phone.label')}
                name="phone"
                rules={[
                  { required: true, message: t('form.phone.required') },
                  { pattern: /^\+?\d+$/, message: t('form.phone.invalid') },
                ]}
              >
                <Input placeholder={t('form.phone.placeholder')} size="large" maxLength={20} />
              </Form.Item>

              <Form.Item
                label={t('form.email.label')}
                name="email"
                rules={[
                  { required: true, message: t('form.email.required') },
                  { type: 'email', message: t('form.email.invalid') },
                ]}
              >
                <Input placeholder={t('form.email.placeholder')} size="large" maxLength={100} />
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
                maxLength={500}
              />
            </Form.Item>

            <Form.Item name="website" className="honeypot-field">
              <Input autoComplete="off" tabIndex={-1} />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={submitting}
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
