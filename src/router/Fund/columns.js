const opts = function (opt) {
  const columns = [
    {
      title: '投资金额',
      key: 'amount'
    },
    {
      title: '创建时间',
      key: 'createTime'
    },
    {
      title: '更新时间',
      key: 'updateTime'
    },
    {
      title: '提现',
      key: 'type',
      filterMultiple: false,
      filters: [
        {value: 0, label: '充值'},
        {value: 1, label: '提现'}
      ],
      filterRemote: (valArr, type, cell) => opt.filterRemote(valArr[0], 'type')
    },
    {
      title: '资金状态',
      key: 'status',
      filterMultiple: false,
      filters: [
        {value: 0, label: '处理中'},
        {value: 1, label: '处理完成'},
        {value: 2, label: '处理失败'}
      ],
      filterRemote: (valArr, type, cell) => opt.filterRemote(valArr[0], 'status')
    }
  ]
  return columns
}

export default opts
