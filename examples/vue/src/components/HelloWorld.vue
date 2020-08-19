<template>
  <div class="hello">
    <h1>{{$t('title')}}</h1>
    
    <h3>Directive usage</h3>
    <p v-t="'intro'" />

    <h3>Interpolated expression usage</h3>
    <p v-waitForT>{{$t("intro")}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
</style>
