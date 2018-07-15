<template>
  <div>
    <div class="row">
      <div class="col s12 m8 offset-m2">
        <h3 class="cyan-text text-darken-4">Add post</h3>
        <form v-on:submit.prevent="addPost" id="newPostForm">
          <div class="input-field">
            <i class="material-icons prefix">title</i>
            <input id="postTitle" name="title" type="text" v-model="postTitle" v-bind:class="titleValidate">
            <label for="postTitle">Title</label>
            <span class="helper-text" data-error="Title must contain more than 3 words"></span>
          </div>
          <div class="input-field">
            <i class="material-icons prefix">description</i>
            <textarea id="postDescription" class="materialize-textarea" name="description" type="text" v-model="postDescription" v-bind:class="descriptionValidate"></textarea>
            <label for="postDescription">Description</label>
            <span class="helper-text" data-error="Description must contain more than 5 words"></span>
          </div>
          <div class="input-field">
            <h6 class="cyan-text text-darken-4">Upload image by</h6>
            <div class="switch">
              <label>
                URL
                <input type="checkbox" v-model="imageCheck">
                <span class="lever"></span>
                Upload from computer
              </label>
            </div>
          </div>
          <div class="input-field" v-if="!imageCheck">
            <i class="material-icons prefix">image</i>
            <input id="postImage" name="image" type="url" class="validate" v-model="postImage" >
            <label for="postImage">Image URL</label>
          </div>
          <div class="input-field" v-else>
            <div class="file-field input-field">
              <div class="btn">
                <span>File</span>
                <input type="file" name="postImage">
              </div>
              <div class="file-path-wrapper">
                <input class="file-path validate" type="text">
              </div>
            </div>
          </div>
          <input type="submit" class="btn" value="Add post" v-bind:disabled="inputsCheck()">
        </form>
      </div>
    </div>
    <div class="row" v-if="postSended">
      <div class="col s12 center-align">
        <div class="preloader-wrapper small active">
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
      // addPostURL: 'http://mesya.zzz.com.ua/server/addPost.php',
      addPostURL: 'http://vueserver/addPost.php',
      postTitle: '',
      postDescription: '',
      postImage: '',
      imageCheck: false,
      postSended: false
    }
  },
  methods: {
    addPost () {
      var formData = new FormData(document.forms.newPostForm)
      formData.append('authorId', localStorage.getItem('userId'))
      this.postSended = true
      this.$http.post(this.addPostURL, formData)
      setTimeout(() => {
        this.$router.push('/')
      }, 250)
    },
    inputsCheck () {
      var postTitleWords = this.postTitle.split(' ')
      var postDescriptionWords = this.postDescription.split(' ')
      if (postTitleWords.length >= 3 && postDescriptionWords.length >= 5) {
        return false
      }
      return true
    }
  },
  computed: {
    titleValidate () {
      var postTitleWords = this.postTitle.split(' ')
      return {
        invalid: postTitleWords.length < 3 && this.postTitle !== '',
        valid: postTitleWords.length >= 3
      }
    },
    descriptionValidate () {
      var postDescriptionWords = this.postDescription.split(' ')
      return {
        invalid: postDescriptionWords.length < 5 && this.postDescription !== '',
        valid: postDescriptionWords.length >= 5
      }
    }
  },
  created () {
    if (!localStorage.getItem('userId')) {
      this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
