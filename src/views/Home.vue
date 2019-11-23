<template>
  <div class="home">
    <Spotify />
    <h1>Spotify stuff</h1>
  </div>
</template>

<script>
import Spotify from '@/components/Spotify.vue'


export default {
  name: 'home',
  components: {
    Spotify
  }
}
</script>
