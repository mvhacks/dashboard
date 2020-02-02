<template>
  <div id="app">
    <Side />
    <Header/>
    <Login />
    <div id="nav">
      <router-link to="/">Main</router-link>
      <router-link to="/profile">Profile</router-link>
      <router-link to="/points">Points</router-link>
      <router-link to="/more">More</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Side from '@/components/Side.vue';
import Login from '@/components/Login.vue';

export default {
  name: 'app',
  components: {
    Header,
    Side,
    Login
  }
}
</script>


<style>
#app {
  font-family: 'Poppins', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgb(0, 112, 187);
  padding: 20px;
}

#nav {
  margin-top: 20px;
}

#nav a {
  font-size: 20px;
  font-weight: bold;
  color: rgb(0, 112, 187);
  text-decoration: none;
  margin-right: 10px;
  position: relative;
  bottom: 0px;
  transition: 0.3s all;
}

#nav a.router-link-exact-active {
  color: #2c3e50;
  position: relative;
  bottom: 3px;
}
</style>
