import Vue from 'vue'
import Router from 'vue-router'
import HomeComponent from '@/components/HomeComponent'
import LoginComponent from '@/components/LoginComponent'
import RegisterComponent from '@/components/RegisterComponent'
import AddPostComponent from '@/components/AddPostComponent'
import PostComponent from '@/components/PostComponent'
import ProfileComponent from '@/components/ProfileComponent'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HomeComponent
    },
    {
      path: '/login',
      component: LoginComponent
    },
    {
      path: '/register',
      component: RegisterComponent
    },
    {
      path: '/addpost',
      component: AddPostComponent
    },
    {
      path: '/post/:id',
      name: 'post',
      component: PostComponent
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: ProfileComponent
    }
  ]
})
