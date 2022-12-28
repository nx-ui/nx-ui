// 暴露props
declare interface props {
  // 总条目数
  total: number
  // 当前页
  pageNum: number
  // 页数
  pageSize: number
}

declare interface QueryObject {
  [index: string]: any
}
