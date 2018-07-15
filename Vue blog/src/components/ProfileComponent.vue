<template>
  <div class="row">
    <div class="col s12 m4">
      <div class="card center-align teal-text">
        <div class="card-image">
          <img v-bind:src="user.image">
        </div>
        <div class="card-content">
          <h5>{{user.name}} {{user.surname}}</h5>
        </div>
      </div>
    </div>
    <div class="col s12 m8">
      <div class="card">
        <div class="card-content">
          <ul class="collection">
            <li class="collection-item row"><span class="col s5">Birthday:</span><span class="col s7 teal-text">{{user.birthday}}</span></li>
            <li class="collection-item row"><span class="col s5">Sex:</span><span class="col s7 teal-text">{{user.sex}}</span></li>
            <li class="collection-item row"><span class="col s5">From:</span><span class="col s7 teal-text">{{user.country}}, {{user.city}}</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeComponent',
  data () {
    return {
      // PRODUCTION
      // getPostURL: 'http://mesya.zzz.com.ua/server/getPost.php',
      getUserURL: 'http://vueserver/getUser.php',
      user: [],
      isUserPage: false
    }
  },
  methods: {
    getUser (userId) {
      var formData = new FormData()
      formData.append('id', userId)
      this.$http.post(this.getUserURL, formData).then(res => {
        this.user = res.data[0]
      }, err => {
        console.log('Error! Connecting to server is ' + err.ok)
      })
    }
  },
  created () {
    var userId = this.$route.params.id
    this.getUser(userId)
    if (localStorage.getItem('userId') === userId) {
      this.isUserPage = true
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .collection {
    border: 0;
  }
  .collection-item {
    color: #868686;
  }
</style>
