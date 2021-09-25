<template>
  <div style="display: inline">
    <template v-if="data.length!==0">
      <label v-for="(item,key) in data" :key="key">
        <input type="radio"
               v-model="radioValue"
               :value="item.value"
               @input="handlerChange"
               @blur="handlerChange"/>
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
  private radioValue: any = []
  handlerChange(ev: Event) {
    this.$emit(ev.type, this.radioValue)
  }
}
</script>

