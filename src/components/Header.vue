<template>
  <div>
    <h1 onclick="document.documentElement.requestFullscreen();">MVHacks 3.0</h1>
    <h3 class="lower-text">Dashboard</h3>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  h1 {
    margin: 0;
    padding: 0;
    display: block;
    font-weight: 700; 
    font-size: 70px; 
  }

  .lower-text {
    margin: 0;
    font-weight: 500; 
    font-size: 30px;
    color: white;
  }

</style>
