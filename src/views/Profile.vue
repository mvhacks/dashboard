<template>
  <div id="profile">
    <div v-if="loggedin">
      <img id="profile-img" src="https://lh3.googleusercontent.com/Hrn47ZyqvRkkHZNoJ68jMkgT6e5M2ZgW7d5JbsXu1JnwVBmqhaep3odwgcUfKFnsnQzvE8cZcP84-rwUApHzCEhXDegXTtFhyafP7Osoyx9D1LatOkOSAr3x770yI6iBOdxpTAuopE3zrrFhphS1C5YTiwjNuDver9GF3fAM5fEMQmNrXh_Vr0eAl9exrEEFCxfMel04fVNuv29xETIZTQqMoCHqmVCeeQ8fB6qPOUEKDaME2y3FZwuQdgFDIDad6jQvgG29RUsJ4OPaTFO77sjN9tsYTUZhacmne8IKjAmiAGCa7MJf5zEJOFnMIUinB_At9q7jieWtm6OxaZLqDgOlJRdPNV0H_jN8Ef_2VquGLotLhtA-CVfrWYVtM5qxA2EVKxTlVw0SPO7cGRanE68LC3XPArJpfIjeWaeN4ZckqVyb9-tCCol4azKcs69vZrVyNuZdlnv2EpUKm24dJKi20J5mJcLDw7yWKnGp9RARqZlU_UXlTI82WOMrZ_tFtMw2DPHCGWUOLuwRooM3XJvgN_ZBeb2GBqSjBLi5Ri4hwY0onETWTHAfxWM_PDaAgCo3KLCGSboScTSGHZ9Z4yxHxUMOnyQqBl1WmnTeUpyLJ6vj-70i8ref88kyPOhXBZ-zNr5kSIeliEp81AY9q0JIaC1H8ryvFaUvrd1wthRtgd-laG_mEB1_cLzX_4SDSg9YkLfnjOirPpnp6xoGNXEJPIw0RPnd0BEDqhBv3PvK7BjV=s1532-no"/>
      <div id="info">  
        <h1 style="font-weight: 600;">{{name}}</h1>
        <h1>Group: {{group}}</h1>
        <h1>Status: {{status}}</h1>
      </div>
    </div>
    <h1 v-if="!loggedin">Login to access profile info</h1>
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
      data: "",
      group: "",
      status: "",
      loggedin: false
    }
  },
  methods: {
    getGroup: function() {
      var groups = this.data.data.groups;
      var activeGroups = new Array();
      for(let i=0; i<groups.length; i++) {
        if(groups[i].action == "join") {
          activeGroups.push(groups[i].group_name);
        } else {
          activeGroups.splice(activeGroups.indexOf(groups[i].group_name), 1);
        }
      }
      if(activeGroups.length > 0) {
        this.group = activeGroups[0];
      }
    },
    getStatus: function() {
      var checkins = this.data.data.checkins;
      this.status = checkins[checkins.length-1].action;
    }
  },
  created() {

    if(localStorage["data"] != 'null' && localStorage["data"] != null && localStorage["data"] != "") {
      this.data = JSON.parse(localStorage["data"]);
      this.name = this.data.data.first_name + " " + this.data.data.last_name;
      this.getGroup();
      this.getStatus();
      this.loggedin = true;
    }

    bus.$on('loggedin', (data) => {
      this.data = data;
      this.name = data.data.first_name + " " + data.data.last_name;
      this.getGroup();
      this.getStatus();
      this.loggedin = true;
    })

    bus.$on('loggedout', () => {
      this.loggedin = false;
      this.data = "";
      this.name = "";
    })
    
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=PT+Sans|Roboto&display=swap');

  #profile-img {
    margin-top: 20px;
    height: 200px;
    width: 200px;
    margin-right: 10px;
    border-radius: 10px;
    float: left;
    border: 5px black solid;
    padding: 0px;
  }

  #info {
    padding: 10px;
    color: black;
    padding-top: 20px;
  }

  #info > h1 {
    margin: 5px;
    font-weight: normal;
  }

  #profile {
    color: black;
  }

  #profile > h1 {
    font-weight: normal;
  }

</style>
