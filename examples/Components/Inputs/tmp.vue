<template>
  <select v-bind="attr" v-on="listeners" :multiple="isMultiple"
          @input="handlerChange"
          @blur="handlerChange">
    <option v-if="attr.placeholder" value="" :selected="attr.value==''" disabled hidden>
      {{ attr.placeholder }}
    </option>
    <option v-for="(item,key) in opts" :key="key" :selected="item._isSel" :value="item.value">{{
        item.label
      }}
    </option>

  </select>
</template>
<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import cloneDeep from 'lodash/cloneDeep'

  @Component({
    name: 'SelectInput',
  })
  export default class extends Vue {
    @Prop() private options: any;
    @Prop() private data: any;

    created() {
    }

    get attr() {
      const _ = cloneDeep(this.$attrs)
      if (this.isMultiple) delete _.value
      return _
    }

    get isMultiple() {
      return this.$attrs.multiple || (this.$attrs as any).value instanceof Array
    }

    get listeners() {
      const _ = Object.assign({}, this.$listeners)
      if (_.input) delete _.input
      if (_.change) delete _.change
      if (_.blur) delete _.blur
      return _
    }

    get opts() {
      return !this.data ? [] : this.data.map((opt: any) => {
        const _value = (this.$attrs as any)?.value || []
        if (this.isMultiple && _value.indexOf(opt.value) != -1) opt._isSel = true
        return opt
      })
    }

    private inputValue(ev: Event) {
      let val: any = (ev.target as HTMLTextAreaElement).value
      if (this.isMultiple) {
        val = []
        const $opts = this.$el.querySelectorAll('option')
        $opts.forEach(($opeEl, index) => {
          if ($opeEl.selected && !$opeEl.disabled) val.push(this.data[index].value)
        })
      }
      return val
    }

    handlerChange(ev: Event) {
      this.$emit(ev.type, this.inputValue(ev))
    }

  }
</script>