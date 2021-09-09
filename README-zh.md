# lazyform

懒人表单--使用字段描述对象快速生成复杂表单的VUE组件。

## 安装

```bash
# install the dependencies
npm install lazyform -S
# or
yarn add lazyform
```

### 使用

注册全局组件

```vue

<template>
  <l-form v-model="formData" :fields="formFields" @submit="onSubmit"/>
</template>
<script>
  // ----- main.js -----
  // ...
  import Vue from 'vue'
  import lForm, {MakeField} from 'lazyform'

  //import formFieldConfig from '<your path>/formFieldConfig'
  const formFieldConfig = {
    fields: {
      // 全局字段描述
      account: MakeField('input', 'user name').rules([{min: 6}]),
      name: MakeField('input', 'user name').rules([{max: 15}]).required(),
      email: MakeField('input', 'email').pattern("/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/")
    },
    submitBtnClass: '',
    resetBtnClass: '',
    buttonBtnClass: ''
  }

  Vue.use(lForm, formFieldConfig) // Register the Fields globally
  // ...
  // ------ main.js end ------

  export default {
    data() {
      return {
        formData: {},
        formFields: {
          // <字段名>:<string:参考值|object字段描述>
          name: '',
          email: '',
          autoFields: 'a@demo.com', // 未知字段:尝试全局字段描述中的正则表达式匹配
          account: {required: true} // 按实际需求调整字段描述，以适用不同的使用场景。
        }
      }
    },
    methods: {
      onSubmit($event) {
        // ...
      }
    }
  }
</script>
```

在单文件组件内使用

```vue

<template>
  <l-form v-model="formData" :fields="formFields" @submit="onSubmit"/>
</template>
<script>
  import lForm, {MakeField} from 'lazyform'

  export default {
    components: {lForm},
    data() {
      return {
        formData: {},
        formFields: {
          // 字段描述
          name: MakeField('input', 'user name').rules([{max: 15}]).required(),
        }
      }
    },
    methods: {
      onSubmit($event) {
        // ...
      }
    }
  }
</script>
```

## Props

Property|Type|Default|Description
---|---|---|---
fields|Object|-|必填，表单字段描述对像
value|Object|-|必填，表单默认值
labelMinWidth|String / number|0|label最小宽度 <br/>0:自动计算，<br/>number:转换为px，<br/>string:style width值
labelInTop|Boolean|false|label是否位于input顶部
inLine|Boolean|false|单行模式-input显示于一行。
onlyRead|Boolean|false|将所有input设为只读
disabled|Boolean|false|禁用所有input
hideBtn|Boolean|false|隐藏按钮
submitText|String|'提交'|提交按钮文本,''不显示
resetText|String|''|重置按钮文本,''不显示
cancelText|String|'取消'|取消按钮文本,''不显示
submitBtnClass|String|''|提交按钮样式
resetBtnClass|String|''|提交按钮样式
buttonBtnClass|String|''|提交按钮样式

## Event

Event|Description
---|---
submit|表单验证通过可提交
fail|表单验证失败
input|表单值改变

## MakeField 字段描述生成函数

-|-|Description
---|---|---
MakeField|(component, label)|component:input组件名或vue组件对像。<br/> label:字段label
| |.alias(alias) | 设置字段别名 String:<别名> 或 {name:<别名>,label:<对应label>}   
| |.pattern(regExp, errorText = '') | regExp:字段正则检证规则,也用于通过参考值反向识别字段。<br/>errorText:错误提示文本.<br/>
| |.placeholder(placeholder = '') |  input placeholder
| |.description(description = '') |  字段提示，于input下方显示一行提示文本。
| |.rules([{},...]) |  验证规则,请参阅 [async-validator](https://github.com/yiminghe/async-validator)
| |.required(isRequired=true) |  是否必填(ps:此选会复盖rule中的required属性)
| |.props({}) | 传递给input组件的props

## 问题提交

如有任何问题，请通过 Github Issues 提交。

## 待办
- [ ] 问题/建议收集
- [ ] 编写完整文档
- [ ] 编写测试脚本
- [ ] 发布正式版本

## 免责声明

此组件处于测试阶段！！！

lazyform懒人表单组件可以正常使用，但在新版本发布时可能会发生重大变化导致旧代码无法运行。使用时请注意锁定版本号。   
我们会尽量减少重大更改，但它们可能会发生。

## License

MIT  
