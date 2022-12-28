/// <reference types="vite/client" />

// 单个form item 的属性
declare interface formItemConfig {
  // 必填
  // 标签名
  label: string
  // 对应的属性名 如： from.name ~
  prop: string
  // 组件所需类型，下拉框或者输入框
  type: string
  // 默认值
  default: any

  // 选填-通用
  // 宽度
  width?: number
  // 占位符
  placeholder?: string
  // 是否清空
  clearable?: boolean
  // 是否使能
  disabled?: boolean
  // 是否隱藏
  hidden?: boolean

  // 选填
  // 特殊组件参数
  // 输入框判断是否文本域
  inputType?: string
  // 输入框为文本域的时候的行数
  row: number

  // 选填-特殊
  // 数据，一般是下拉框之类需要可选项的才用到
  data?: any
}
