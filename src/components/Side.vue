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
    <div style="padding: 20px; padding-top: 0;">
      <h1 style="font-size: 40px; margin: 0px;">Current Song</h1>
      <div id="song-container">
        <img v-bind:src="songimg">
        <div style="position: absolute; top: 20px; right: 20px; text-align: right; padding: 0;">
          <h2 style="margin: 0; font-size: 30px; width: 320px;">{{title}}</h2>
          <p style="margin: 0; font-size: 20px; width: 320px;">{{artist}}</p>
        </div>
        <br>
        <div id="progress">
          <div :style="{width: songProgress}"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Side',
  props: {
  },
  data : function() {
    return {
      songimg: "",
      title: "",
      artist: "",
      start: 0,
      end: 0,
      songProgress: "0%"
    }
  },
  created: function () {
    this.getsong();
  },
  methods: {
    getsong: function() {
      axios.get('https://api.mvhacks.io/3.0/attendee/current-song')
      .then(response => {
        this.songimg = response.data.data.picture;
        this.title = response.data.data.title;
        this.artist = response.data.data.artist;
        this.start = response.data.data.startTime;
        this.end = response.data.data.endTime;
        this.playsong();
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    playsong: function() {
      setTimeout(() => {
        this.getProgress();
        if((new Date).getTime() > this.end) {
          this.getsong();
        }
        this.playsong();
      }, 100);
    },
    getProgress: function() {
      var duration = this.end - this.start;
      var progress = (new Date).getTime() - this.start;
      this.songProgress = ((progress/duration) * 100) + "%";
    }
  }/*,
  computed: {
    songProgress: function() {
      var duration = this.end - this.start;
      var progress = (new Date).getTime() - this.start;
      // alert(progress + " / " + duration)
      // alert(((progress/duration) * 100) + "%");
      return ((progress/duration) * 100) + "%";
    }
  }*/
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
        color: rgb(20, 20, 20);
        display: inline;
        font-size: 20px;
        opacity: 0.9;
    }

    #song-container {
      max-width: 25vw;
      min-width: 20vw;
      background-color: rgb(20, 20, 20);
      border-radius: 10px;
      color: white;
      padding: 20px;
      position: relative;
      opacity: 0.9;
    }

    #song-container > img {
      width: 140px;
    }

    #progress {
      width: 25vw;
      height: 3px;
      border-radius: 2px;
      color:#000!important;
      background-color:#f1f1f1!important;
    }

    #progress > div {
      border-radius: 2px;
      background-color:gray;
      height: 3px;
      transition: all 0.3s;
    }

</style>
