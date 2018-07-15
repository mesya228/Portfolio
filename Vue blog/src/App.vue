<template>
  <div id="app">
    <nav class="teal accent-4">
      <div class="nav-wrapper container">
       <router-link to="/" class="brand-logo">Thoughts</router-link>
        <a href="#" data-target="mobile-nav" class="sidenav-trigger hide-on-med-and-up show-on-small"><i class="material-icons">menu</i></a>
        <ul class="right hide-on-small-only">
          <li v-on:click="addPulseClass = false" v-if="userEntered">
            <router-link to="/addpost" class="btn-floating halfway-fab waves-effect waves-light teal" v-bind:class="{ pulse: addPulseClass }">
              <i class="material-icons">add</i>
            </router-link>
          </li>
          <li><router-link to="/">Home</router-link></li>
          <li v-if="!userEntered"><router-link to="/login">Login</router-link></li>
          <li v-if="userEntered"><router-link v-bind:to="{ name: 'profile', params: { id: userId } }">Profile</router-link></li>
          <li v-if="userEntered"><a class="modal-trigger" href="#modalLogout">Logout</a></li>
        </ul>
      </div>
    </nav>
    <ul class="sidenav" id="mobile-nav">
      <li v-if="userEntered"><router-link to="/addpost" class="sidenav-close">Add news<i class="material-icons">add</i></router-link></li>
      <li><router-link to="/" class="sidenav-close">Home</router-link></li>
      <li v-if="!userEntered"><router-link to="/login" class="sidenav-close">Login</router-link></li>
      <li v-if="userEntered"><router-link to="/profile" class="sidenav-close">Profile</router-link></li>
      <li v-if="userEntered" class="sidenav-close"><a class="modal-trigger" href="#modalLogout">Logout</a></li>
    </ul>
    <router-view class="container"></router-view>
    <div id="modalLogout" class="modal">
      <div class="modal-content">
        <h4>Do you really want to logout?</h4>
      </div>
      <div class="modal-footer">
        <a class="modal-close waves-effect waves-green btn-flat" v-on:click="logout">Yes</a>
        <a class="modal-close waves-effect waves-green btn-flat">No</a>
      </div>
    </div>
  </div>
</template>

<script>
import M from 'materialize-css/dist/js/materialize.js'
export default {
  name: 'App',
  data () {
    return {
      userEntered: false,
      userid: '',
      addPulseClass: {
        pulse: true,
        '': false,
        instance: ''
      }
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.userEntered = false
      this.$router.push('/')
    }
  },
  watch: {
    $route () {
      if (!this.userEntered) {
        if (localStorage.getItem('userId')) {
          this.userEntered = true
        }
      }
    }
  },
  created () {
    if (localStorage.getItem('userId')) {
      this.userEntered = true
      this.userId = localStorage.getItem('userId')
    }
  },
  mounted () {
    var elems = document.querySelectorAll('.sidenav')
    M.Sidenav.init(elems)
    elems = document.querySelectorAll('.modal')
    M.Modal.init(elems)
  }
}
</script>

<style>
  nav {
    margin-bottom: 50px;
  }
  .router-link-exact-active:not(.brand-logo){
    background-color: rgba(0, 0, 0, 0.11);
  }
</style>
<!--
window.pageYOffset
424
window.pageYOffset
324
-->
