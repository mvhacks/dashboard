<template>
  <div style="padding: 20px; display: none; padding-top: 0; padding-bottom: 0;" id="spotifyDiv">
    <h1 style="font-size: 40px; color: #ee521f;">Current Song</h1>
    <br>
    <div style="background: #222; border-radius: 8px; padding: 22px;">
        <div style="display: inline;">
            <img id="spotfiyImage" style="max-width: 40%;">
        </div>
        <div style="display: inline; float: right; text-align: right; width: 50%;">
            <span id="spotifySong" style="font-size: 36px; font-weight: bold;"></span>
            <span id="spotifyArtist" style="font-size: 24px; color: #ddd;"></span>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'Spotify',
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  

</style>
