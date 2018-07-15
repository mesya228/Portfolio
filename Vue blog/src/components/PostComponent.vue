<template>
  <div class="row">
    <div class="col s12">
      <div class="card">
        <div class="card-image" v-if="post.imageURL">
          <img class="materialboxed" v-bind:src="post.imageURL">
        </div>
        <div class="card-content">
          <h3 class="card-title bold">{{post.title}}</h3>
          <p>{{post.description}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import M from 'materialize-css/dist/js/materialize.js'
export default {
  name: 'HomeComponent',
  data () {
    return {
      // PRODUCTION
      // getPostURL: 'http://mesya.zzz.com.ua/server/getPost.php',
      getPostURL: 'http://vueserver/getPost.php',
      post: []
    }
  },
  methods: {
    getPost (postId) {
      var formData = new FormData()
      formData.append('id', postId)
      this.$http.post(this.getPostURL, formData).then(res => {
        res.data.map((data) => {
          this.post = data
        })
      }, err => {
        console.log('Error! Connecting to server is ' + err.ok)
      })
    }
  },
  created () {
    var postId = this.$route.params.id
    this.getPost(postId)
  },
  mounted () {
    var elems = document.querySelector('.materialboxed')
    M.Materialbox.init(elems)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
