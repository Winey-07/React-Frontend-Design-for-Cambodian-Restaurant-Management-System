import { Flex, Space, Table, Tag } from 'antd';

function OrderPage() {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <a href={`#${id}`}>{id}</a>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Table Number',
      dataIndex: 'tableNumber',
      key: 'tableNumber',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status = []) => (
        <Flex gap="small" align="center" wrap>
          {status.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'pending') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </Flex>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={()=>onViewDetail(record.id)}>View</a>
          <a href={`#edit-${record.id}`}>Edit</a>
          <a href={`#delete-${record.id}`}>Delete</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      id: 'ORD-001',
      date: '2026-03-30',
      tableNumber: 'Table 5',
      totalAmount: '$45.00',
      status: ['completed'],
    },
    {
      key: '2',
      id: 'ORD-002',
      date: '2026-03-31',
      tableNumber: 'Table 12',
      totalAmount: '$120.50',
      status: ['pending'],
    },
    {
      key: '3',
      id: 'ORD-003',
      date: '2026-03-31',
      tableNumber: 'Table 2',
      totalAmount: '$32.00',
      status: ['in-progress'],
    },
  ];

  return <Table columns={columns} dataSource={data} />;
}

export default OrderPage;