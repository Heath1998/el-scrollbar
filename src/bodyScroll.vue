<template>
  <div>
      <div class="aaa"  id="one">
    <div style="background-color: red;">1</div>
    <button @click="testunlock">testunlock</button>
    <button @click="test2">testlock</button>
    <div>3</div>
    <div>2</div>
    <div>2</div>
    <div>2</div>
    <div>2</div>
    <div>2</div>
    <div style="background-color: yellow;">2</div>
  </div>
  <div style="height: 2000px;">
    <div style="height: 20px;">1</div>
    <div style="height: 20px;">12</div>
    <div style="height: 20px;">13</div>
    <div style="height: 20px;">14</div>
    <div style="height: 20px;">15</div>
    <div style="height: 20px;">1</div>
    <div style="height: 20px;">17</div>
    <div style="height: 20px;">18</div>
    <div style="height: 20px;">19</div>
    <div style="height: 20px;">10</div>
    <div style="height: 20px;">155</div>
    <div style="height: 20px;">144</div>
    <div style="height: 20px;">1333</div>
    <div style="height: 20px;">1333</div>
    <div style="height: 20px;">1333</div>
    <div style="height: 20px;">1333</div>
    <div style="height: 20px;">1333</div>
    <div style="height: 20px;">1333</div>
    <div style="height: 20px;">1333</div>
    <div style="height: 20px;">1333</div>
    <div style="height: 20px;">1333</div>
    <div style="height: 20px;">111</div>
    <div style="height: 20px;">12321312</div>
  </div>
  </div>
</template>

<script>
import { lock, unlock} from './utils/index.js'
export default {
  mounted() {
    let one = document.getElementById('one');
    lock(one);
  },
  methods: {
    testunlock() {
      let one = document.getElementById('one');
      unlock(one); 
    },
    test2() {
      let one = document.getElementById('one');
      lock(one); 
    }
  }
 
}

</script>

<style>
  .aaa {
    width: 90%;
    height: 300px;
    position: fixed;
    top: 300px;
    overflow: auto;
  }
  .aaa div {
    height: 80px;
    background-color: blue;

  }
</style>