import { useState, useEffect, useCallback } from 'react';
import { Tabs, Upload, Button, List, message, Spin, Popconfirm, Modal, Card, Input } from 'antd';
import { UploadOutlined, DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { UPLOAD_MODULES, API_BASE_URL, API_ENDPOINTS } from '../../config/uploadModules';
import './index.less';

const { TabPane } = Tabs;

/* eslint-disable react/prop-types */
const ModuleUploadManager = ({ module }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.list()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/icons/' + module.folder }),
      });
      const data = await res.json();
      if (!res.ok || !data.success || data.code !== 1) {
        throw new Error(data.message || '获取文件列表失败');
      }
      const listData = data.data ?? [];
      setFiles(Array.isArray(listData) ? listData : []);
    } catch (err) {
      message.error(`获取文件列表失败: ${err.message}`);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  }, [module.folder]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleCustomRequest = async ({ file, onSuccess, onError }) => {
    const isDuplicate = files.some((item) => {
      const existingName = typeof item === 'string' ? item : (item.name || item.filename || '');
      return existingName === file.name;
    });

    if (isDuplicate) {
      message.error('图片名称重复');
      onError && onError(new Error('图片名称重复'));
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('path', '/icons/' + module.folder);
    formData.append('file', file);

    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.upload()}`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok || !data.success || data.code !== 1) {
        throw new Error(data.message || '上传失败');
      }
      message.success(`${file.name} 上传成功`);
      onSuccess && onSuccess();
      fetchFiles();
    } catch (err) {
      message.error(`${file.name} 上传失败: ${err.message}`);
      onError && onError(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (filename) => {
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.delete()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/icons/' + module.folder, filename }),
      });
      const data = await res.json();
      if (!res.ok || !data.success || data.code !== 1) {
        throw new Error(data.message || '删除失败');
      }
      message.success('文件已删除');
      fetchFiles();
    } catch (err) {
      message.error(`删除失败: ${err.message}`);
    }
  };

  const getFileUrl = (filename) => {
    return `${API_BASE_URL}/icons/${module.folder}/${filename}`;
  };

  return (
    <div className="module-upload-manager">
      <div className="upload-section">
        <Upload
          customRequest={handleCustomRequest}
          showUploadList={false}
          accept="image/*"
          multiple
        >
          <Button icon={<UploadOutlined />} loading={uploading} type="primary">
            上传图片
          </Button>
        </Upload>
        <span className="upload-tip">支持多选上传，仅接受图片文件</span>
      </div>

      <div className="file-list-section">
        <h3 className="section-subtitle">当前文件</h3>
        <Spin spinning={loading}>
          <List
            className="file-list"
            grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }}
            dataSource={files}
            locale={{ emptyText: '暂无文件' }}
            renderItem={(item) => {
              const filename = typeof item === 'string' ? item : item.name || item.filename;
              const url = typeof item === 'string' ? getFileUrl(item) : item.url || getFileUrl(item.filename || item.name);
              return (
                <List.Item>
                  <div className="file-card">
                    <div className="file-preview">
                      <img src={url} alt={filename} onError={(e) => { e.target.style.display = 'none'; }} />
                    </div>
                    <div className="file-info">
                      <span className="file-name" title={filename}>{filename}</span>
                      <div className="file-actions">
                        <Button
                          type="link"
                          size="small"
                          icon={<EyeOutlined />}
                          onClick={() => {
                            setPreviewUrl(url);
                            setPreviewVisible(true);
                          }}
                        >
                          预览
                        </Button>
                        <Popconfirm
                          title="确认删除"
                          description={`确定要删除 ${filename} 吗？`}
                          onConfirm={() => handleDelete(filename)}
                          okText="删除"
                          cancelText="取消"
                        >
                          <Button type="link" size="small" danger icon={<DeleteOutlined />}>
                            删除
                          </Button>
                        </Popconfirm>
                      </div>
                    </div>
                  </div>
                </List.Item>
              );
            }}
          />
        </Spin>
      </div>

      <Modal
        open={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        centered
        width="auto"
        styles={{ body: { padding: 0, background: 'transparent' } }}
        style={{ top: 20 }}
        closable={false}
        maskClosable
      >
        <img
          src={previewUrl}
          alt="preview"
          style={{ maxWidth: '100%', maxHeight: '80vh', display: 'block', borderRadius: 8 }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </Modal>
    </div>
  );
};

const CodeTableManager = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchList = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/saudi-server/codeTable/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codes: [] }),
      });
      const data = await res.json();
      if (!res.ok || !data.success || data.code !== 1) {
        throw new Error(data.message || '查询失败');
      }
      const arr = Array.isArray(data.data) ? data.data : [];
      arr.sort((a, b) => {
        const sa = a.sort === undefined || a.sort === null || a.sort === '' ? 0 : Number(a.sort);
        const sb = b.sort === undefined || b.sort === null || b.sort === '' ? 0 : Number(b.sort);
        if (Number.isNaN(sa)) return 1;
        if (Number.isNaN(sb)) return -1;
        return sa - sb;
      });
      setList(arr.map((item) => ({ ...item, key: item.code })));
    } catch (err) {
      message.error(`查询码表失败: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const handleAdd = () => {
    setList((prev) => [...prev, { sort: '', code: '', value: '', desc: '', key: Date.now() }]);
  };

  const handleChange = (index, field, value) => {
    setList((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleDelete = async (index) => {
    const item = list[index];
    if (item.code && item.code.trim()) {
      try {
        const res = await fetch(`${API_BASE_URL}/saudi-server/codeTable/delete`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: item.code.trim() }),
        });
        const data = await res.json();
        if (!res.ok || !data.success || data.code !== 1) {
          throw new Error(data.message || '删除失败');
        }
        message.success('删除成功');
      } catch (err) {
        message.error(`删除失败: ${err.message}`);
        return;
      }
    }
    setList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    const emptyCode = list.some((item) => !item.code || !item.code.trim());
    if (emptyCode) {
      message.error('Code 不能为空');
      return;
    }
    const codes = list.map((item) => item.code.trim());
    if (new Set(codes).size !== codes.length) {
      message.error('Code 不能重复');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`${API_BASE_URL}/saudi-server/codeTable/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: list.map((item) => ({
            sort: item.sort === '' || item.sort === undefined || item.sort === null ? undefined : Number(item.sort),
            code: item.code.trim(),
            value: (item.value || '').trim(),
            desc: (item.desc || '').trim(),
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success || data.code !== 1) {
        throw new Error(data.message || '保存失败');
      }
      message.success('保存成功');
      await fetchList();
    } catch (err) {
      message.error(`保存失败: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <div className="code-table-manager">
        <div className="code-table-header">
          <span className="code-table-col sort-col">Sort</span>
          <span className="code-table-col code-col">Code（必填）</span>
          <span className="code-table-col value-col">Value</span>
          <span className="code-table-col desc-col">Desc</span>
          <span className="code-table-col action-col">操作</span>
        </div>
        <div className="code-table-body">
          {list.map((item, index) => (
            <div className="code-table-row" key={item.key || item.code}>
              <div className="code-table-col sort-col">
                <Input
                  placeholder="Sort"
                  value={item.sort}
                  onChange={(e) => handleChange(index, 'sort', e.target.value)}
                />
              </div>
              <div className="code-table-col code-col">
                <Input
                  placeholder="请输入 Code"
                  value={item.code}
                  onChange={(e) => handleChange(index, 'code', e.target.value)}
                />
              </div>
              <div className="code-table-col value-col">
                <Input
                  placeholder="请输入 Value"
                  value={item.value}
                  onChange={(e) => handleChange(index, 'value', e.target.value)}
                />
              </div>
              <div className="code-table-col desc-col">
                <Input
                  placeholder="请输入 Desc"
                  value={item.desc}
                  onChange={(e) => handleChange(index, 'desc', e.target.value)}
                />
              </div>
              <div className="code-table-col action-col">
                <Button
                  type="link"
                  danger
                  onClick={() => handleDelete(index)}
                  icon={<DeleteOutlined />}
                >
                  删除
                </Button>
              </div>
            </div>
          ))}
          {list.length === 0 && (
            <div className="code-table-empty">暂无数据，请点击新增</div>
          )}
        </div>
        <div className="code-table-footer">
          <Button onClick={handleAdd}>
            新增
          </Button>
          <Button type="primary" loading={saving} onClick={handleSave}>
            保存
          </Button>
        </div>
      </div>
    </Spin>
  );
};

const UploadPage = () => {
  return (
    <div className="upload-page">
      <div className="container">
        <Card title="文件管理" className="upload-card">
          <Tabs defaultActiveKey={UPLOAD_MODULES[0]?.key} type="card" className="upload-tabs">
            {UPLOAD_MODULES.map((module) => (
              <TabPane tab={module.label} key={module.key}>
                <ModuleUploadManager module={module} />
              </TabPane>
            ))}
          </Tabs>
        </Card>

        <Card title="信息管理" className="upload-card">
          <CodeTableManager />
        </Card>
      </div>
    </div>
  );
};

export default UploadPage;
