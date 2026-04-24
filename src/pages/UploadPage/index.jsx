import { useState, useEffect, useCallback } from 'react';
import { Tabs, Upload, Button, List, message, Spin, Popconfirm } from 'antd';
import { UploadOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { UPLOAD_MODULES, API_BASE_URL, API_ENDPOINTS } from '../../config/uploadModules';
import './index.less';

const { TabPane } = Tabs;

/* eslint-disable react/prop-types */
const ModuleUploadManager = ({ module }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

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
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
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
    </div>
  );
};

const UploadPage = () => {
  return (
    <div className="upload-page">
      <div className="container">
        <h1 className="section-title">文件管理</h1>
        <Tabs defaultActiveKey={UPLOAD_MODULES[0]?.key} type="card" className="upload-tabs">
          {UPLOAD_MODULES.map((module) => (
            <TabPane tab={module.label} key={module.key}>
              <ModuleUploadManager module={module} />
            </TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default UploadPage;
