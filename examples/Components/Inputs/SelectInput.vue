<template>
  <select v-bind="attr" v-on="listeners" :multiple="multiple"
          @input="handlerChange"
          @blur="handlerChange">
    <option v-for="(item,key) in opts" :key="key" v-bind="item">{{ item.label }}</option>
    <option value="" v-if="attr.placeholder&&!this.multiple" :selected="attr.value==''" :hidden="attr.value==''"
            disabled>
      {{ attr.placeholder }}
    </option>
  </select>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import cloneDeep from "lodash/cloneDeep";

@Component({
  name: 'SelectInput',
})
export default class extends Vue {
  @Prop() private data: any;
  @Prop() private multiple: boolean;

  get opts() {
    return this.data || []
  }

  get listeners() {
    const _ = Object.assign({}, this.$listeners)
    if (_.input) delete _.input
    if (_.change) delete _.change
    if (_.blur) delete _.blur
    return _
  }

  get attr() {
    const _ = cloneDeep(this.$attrs)
    if (this.multiple) delete _.value
    return _
  }

  private inputValue(ev: Event) {
    let val: any = (ev.target as HTMLTextAreaElement).value
    if (this.multiple) {
      val = []
      const $opts = this.$el.querySelectorAll('option')
      $opts.forEach(($opt, index) => {
        if ($opt.selected) val.push(this.data[index].value)
      })
    }
    return val
  }

  handlerChange(ev: Event) {
    this.$emit(ev.type, this.inputValue(ev))
  }
}
</script>

