/**
 * 文件上传模块配置
 * 用户可在此修改子文件夹名和 API 端点
 */

// 服务器基础地址
export const API_BASE_URL = 'https://saudi.damons.sa';

// 上传模块配置：key 为模块标识，label 为页面显示名称，folder 为服务器子文件夹名
export const UPLOAD_MODULES = [
  { key: 'home', label: '首页', folder: 'home' },
  { key: 'factory', label: '工厂', folder: 'factory' },
  { key: 'eg', label: '工程案例', folder: 'eg' },
  { key: 'logo', label: '公司logo', folder: 'logo' },
  { key: 'certificates', label: '证书', folder: 'certificates' },
  { key: 'services', label: '我们的服务', folder: 'services' },
  { key: 'products', label: '产品', folder: 'products' },
];

// API 端点配置
export const API_ENDPOINTS = {
  // 权限校验：POST { password }
  checkAuth: '/saudi-server/checkAuth',
  // 上传文件：POST multipart/form-data（formData 中需包含 path 和 file）
  upload: () => '/saudi-server/files/upload',
  // 获取文件列表：POST body { path }
  list: () => '/saudi-server/files/list',
  // 删除文件：POST body { path, filename }
  delete: () => '/saudi-server/files/delete',
};
