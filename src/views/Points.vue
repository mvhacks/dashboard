<template>
  <div>
    <div id="points" v-if="loggedin">
      <h1>{{points}} points</h1>
      <div id="points-list" v-for="point in pointsList" v-bind:key="point.time_stamp">
        {{getTime(point.time_stamp)}} {{point.reason}}: <strong>{{point.amount}} points</strong>
      </div>
    </div>
    <h1 id="loginmes" v-if="!loggedin">Login to see your points</h1>
  </div>
</template>

<script>
import { bus } from '../main';

export default {
  name: 'Points',
  props: {
  },
  data: function() {
    return {
      data: "",
      points: "",
      pointsList: "",
      loggedin: false
    }
  },
  methods: {
    getPoints: function() {
      this.pointsList = this.data.data.points;
      var points = 0;
      for(let i=0; i<this.pointsList.length; i++) {
        points += this.pointsList[i].amount;
      }
      this.points = points;
    },
    getTime: function(date) {
      return (new Date(date)).getHours() + ":" + (new Date(date)).getMinutes();
    }
  },
  created() {

    if(localStorage["data"] != 'null' && localStorage["data"] != null && localStorage["data"] != "") {
      this.data = JSON.parse(localStorage["data"]);
      this.getPoints();
      this.loggedin = true;
    }

    bus.$on('loggedin', (data) => {
      this.data = data;
      this.getPoints();
      this.loggedin = true;
    })

    bus.$on('loggedout', () => {
      this.data = "";
      this.points = "";
      this.pointsList = "";
      this.loggedin = false;
    })
    
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=PT+Sans|Roboto&display=swap');

#points {
  color: black;
}

#points > h1 {
  margin-bottom: 0;
  font-size: 40px;
}

#loginmes {
  color: black;
  font-weight: normal;
}

#points-list {
  font-size: 20px;
}

</style>
