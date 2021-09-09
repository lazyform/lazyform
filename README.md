# lazyform
Lazyform is a vue component that uses field description objects to quickly generate forms

## Demo & doc
Documentation will be available SOON!! 

## Installation

```bash
# install the dependencies
npm install lazyform -S
# or
yarn add lazyform
```

### Usage

Register the component globally
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
          // <field name>:<reference value|field Object>
          name: '',
          email: '',
          autoFields: 'a@demo.com', // Unknown field: Try to match global fields through regular expressions
          account: {required: true}
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
Register the component locally.
```vue
<template>
  <l-form v-model="formData" :fields="formFields" @submit="onSubmit"/>
</template>
<script>
  import lForm, {MakeField} from 'lazyform'
  export default {
    components:{lForm},
    data(){
      return {
        formData: {},
        formFields: {
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
fields|Object|-|Required, the form field describes the object.
value|Object|-|Required, form default value.
labelMinWidth|String / number|0|Minimum label <br/>width 0: automatically calculated, <br/>number: converted to px, <br/>string: style width value
labelInTop|Boolean|false|label is located on top input.
inLine|Boolean|false|input is displayed on line.
onlyRead|Boolean|false|Set all INPUT to read-only.
disabled|Boolean|false|Set all INPUT to Disabled.
hideBtn|Boolean|false|Hide button
submitText|String|'提交'|Submit button text, '' does not display
resetText|String|''|Reset button text, '' does not display
cancelText|String|'取消'|Cancel button text, '' does not display
submitBtnClass|String|''|Submit button class
resetBtnClass|String|''|Reset button class
buttonBtnClass|String|''|Cancel button class

## Event

Event|Description
---|---
submit|Form validation can be submitted
fail|Form validation failed
input|Form value changes

## MakeField Function

-|-|Description
---|---|---
MakeField|(component, label)|
| |.alias(alias) | "propsAlias" or {name:"propsAlias",label:"aliaslabel"}
| |.pattern(regExp, errorTipText = '') | 
| |.placeholder(placeholder = '') |  
| |.description(description = '') |  
| |.rules([{},...]) |  Rules, See more usage at [async-validator](https://github.com/yiminghe/async-validator)
| |.required(isRequired=true) |  Is it required
| |.props({}) | Props passed to the INPUT component

## Issues and requests
For any issues please submit it through Github. Same with requests for new forms.   

## Disclaimer
This component is in the beta stage!!!

This means that the lazyform Component is available for everyone to use but breaking changes may occur as we develop it.  
We try our best to minimize any breaking changes but they may occur.

## License
MIT
