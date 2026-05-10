import { useState, useEffect, useCallback, useMemo } from 'react';
import { Table, Button, message } from 'antd';
import { API_BASE_URL } from '../../config/uploadModules';
import Abbr from '../../components/Abbr';

const LogTableList = ({ dataList = [] }) => {
  const [blackIps, setBlackIps] = useState([]);
  const [loadingIp, setLoadingIp] = useState(null);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const sortedData = useMemo(() => {
    return [...dataList].sort((a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
  }, [dataList]);

  // 查询 black_ips 码表
  useEffect(() => {
    fetch(`${API_BASE_URL}/saudi-server/codeTable/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ codes: ['black_ips'] }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.code === 1 && Array.isArray(data.data)) {
          const item = data.data.find((d) => d.code === 'black_ips');
          if (item && item.value) {
            try {
              const parsed = JSON.parse(item.value);
              setBlackIps(Array.isArray(parsed) ? parsed : []);
            } catch {
              setBlackIps([]);
            }
          } else {
            setBlackIps([]);
          }
        }
      })
      .catch(() => {});
  }, []);

  const handleBanIp = useCallback(
    async (ip) => {
      if (blackIps.includes(ip)) return;

      setLoadingIp(ip);
      const newBlackIps = [...blackIps, ip];
      try {
        const res = await fetch(`${API_BASE_URL}/saudi-server/codeTable/save`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: [
              {
                code: 'black_ips',
                value: JSON.stringify(newBlackIps),
                sort: 0,
              },
            ],
          }),
        });
        const data = await res.json();
        if (!res.ok || !data.success || data.code !== 1) {
          throw new Error(data.message || '保存失败');
        }
        message.success('禁用成功');
        setBlackIps(newBlackIps);
      } catch (err) {
        message.error(`禁用失败: ${err.message}`);
      } finally {
        setLoadingIp(null);
      }
    },
    [blackIps]
  );

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name', fixed: 'left', width: 100 },
    { title: 'Company', dataIndex: 'company', key: 'company', fixed: 'left', width: 140 },
    { title: 'Phone', dataIndex: 'phone', key: 'phone', fixed: 'left', width: 130 },
    { title: 'IP', dataIndex: 'ip', key: 'ip', width: 120 },
    { title: 'Email', dataIndex: 'email', key: 'email', width: 180 },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      width: 280,
      render: (msg) => <Abbr text={msg} />
    },
    {
      title: 'Device',
      dataIndex: 'device',
      key: 'device',
      width: 140,
      render: (device) => <Abbr text={device} />,
    },
    { title: 'Timestamp', dataIndex: 'timestamp', key: 'timestamp', fixed: 'right', width: 160 },
    {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: (_, record) => {
        if (blackIps.includes(record.ip)) {
          return <span style={{ color: '#ff4d4f' }}>被禁用</span>;
        }
        return (
          <Button
            type="link"
            danger
            loading={loadingIp === record.ip}
            onClick={() => handleBanIp(record.ip)}
          >
            禁用
          </Button>
        );
      },
    },
  ];

  return (
    <div className="log-table-list">
      <Table
        columns={columns}
        dataSource={sortedData}
        rowKey={(record, index) =>
          `${record.ip || ''}-${record.timestamp || ''}-${index}`
        }
        pagination={{
          ...pagination,
          total: dataList.length,
          showSizeChanger: true,
          pageSizeOptions: [10, 20, 50],
          onChange: (page, pageSize) =>
            setPagination({ current: page, pageSize }),
        }}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default LogTableList;
