<template>
  <div id="login">
    <transition name="fade">
      <button id="login-btn" v-on:click="show" v-if="isHidden && !loggedin">Login</button>
      <button id="logout-btn" v-on:click="logout" v-if="loggedin">Logout</button>
      <div v-if="!isHidden && !loggedin" id="login-panel">
        <input placeholder="Email" v-model="email">
        <div id="qrcontainer">
          <p>Scan QR Code</p>
          <qrcode-stream style="margin-left: 5px" @decode="onDecode" @init="onInit" /> 
          <p class="decode-result"><b>{{ result }}</b></p>     
        </div>
        <button id="submit" v-on:click="submit">Submit</button>
        <button id="cancel" v-on:click="cancel">Cancel</button>
        <p class="error">{{ error }}</p>
    </div>
    </transition>
  </div>
</template>

<script src="./js/qr.js"></script>
<script>
import { QrcodeStream } from 'vue-qrcode-reader';
import axios from 'axios';
import { bus } from '../main';

export default {
  name: 'Login',
  props: {
  },
  data: function() {
    return {
      isHidden: true,
      loggedin: false,
      result: '',
      error: '',
      email: '',
      errors: []
    }
  },
  components: { QrcodeStream },
  methods: {
    show: function () {
      this.isHidden = false
    },
    cancel: function() {
      this.isHidden = true;
      this.email = '';
      this.result = '';
    },
    logout: function() {
      this.loggedin = false;
      localStorage["data"] = "";
      this.result = '';
      this.email = '';
      bus.$emit('loggedout');
    },
    submit: function() {
      axios.get(`https://api.mvhacks.io/3.0/attendee/profile?qrcode=` + encodeURIComponent(this.result) + `&email=` + encodeURIComponent(this.email))
      .then(response => {
        if(response.data.success) {
          this.loggedin = true;
          bus.$emit('loggedin', response.data);
          localStorage["data"] = JSON.stringify(response.data);
          this.isHidden = true;
        } else {
          this.loggedin = false;
          this.error = "Invalid email or code"
        }
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    onDecode (result) {
      this.result = result
    },
    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permisson"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        }
      }
    }
  },
  mounted() {
    console.log(localStorage['data']);
    if(localStorage["data"] != 'null' && localStorage["data"] != null && localStorage["data"] != "") {
      console.log(localStorage["data"].data);
      var stored = JSON.parse(localStorage["data"]);
      this.loggedin = true;
      this.email = stored.data.email;
      this.result = stored.data.qrcode_id;
      this.submit();
    }
  }
}


</script>

<style scoped>

    #login {
        position: absolute;
        right: 20px;
        top: 20px;
        margin: 0px;
        padding: 0px;
    }

    button {
        font-size: 20px;
        background-color: rgb(0, 112, 187);
        border-radius: 5px;
        border: none;
        outline: none;
        font-family: 'Poppins', Helvetica, Arial, sans-serif;
        transition: 0.3s all;
    }

    button:hover {
        cursor: pointer;
        background-color: rgb(55, 146, 207);
    }

    #login-panel {
      position: absolute;
      right: 0px;
      top: 0px;
      background-color: rgb(220, 220, 220);
      width: 160px;
      padding: 10px;
      border-radius: 5px;
      text-align: center;
    }

    #login-panel > input {
      width: 150px;
      height: 25px;
      border-radius: 2px;
      border: none;
      outline: none;
      padding-left: 2px;
      font-family: 'Poppins';
      font-size: 12px;
    }

    #login-panel > button {
      transform: scale(0.8);
    }

    #submit {
      margin-top: 5px;
    }

    #cancel {
      background-color: rgb(220, 30, 30);
    }

    #cancel:hover {
      background-color: rgb(240, 50, 50);
    }

    .fade-enter-active, .fade-leave-active {
      transition: opacity 0.5s;
    }

    .fade-enter, .fade-leave-to {
      opacity: 0;
    }

    .error {
      font-weight: bold;
      color: red;
      font-size: 15px;
      margin: 10px 0px 0px 0px;
      line-height: 1.0;
    }

    #qrcontainer {
      width: 150px;
    }

    #qrcontainer > p{
      margin: 0px;
      font-size: 18px;
      color: black;
    }

</style>
