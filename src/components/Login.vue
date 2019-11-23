<template>
  <div id="login">
    <button>Login</button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
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

</style>
