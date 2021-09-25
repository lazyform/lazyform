<template>
  <div style="display: inline">
    <span v-if="data.length===0">
      <input type="checkbox" v-bind="$attrs" v-on="listeners"
             @input="handlerChangeSingle"
             @blur="handlerChangeSingle">
    </span>
    <template v-if="data.length!==0">
      <label v-for="(item,key) in data" :key="key">
        <input type="checkbox"
               v-model="multipleValue"
               :value="item.value"
               @input="handlerChangeMultiple"
               @blur="handlerChangeMultiple"/>
        {{ item.label }}
      </label>
    </template>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import cloneDeep from "lodash/cloneDeep";

@Component({
  name: 'checkboxInput',
})
export default class extends Vue {
  @Prop({default: () => []}) private data: Array<{ label: string; value: any }>;
  @Prop({default: true}) private trueValue: any;
  @Prop({default: false}) private falseValue: any;
  private multipleValue: any = []


  get listeners() {
    const _ = Object.assign({}, this.$listeners)
    if (_.input) delete _.input
    if (_.change) delete _.change
    if (_.blur) delete _.blur
    return _
  }

  private singleValue(ev: Event) {
    return (ev.target as HTMLInputElement).checked ? this.trueValue : this.falseValue
  }

  handlerChangeSingle(ev: Event) {
    this.$emit(ev.type, this.singleValue(ev))
  }

  handlerChangeMultiple(ev: Event) {
    this.$emit(ev.type, this.multipleValue)
  }
}
</script>

