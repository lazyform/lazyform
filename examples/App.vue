<template>
  <div id="app">
    <l-form v-model="c" :fields="fields" @submit="submitForm()"/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  export default class App extends Vue {
    private c: any = {username: '', oldname: '', city: ''}
    private fields = {
      username: '',
      oldname: '',
      city: {props: {multiple: true}},

      description: ''
    }

    private created(): void {

    }


    private submitForm(): void {
      console.log(this.c)
    }
  }
</script>
