const opts = function (opt) {
  const columns = [
    {
      title: '投资金额',
      key: 'amount'
    },
    {
      title: '还款时间',
      key: 'repayTime'
    },
    {
      title: '利息',
      key: 'profile'
    },
    {
      title: '手机号',
      key: 'mobile'
    },
    {
      title: 'id',
      key: 'id'
    },
    {
      title: '投资时间',
      key: 'investTime'
    },
    {
      title: '还款状态',
      key: 'status'
    }
    // {
    //   title: '产品状态',
    //   key: 'statusLable',
    //   filterMultiple: false,
    //   filters: [
    //     {value: 1, label: '未审核'},
    //     {value: 2, label: '已审核'},
    //     {value: 3, label: '还款中'},
    //     {value: 4, label: '已发布'}
    //   ],
    //   filterRemote: (valArr, type, cell) => opt.filterRemote(valArr[0], 'status')
    // }
  ]
  return columns
}

export default opts
