const opts = function (opt) {
  const columns = [
    {
      title: '用户ID',
      key: 'uid'
    },
    {
      title: '产品名称',
      key: 'name'
    },
    {
      title: '投资金额',
      key: 'amount'
    },
    {
      title: '产品期限',
      key: 'period'
    },
    {
      title: '投资时间',
      key: 'createOn'
    },
    {
      title: '产品ID',
      key: 'product_id'
    },
    {
      title: '用户手机号',
      key: 'mobile'
    },
    {
      title: '产品状态',
      key: 'statusLable',
      filterMultiple: false,
      filters: [
        {value: 1, label: '未审核'},
        {value: 2, label: '已审核'},
        {value: 3, label: '还款中'},
        {value: 4, label: '已发布'}
      ],
      filterRemote: (valArr, type, cell) => opt.filterRemote(valArr[0], 'status')
    }
  ]
  return columns
}

export default opts
