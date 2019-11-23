<template>
  <div id="side-container">
    <div style="padding: 20px; padding-bottom: 0;">
        <h1 style="font-size: 40px; margin: 0px;">Remaining Time</h1>
        <span id="timeLeft" style="font-size: 80px; margin: 0px;">12:13:18</span>
    </div>
    <div style="padding: 20px; padding-top: 0;">
        <h1 style="font-size: 40px; margin: 0px;">Links</h1>
        <a href="https://mvhacks.io/dashboard" class="links">mvhacks.io/dashboard</a>
        <a href="https://mvhacks.io/slack" class="links">mvhacks.io/slack</a>
        <a href="https://mvhacks.io/request-song" class="links">mvhacks.io/request-song</a>
        <a href="https://mvhacks.io/webex" class="links">mvhacks.io/webex</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Side',
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    #side-container {
        float: right;
        max-width: 40%;
        min-width: 30%;
    }

    .links {
        display: block;
        font-family: 'Poppins';
        margin: 0;
        padding: 0;
        text-decoration: none;
        font-size: 24px;
        color: rgb(55, 146, 207);
    }

    #timeLeft {
        color: white;
        display: inline;
        font-size: 20px;
    }

</style>
