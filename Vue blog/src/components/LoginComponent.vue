<template>
  <div>
    <div class="row">
      <div class="col s12 m8 offset-m2">
        <h3 class="cyan-text text-darken-4">Login</h3>
        <form v-on:submit.prevent="login" id="userLoginForm">
          <div class="input-field">
            <input id="userEmail" type="text" name="login">
            <label for="userEmail">E-mail or Login</label>
          </div>
          <div class="input-field">
            <input id="userPassword" type="password" name="password">
            <label for="userPassword">Password</label>
          </div>
          <input type="submit" class="btn" value="Login">
          <router-link to="register" class="btn">Register</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import M from 'materialize-css/dist/js/materialize.js'
export default {
  name: 'LoginComponent',
  data () {
    return {
      userLoginURL: 'http://vueserver/userLogin.php',
      loginError: false
    }
  },
  methods: {
    login () {
      var formData = new FormData(document.forms.userLoginForm)
      this.$http.post(this.userLoginURL, formData).then(res => {
        if (res.body) {
          localStorage.setItem('userId', res.body[0].id)
          localStorage.setItem('userRules', res.body[0].rules)
          this.$router.push('/')
        } else {
          M.toast({html: 'Wrong login or password!', classes: 'red darken-2'})
          this.loginError = true
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
