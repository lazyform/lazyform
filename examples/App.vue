<template>
  <div id="app">
    <lazy-form v-model="formData" :fields="fields" @submit="submitForm()"/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  export default class App extends Vue {
    private formData: any = {}
    private fields = {
      username: {required: true},
      oldname: {required: true},
      password: {required: true},
      city: {props: {multiple: true}},
      email: '',
      city2: '',
      introduction: '',
      isAccept: '',
    }

    private created(): void {

    }


    private submitForm(): void {
      console.log(this.formData)
    }
  }
</script>
