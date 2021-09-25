<template>
  <form class="lazy-form"
        :class="{inline:inLine,inTop:labelInTop}"
        @submit.prevent.stop="onSubmit"
  >
    <template v-for="({field},index) in items">
      <div class="vf-item" :key="index">
        <label v-if="hideLabel===false" class="vf-label" :class="{'is-required':field.required}"
               :style="{minWidth:labelWidthFix}">
          {{ field.label }}
        </label>
        <div class="vf-input-wrap" :style="{width:labelInTop?'100%':`calc(100% - 1.5em - ${labelWidthFix})`}">
          <component
              :is="field.component"
              :value="formData[field.key]"
              v-bind="field.props"
              :disabled="field.disabled"
              :data="selOpts[field.key]"
              @input="onFieldInput(field.key,$event,'input')"
              @blur="onFieldInput(field.key,$event,'blur')"
          />
          <span class="vf-description" v-if="field.description">{{ field.description }}</span>
          <span class="vf-error" v-show="validatorFieldsErrors[field.key]">{{ validatorFieldsErrors[field.key] }}</span>
        </div>
      </div>
    </template>
    <div class="vf-item" v-if="!hideBtn&&!onlyRead">
      <label class="vf-label" :style="{minWidth:labelWidthFix}"></label>
      <div class="vf-input-wrap vf-button-wrap">
        <button class="vf-button"
                :class="_submitBtnClass"
                v-if="submitText!==false" type="submit"
                :disabled="disabled">{{ _submitText }}
        </button>
        <button class="vf-button" :class="_resetBtnClass"
                v-if="_resetText" type="reset"
                :disabled="disabled" @click="$emit('reset',$event)">
          {{ _resetText }}
        </button>
        <button class="vf-button" :class="_cancelBtnClass"
                v-if="_cancelText" type="button"
                :disabled="disabled" @click="$emit('cancel',$event)">
          {{ _cancelText }}
        </button>
      </div>
    </div>
  </form>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from "vue-property-decorator";
import isEmpty from 'lodash/isEmpty'
import genItemConfs from "@/lib/genItemConfs";
import GlobalFields from "@/lib/GlobalFields";
import Schema from 'async-validator'
import cloneDeep from 'lodash/cloneDeep'
import {RuleItem} from "@/@types/ruleItem";


(Schema as any).warning = () => {
}

const validateOption = {
  first: true
}


@Component({
  name: "lazyform"
})
export default class extends Vue {
  @Prop() private value?: { [key: string]: any };
  @Prop() private fields?: { [key: string]: Field | any };
  @Prop({default: 0}) private labelMinWidth?: string | number;
  @Prop({default: false}) private labelInTop?: boolean;
  @Prop({default: false}) private hideLabel?: boolean;
  @Prop({default: false}) private inLine?: boolean;
  @Prop({default: false}) private onlyRead?: boolean;
  @Prop({default: false}) private disabled?: boolean;
  @Prop({default: ''}) private submitText?: string | boolean;
  @Prop({default: false}) private resetText?: string | boolean;
  @Prop({default: false}) private cancelText?: string | boolean;
  @Prop({default: ''}) private submitBtnClass?: string;
  @Prop({default: ''}) private resetBtnClass?: string;
  @Prop({default: ''}) private cancelBtnClass?: string;
  @Prop({default: false}) private hideBtn?: boolean;

  get _submitText() {
    return this.submitText || this.$lazyformConfig?.submitText || 'submit'
  }

  get _resetText() {
    return this.resetText || this.$lazyformConfig?.resetText || ''
  }

  get _cancelText() {
    return this.cancelText || this.$lazyformConfig?.cancelText || ''
  }

  get _submitBtnClass() {
    return this.submitBtnClass || this.$lazyformConfig?.submitBtnClass || ''
  }

  get _resetBtnClass() {
    return this.resetBtnClass || this.$lazyformConfig?.resetBtnClass || ''
  }

  get _cancelBtnClass() {
    return this.cancelBtnClass || this.$lazyformConfig?.cancelBtnClass || ''
  }

  get items() {
    return genItemConfs(this.fields, GlobalFields) || []
  }

  get labelWidthFix() {
    const _w = isNaN(parseFloat(this.labelMinWidth as any)) ? `${this.labelMinWidth}px` : this.labelMinWidth
    return this.labelMinWidth === 0 ? this.autoLabelWidth() : _w
  }

  private _formRules: any = {}
  private _validatorSchemaAll: any = {}
  private _validatorSchemaInput: any = {}
  formData: any = {}
  selOpts: any = {} //
  validatorFieldsErrors: any = {}

  created() {
    this.init()
  }

  init() {
    if (isEmpty(this.fields)) console.warn('lazyform: fields is null array')
    this.updateVal()
    this.onFormInput()
  }

  validateField(prop: string, evName = 'blur') {
    const _Schema = evName == 'input' ? this._validatorSchemaInput : this._validatorSchemaAll
    if (_Schema[prop]) {
      const _data: any = {}
      _data[prop] = this.formData[prop]
      const _validate = _Schema[prop].validate(_data, validateOption, (errors: any, fields: any) => {
        if (errors) {
          this.$set(this.validatorFieldsErrors, prop, errors.map((item: any) => item.message)[0])
        } else {
          delete this.validatorFieldsErrors[prop]
        }
      })
      _validate.catch(() => {
      })
      return _validate
    }
  }

  private _newSchema(rules: any) {
    const _: any = new Schema(rules)
    if (this.$lazyformConfig?.asyncValidatorI18n) _.messages(this.$lazyformConfig?.asyncValidatorI18n)
    return _
  }

  validate(cb: (valid: boolean) => void) {
    const formSchema = this._newSchema(this._formRules)
    const _validate = formSchema.validate(this.formData, validateOption, (errors: any, fields: any) => {
      if (errors) {
        errors.forEach((err: any) => {
          this.$set(this.validatorFieldsErrors, err.field, err.message)
        })
        cb(false)
      } else {
        this.validatorFieldsErrors = {}
        cb(true)
      }
    })
    _validate.catch(() => {
    })

    return _validate
  }

  autoLabelWidth() {
    let maxLength = 0
    this.items.forEach(field => {
      const _label = field.field.label
      let _l = 0
      for (let i = 0; i < _label.length; i++) {
        _l += (_label.charCodeAt(i) >= 0 && _label.charCodeAt(i) <= 128) ? 1 : 2
      }
      if (maxLength < _l) maxLength = _l
    })
    return `calc(${maxLength / 2}em + 14px)`
  }

  onFieldInput(fieldKey: string, ev: any, evName: string) {
    if (evName == 'input' ? 'fieldInput' : evName == 'blur' ? 'fieldBlur' : null) {
      this.validateField(fieldKey, evName)
      const val = ev instanceof Event ? (ev.target as HTMLTextAreaElement).value : ev
      this.$set(this.formData, fieldKey, val)
    }
    this.onFormInput()
  }

  onFormInput() {
    this.$emit('input', Object.assign({}, this.value, cloneDeep(this.formData)))
  }

  onSubmit($event: Event) {
    this.validate((valid) => {
      if (valid) {
        this.onFormInput()
        this.$emit('submit', $event)
      } else {
        this.$emit('fail', $event)
        console.log('lazyform validate fail')
      }
    })
  }

  @Watch('value', {deep: true})
  updateVal() {
    const _formData: any = {}
    const _value = this.value || {}
    this.items.forEach((item: any) => {
      const key: string = item && item.field && item.field.key ? item.field.key : ''
      if (key) _formData[key] = _value[key] ? _value[key] : item.field.value || ''
    })
    this.formData = _formData
  }

  @Watch('items', {deep: true, immediate: true})
  private _validatorUpdateRules(items: Array<any>) {
    const _input: any = {}
    const _all: any = {}
    this._formRules = {}
    items.forEach(item => {
      if (item.field.rules.length == 0 && item.field.required) {
        const requiredRule: RuleItem = {required: true}
        item.field.rules.push(requiredRule)
      }
      if (!isEmpty(item.field.rules)) {
        const descriptor: any = {}
        const descriptorInput: any = {}
        const rules = item.field.rules.map((rule: RuleItem) => {
          if (typeof item.field.required != 'undefined') rule.required = item.field.required ? true : false
          rule.fullField = item.field.label
          return rule
        })
        this._formRules[item.field.key] = rules
        descriptor[item.field.key] = rules
        descriptorInput[item.field.key] = rules.filter((rule: RuleItem) => rule.trigger == 'input')
        _all[item.field.key] = this._newSchema(descriptor)
        _input[item.field.key] = this._newSchema(descriptorInput)
      }
      if (item.field.data instanceof Function) {
        item.field.data(item.field).then((data: any) => this.$set(this.selOpts, item.field.key, data))
      } else if (item.field.data instanceof Array) {
        this.$set(this.selOpts, item.field.key, item.field.data)
      }
    })
    this._validatorSchemaAll = _all
    this._validatorSchemaInput = _input
  }
}

</script>
<style lang="scss" scoped>
.lazy-form {
  .vf-item {
    margin-bottom: 1.4em;
  }

  .vf-label {
    text-align: right;
    display: inline-block;
    margin-right: 0.4em;
    vertical-align: top;

    &.is-required {
      &:before {
        display: inline;
        content: "*";
        color: red;
      }
    }
  }

  .vf-button {
    margin-right: 1em;
  }

  .vf-input-wrap {
    display: inline-block;
    position: relative;
  }

  .vf-error {
    position: absolute;
    top: 100%;
    left: 0;
    display: block;
    color: red;
    font-size: 12px;
  }

  &.inline {
    .vf-item {
      display: inline-block;
    }
  }

  &.inTop {
    .vf-label {
      display: block;
      text-align: initial;
    }
  }
}
</style>
