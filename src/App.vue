<template>
  <div id="app">
    <body-scroll></body-scroll>
      <!-- <div style="width:100%;height:100%">
          <v-element-scrollbar direction="both">
              <div style="height:100px; background:red;"></div>
              <div style="height:100px; background:blue;"></div>
              <div style="height:100px; background:red;"></div>
              <div style="height:100px; background:blue;"></div>
              <div style="height:100px; background:red;"></div>
              <div style="height:100px; background:blue;"></div>
              <div style="height:100px; background:red;"></div>
              <div style="height:100px; background:blue;"></div>
              <div style="height:100px; background:red;"></div>
              <div style="height:100px; background:blue;"></div>
              <div style="height:100px; background:red;"></div>
              <div style="height:100px; background:blue;"></div>
              <div style="height:100px; background:red;"></div>
              <div style="height:100px; background:blue;"></div>
              <div style="height:100px; background:red;"></div>
              <div style="height:100px; background:blue;"></div>
              <div style="height:100px; background:red;"></div>
              <div style="height:100px; background:blue;"></div>
              <div style="height:100px; background:red;"></div>
              <div style="height:100px; background:blue;"></div>
              <div style="height:100px; background:red;"></div>
              <div style="height:100px; background:blue;"></div>
              <div style="height:100px; background:red;"></div>
              <div style="height:100px; background:blue;"></div>
              <div style="height:100px; background:red;"></div>
              <div style="height:100px; background:blue;"></div>
              <div style="height:100px; background:red;"></div>
              <div style="height:100px; background:blue;"></div>
              <div style="height:100px; background:red;"></div>
              <div style="height:100px; background:blue;"></div>
              <div style="height:100px; background:red;"></div>
              <div style="height:100px; background:blue;"></div>
          </v-element-scrollbar>
      </div> -->
  </div>
</template>

<script>
import bodyScroll from './bodyScroll.vue'
export default {
  name: 'App',
  components: {
    bodyScroll
  }
}
</script>

<style>
html,body{
    height: 100%;
    margin: 0;
    padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;

}
</style>
