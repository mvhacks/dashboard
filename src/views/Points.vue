<template>
  <div class="points">
    <h1>Points: {{points}}</h1>
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
      points: ""
    }
  },
  methods: {
    getPoints: function() {
      var pointList = this.data.data.points;
      var points = 0;
      for(let i=0; i<pointList.length; i++) {
        points += pointList[i].amount;
      }
      this.points = points;
    }
  },
  created() {

    if(localStorage["data"] != 'null' && localStorage["data"] != null) {
      this.data = JSON.parse(localStorage["data"]);
      this.getPoints();
    }

    bus.$on('loggedin', (data) => {
      this.data = data;
      this.getPoints();
    })
    
  }
}
</script>
