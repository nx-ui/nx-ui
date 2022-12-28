<!--
 * @Author: next-ui 55926111@qq.com
 * @Date: 2022-12-27 22:36:36
 * @LastEditors: next-ui 55926111@qq.com
 * @LastEditTime: 2022-12-28 17:45:37
 * @FilePath: \NxUI\src\components\NxForm\NxForm.vue
 * @Description:
 *
 * Copyright (c) 2022 by next-ui 55926111@qq.com, All Rights Reserved.
-->
<template>
  <div class="nx-form-container">
    <el-dialog
      v-model="visible1"
      :fullscreen="props.fullscreen"
      :draggable="props.draggable"
      :title="props.title"
      :width="props.width || '50%'">
      <el-form
        ref="ruleFormRef"
        label-width="120px"
        size="large"
        :model="form"
        :rules="props.formConfig.rules">
        <template v-for="item in props.formConfig.formItemConfig" :key="item.prop">
          <el-form-item
            :label="item.label + '：'"
            :style="{ display: item.hidden == true ? 'none' : '' }"
            :prop="item.prop"
            :rules="item.rules">
            <!-- 输入框 -->
            <el-input
              v-if="item.type == 'input'"
              v-model="form[item.prop]"
              :placeholder="item.placeholder || ''"
              :clearable="item.clearable != false"
              :disabled="item.disabled == true"
              :type="item.inputType"
              :row="item.row"
              :style="{ width: item.width + 'px' }" />

            <!-- 下拉框 -->
            <el-select
              v-else-if="item.type == 'select'"
              v-model="form[item.prop]"
              :placeholder="item.placeholder"
              :clearable="item.clearable != false"
              :disabled="item.disabled == true"
              :style="{ width: item.width + 'px' }">
              <el-option
                v-for="option in item.data"
                :key="option.value"
                :label="option.label"
                :value="option.value"
                :disabled="option.disabled" />
            </el-select>

            <!-- 多选框 -->
            <el-checkbox-group
              v-else-if="item.type == 'checkbox'"
              v-model="form[item.prop]"
              :placeholder="item.placeholder"
              :clearable="item.clearable != false"
              :disabled="item.disabled == true"
              :style="{ width: item.width + 'px' }">
              <el-checkbox
                v-for="(option, key) in item.data"
                :key="key"
                :label="option.value"
                :disabled="option.disabled">
                {{ option.label }}
              </el-checkbox>
            </el-checkbox-group>

            <!-- 单选框 -->
            <el-radio-group
              v-else-if="item.type == 'radio'"
              v-model="form[item.prop]"
              :placeholder="item.placeholder"
              :clearable="item.clearable != false"
              :disabled="item.disabled == true"
              :style="{ width: item.width + 'px' }">
              <el-radio
                :label="option.value"
                size="large"
                v-for="(option, key) in item.data"
                :key="key">
                {{ option.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </template>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="visible1 = false">取消</el-button>
          <el-button type="primary" @click="confirm(ruleFormRef)">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'

let form: any = reactive({})
const visible1 = ref(true)
const ruleFormRef = ref<FormInstance>()

// 单个form item 的属性
interface formItemConfig {
  // 必填
  // 标签名
  label: string
  // 对应的属性名 如： from.name ~
  prop: string
  // 组件所需类型，下拉框或者输入框
  type: string
  // 默认值
  default?: any

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
  row?: number

  // 选填-特殊
  // 数据，一般是下拉框之类需要可选项的才用到
  data?: any
}

interface formConfig {
  // 每一项的配置
  formItemConfig: formItemConfig
  // 规则
  // https://element-plus.gitee.io/zh-CN/component/form.html#自定义校验规则
  rules: any
}

interface Props {
  // 以下是el-form  的配置
  // 编辑时候的formData数据
  formData: any
  // form配置 包括form item 以及 rules
  formConfig: formConfig

  // 以下是el-dialog 的配置
  visible: boolean
  // dialog配置
  width?: string | number
  // 弹框标题
  title: string
  // 是否为全屏 Dialog
  fullscreen?: boolean
  // 为 Dialog 启用可拖拽功能
  draggable?: boolean
  // Dialog 自身是否插入至 body 元素上。 嵌套的 Dialog 必须指定该属性并赋值为 true
  'append-to-body'?: boolean
  // 是否可以通过点击 modal 关闭 Dialog
  'close-on-click-modal'?: boolean
}
const props = defineProps<Props>()

// 生成事件对象，数组中就是对象名
const emit = defineEmits(['update:visible', 'confirm'])

// 监听父组件的visible，用来简介控制el-dialog的弹框开关，一般是用于开
watch(
  () => props.visible,
  (n, o) => {
    visible1.value = n
  }
)
// 监听el-dialog显示状态，再通过@update:visible 通知父组件，一般是用于关
watch(visible1, (n, o) => {
  emit('update:visible', n)
})

// 每次触发，就证明父组件点了修改或者添加的按钮，传递了一个新的formData
// 需要重新给form 赋值，并且，对该表单项进行重置
watch(
  () => props.formData,
  (n, o) => {
    resetForm(ruleFormRef.value)
    form = reactive(n)
  }
)

// 确定按钮触发
const confirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      emit('confirm', form)
    } else {
      console.log('error submit!', fields)
      ElMessage({
        showClose: true,
        message: '请完善表单信息！',
        type: 'error',
      })
    }
  })
}

// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

onMounted(() => {
  // 初始化 配置弹框是否可显示
  visible1.value = props.visible
  // 初始化 配置formData
  form = reactive(props.formData)
})
</script>

<script lang="ts">
export default {
  name: 'NxForm',
}
</script>

<style lang="less" scoped>
.nx-form-container {
  .el-table-border {
    border: 1px #eee solid;
  }
  // :deep(.el-scrollbar__view) {
  //   width: 100%;
  // }
  :deep(.el-dialog__body) {
    border-top: 1px solid #eee;
  }
}
</style>
