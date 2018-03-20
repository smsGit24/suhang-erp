const opts = function (opt) {
  const columns = [
    {
      title: '产品金额',
      key: 'amount'
    },
    {
      title: '产品期权',
      key: 'period'
    },
    {
      title: '产品代码',
      key: 'code'
    },
    {
      title: '投资金额',
      key: 'invest_amount'
    },
    {
      title: '产品利率',
      key: 'rate'
    },
    {
      title: '产品名称',
      key: 'name'
    },
    {
      title: '产品ID',
      key: 'id'
    },
    {
      title: '产品类型',
      key: 'typeLable',
      filterMultiple: false,
      filters: [
        {value: 1, label: '默认产品'}
      ],
      filterRemote: (valArr, type, cell) => opt.filterRemote(valArr[0], 'type')
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
    },
    {
      title: '产品操作',
      key: 'action',
      fixed: 'right',
      align: 'center',
      width: 200,
      render: opt.actionRender
    }
  ]
  return columns
}

export default opts
