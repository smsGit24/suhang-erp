const opts = function (opt) {
  const columns = [
    {
      title: '产品金额',
      key: 'amount',
      width: 110
    },
    {
      title: '产品期权',
      key: 'period',
      width: 110
    },
    {
      title: '产品代码',
      key: 'code',
      width: 100
    },
    {
      title: '投资金额',
      key: 'invest_amount',
      width: 110
    },
    {
      title: '产品利率',
      key: 'rate',
      width: 110
    },
    {
      title: '产品名称',
      key: 'name'
    },
    {
      title: '产品ID',
      key: 'id',
      width: 100
    },
    {
      title: '产品类型',
      key: 'typeLable',
      width: 100
    },
    {
      title: '产品状态',
      key: 'statusLable',
      width: 100
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 200,
      align: 'center',
      render: opt.actionRender
    }
  ]
  return columns
}

export default opts
