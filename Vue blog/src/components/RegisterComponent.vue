<template>
  <div>
    <div class="row">
      <div class="col s12 m8 offset-m2">
        <h3 class="cyan-text text-darken-4">Login</h3>
        <form v-on:submit.prevent="userRegister" id="userRegisterForm">
          <div class="row">
            <div class="input-field col s6">
              <input id="userName" name="name" type="text" v-model="userName">
              <label for="userName">Name</label>
              <span class="helper-text" data-error="Wrong name"></span>
            </div>
            <div class="input-field col s6">
              <input id="userSurname" name="surname" type="text" v-model="userSurname">
              <label for="userSurname">Surname</label>
              <span class="helper-text" data-error="Wrong surname"></span>
            </div>
          </div>
          <div class="row valign-wrapper">
            <div class="input-field col s6" v-if="!imageCheck">
              <input id="userImage" name="image" type="url" v-model="userImage">
              <label for="userImage">Image URL</label>
            </div>
            <div class="input-field col s6" v-else>
              <div class="file-field input-field">
                <div class="btn">
                  <span>File</span>
                  <input type="file" name="fileImage">
                </div>
                <div class="file-path-wrapper">
                  <input class="file-path validate" type="text">
                </div>
              </div>
            </div>
            <div class="input-field col s6">
              <div class="switch">
                <label>
                  URL
                  <input type="checkbox" v-model="imageCheck">
                  <span class="lever"></span>
                  Upload from computer
                </label>
              </div>
            </div>
          </div>
          <div class="row valign-wrapper">
            <div class="input-field col s6">
              <input id="userBirthday" type="text" class="datepicker">
              <label for="userBirthday">Birth day</label>
            </div>
            <div class="input-field col s6">
              <div class="switch">
                <label>
                  Male
                  <input type="checkbox" v-model="userSex">
                  <span class="lever"></span>
                  Female
                </label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <input id="userCountry" name="country" type="text" v-model="userCountry">
              <label for="userCountry">Country</label>
            </div>
            <div class="input-field col s6">
              <input id="userCity" name="city" type="text" v-model="userCity">
              <label for="userCity">City</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <input id="userEmail" name="email" type="email" v-model="userEmail">
              <label for="userEmail">E-mail</label>
              <span class="helper-text" data-error="Wrong e-mail"></span>
            </div>
            <div class="input-field col s6">
              <input id="userLogin" name="login" type="text" v-model="userLogin">
              <label for="userLogin">Login</label>
              <span class="helper-text" data-error="Wrong login"></span>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="userPassword" name="password" type="password" v-model="userPassword">
              <label for="userPassword">Password</label>
              <span class="helper-text" data-error="Wrong password"></span>
            </div>
            <div class="input-field col s12">
              <input id="userRepeatPassword" type="password" v-model="userRepeatPassword">
              <label for="userRepeatPassword">Repeat password</label>
              <span class="helper-text" data-error="Passwords do not match"></span>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <input type="submit" class="btn" value="Register" v-bind:disabled="submitDisable()">
            </div>
          </div>
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
      userRegisterURL: 'http://vueserver/userRegister.php',
      userName: '',
      userSurname: '',
      userImage: '',
      imageCheck: false,
      userBirthday: '',
      userSex: false,
      userCountry: '',
      userEmail: '',
      userCity: '',
      userLogin: '',
      userPassword: '',
      userRepeatPassword: '',
      registerError: false,
      toastErorrState: false
    }
  },
  methods: {
    submitDisable () {
      if (!this.userName) return true
      else if (!this.userSurname) return true
      else if (!/([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}/.test(this.userEmail)) return true
      else if (!/[a-zA-Z0-9]{3,}/.test(this.userLogin)) return true
      else if (!/[a-zA-Z0-9]{3,}/.test(this.userPassword)) return true
      else if (!/[a-zA-Z0-9]{3,}/.test(this.userRepeatPassword)) return true
      else if (this.userRepeatPassword !== this.userPassword) return true
    },
    inputToastError (input, inputName, maxNum) {
      if (input.length > maxNum) {
        if (!this.toastErorrState) {
          this.toastErorrState = true
          M.toast({html: inputName + ' must be less than ' + maxNum + ' characters', classes: 'red darken-1', completeCallback: () => { this.toastErorrState = false }})
        }
        return true
      }
      return false
    },
    userRegister () {
      var birthDate = document.querySelector('#userBirthday').value
      birthDate = birthDate.split(' ').join('-')
      var formData = new FormData(document.forms.userRegisterForm)
      formData.append('birthday', birthDate)
      this.$http.post(this.userRegisterURL, formData).then(res => {
        console.log(res.body)
        if (res.body === 'error') {
          this.registerError = true
          M.toast({html: 'User with such email or login already exist', classes: 'red darken-2'})
        } else {
          setTimeout(() => {
            this.$router.push('/login')
          }, 250)
        }
      })
    }
  },
  watch: {
    userName () {
      var inputClassList = document.querySelector('#userName').classList
      this.userName = this.userName.replace(/[^a-zA-ZА-Яа-я]/, '')
      if (this.inputToastError(this.userName, 'Name', 20)) this.userName = this.userName.slice(0, -1)
      if (this.userName) inputClassList.remove('invalid')
      else inputClassList.add('invalid')
    },
    userSurname () {
      var inputClassList = document.querySelector('#userSurname').classList
      this.userSurname = this.userSurname.replace(/[^a-zA-ZА-Яа-я]/, '')
      if (this.inputToastError(this.userSurname, 'Surname', 25)) this.userSurname = this.userSurname.slice(0, -1)
      if (this.userSurname) inputClassList.remove('invalid')
      else inputClassList.add('invalid')
    },
    userCountry () {
      this.userCountry = this.userCountry.replace(/[^a-zA-ZА-Яа-я]/, '')
      if (this.inputToastError(this.userCountry, 'Country', 20)) this.userCountry = this.userCountry.slice(0, -1)
    },
    userCity () {
      this.userCity = this.userCity.replace(/[^a-zA-ZА-Яа-я]/, '')
      if (this.inputToastError(this.userCity, 'City', 20)) this.userCity = this.userCity.slice(0, -1)
    },
    userEmail () {
      var inputClassList = document.querySelector('#userEmail').classList
      this.userEmail = this.userEmail.replace(/[А-Яа-я]/, '')
      if (/([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}/.test(this.userEmail)) inputClassList.remove('invalid')
      else inputClassList.add('invalid')
    },
    userLogin () {
      var inputClassList = document.querySelector('#userLogin').classList
      this.userLogin = this.userLogin.replace(/[^a-zA-Z0-9]/, '')
      if (this.inputToastError(this.userLogin, 'Login', 20)) this.userLogin = this.userLogin.slice(0, -1)
      if (/[a-zA-Z0-9]{3,}/.test(this.userLogin)) inputClassList.remove('invalid')
      else inputClassList.add('invalid')
    },
    userPassword () {
      var inputClassList = document.querySelector('#userPassword').classList
      if (this.inputToastError(this.userPassword, 'Password', 40)) this.userPassword = this.userPassword.slice(0, -1)
      if (/[a-zA-Z0-9]{3,}/.test(this.userPassword)) inputClassList.remove('invalid')
      else inputClassList.add('invalid')
    },
    userRepeatPassword () {
      var inputClassList = document.querySelector('#userRepeatPassword').classList
      if (this.userRepeatPassword === this.userPassword) inputClassList.remove('invalid')
      else inputClassList.add('invalid')
    }
  },
  mounted () {
    var date = new Date()
    date.setFullYear(date.getFullYear() - 18)
    var elems = document.querySelectorAll('.datepicker')
    M.Datepicker.init(elems, {defaultDate: date, yearRange: [new Date().getFullYear() - 100, new Date().getFullYear() - 18], format: 'yyyy mm dd'})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
