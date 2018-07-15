<template>
  <div>
    <div class="row">
      <div class="col s12 center-align red-text text-darken-4" v-if="postsDownloadError">
        <h4>Error! Server not responding</h4>
      </div>
    </div>
    <div class="row">
      <transition-group name="posts-group">
        <div class="col s12 m6" v-for="post in posts" v-bind:key="post.id">
          <div class="card hoverable" v-bind:class="{ medium: post.imageURL }">
            <div class="card-image waves-effect waves-light waves-block" v-if="post.imageURL">
              <img v-bind:src="post.imageURL" class="activator responsive-img">
            </div>
            <div class="card-content">
              <router-link v-bind:to="{ name: 'post', params: { id: post.id } }" class="card-title blue-text text-darken-4">{{post.title}}</router-link>
              <p v-if="!post.imageURL">{{post.description}}</p>
            </div>
            <div class="card-action">
              <p>
                <router-link v-bind:to="{ name: 'profile', params: { id: post.authorId } }">{{ post.name }} {{ post.surname }}</router-link>
                <span class="right teal-text">{{post.date}}</span>
              </p>
            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4">{{post.title}}<i class="material-icons right">close</i></span>
              <p>{{post.description}}</p>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
    <div class="row" v-show="!isPostsDownloaded && !postsDownloadError">
      <div class="col s12 center-align">
        <div class="preloader-wrapper active">
          <div class="spinner-layer spinner-green-only">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div><div class="gap-patch">
              <div class="circle"></div>
            </div><div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
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
      // getPostsURL: 'http://mesya.zzz.com.ua/server/getPosts.php',
      getPostsURL: 'http://vueserver/getPosts.php',
      posts: [],
      postsAmount: 6,
      lastPostNum: 0,
      isPostsDownloaded: false,
      isPostsEnd: false,
      postsDownloadError: false
    }
  },
  methods: {
    getPosts () {
      if (this.isPostsEnd) return
      this.isPostsDownloaded = false
      var formData = new FormData()
      formData.append('from', this.lastPostNum)
      formData.append('amount', this.postsAmount)
      this.$http.post(this.getPostsURL, formData).then(res => {
        if (res.data.length === 0) {
          this.isPostsEnd = true
        }
        res.data.map((data) => {
          this.posts.push(data)
        })
        this.isPostsDownloaded = true
      }, err => {
        this.postsDownloadError = true
        console.log('Error! Connecting to server is ' + err.ok)
      })
    },
    downloadMorePosts () {
      this.lastPostNum += this.postsAmount
      this.getPosts()
    },
    handleScroll (event) {
      var scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      )
      if (document.documentElement.clientHeight + window.pageYOffset >= scrollHeight) {
        this.downloadMorePosts()
      }
    }
  },
  created () {
    this.getPosts()
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .posts-group-enter-active, .posts-group-leave-active {
    transition: all 1s;
  }
  .posts-group-enter, .posts-group-leave-to /* .list-leave-active до версии 2.1.8 */ {
    transform: rotateX(-90deg);
  }
</style>
