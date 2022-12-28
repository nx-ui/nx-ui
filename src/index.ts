/*
 * @Author: next-ui 55926111@qq.com
 * @Date: 2022-12-27 16:07:43
 * @LastEditors: next-ui 55926111@qq.com
 * @LastEditTime: 2022-12-28 15:53:51
 * @FilePath: \NxUI\src\index.ts
 * @Description:
 *
 * Copyright (c) 2022 by next-ui 55926111@qq.com, All Rights Reserved.
 */

import './assets/style.css'

// 批量导入组件
const Components: Record<string, any> = import.meta.glob('./components/**/*.vue', { eager: true })

// 批量注册组件
const install = function (Vue: any) {
  for (const key in Components) {
    const component = Components[key].default
    Vue.component(component.name, component)
  }
}

export default install
