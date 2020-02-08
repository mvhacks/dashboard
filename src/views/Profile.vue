<template>
  <div id="profile">
    <img id="profile-img" src="https://lh3.googleusercontent.com/Hrn47ZyqvRkkHZNoJ68jMkgT6e5M2ZgW7d5JbsXu1JnwVBmqhaep3odwgcUfKFnsnQzvE8cZcP84-rwUApHzCEhXDegXTtFhyafP7Osoyx9D1LatOkOSAr3x770yI6iBOdxpTAuopE3zrrFhphS1C5YTiwjNuDver9GF3fAM5fEMQmNrXh_Vr0eAl9exrEEFCxfMel04fVNuv29xETIZTQqMoCHqmVCeeQ8fB6qPOUEKDaME2y3FZwuQdgFDIDad6jQvgG29RUsJ4OPaTFO77sjN9tsYTUZhacmne8IKjAmiAGCa7MJf5zEJOFnMIUinB_At9q7jieWtm6OxaZLqDgOlJRdPNV0H_jN8Ef_2VquGLotLhtA-CVfrWYVtM5qxA2EVKxTlVw0SPO7cGRanE68LC3XPArJpfIjeWaeN4ZckqVyb9-tCCol4azKcs69vZrVyNuZdlnv2EpUKm24dJKi20J5mJcLDw7yWKnGp9RARqZlU_UXlTI82WOMrZ_tFtMw2DPHCGWUOLuwRooM3XJvgN_ZBeb2GBqSjBLi5Ri4hwY0onETWTHAfxWM_PDaAgCo3KLCGSboScTSGHZ9Z4yxHxUMOnyQqBl1WmnTeUpyLJ6vj-70i8ref88kyPOhXBZ-zNr5kSIeliEp81AY9q0JIaC1H8ryvFaUvrd1wthRtgd-laG_mEB1_cLzX_4SDSg9YkLfnjOirPpnp6xoGNXEJPIw0RPnd0BEDqhBv3PvK7BjV=s1532-no"/>
    <div id="info">  
      <h1>{{name}}</h1>
    </div>
  </div>
</template>

<script>
import { bus } from '../main';

export default {
  name: 'Profile',
  props: {
  },
  data: function() {
    return {
      name: "",
      data: ""
    }
  },
  created() {

    if(localStorage["data"] != null) {
      this.data = JSON.parse(localStorage["data"]);
      this.name = this.data.data.first_name + " " + this.data.data.last_name;
    }

    bus.$on('loggedin', (data) => {
      this.data = data;
      this.name = data.data.first_name + " " + data.data.last_name;
    })
    
  }
}
</script>

<style scoped>

  #profile-img {
    margin-top: 20px;
    height: 200px;
    width: 200px;
    margin-right: 10px;
    border-radius: 50px;
    float: left;
    border: 5px rgb(0, 112, 187) solid;
    padding: 0px;
  }

  #info {
    padding: 10px;
  }

</style>
