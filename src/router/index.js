import { createRouter, createWebHashHistory } from 'vue-router'
import Start from '../views/Start'
import Profile from '../views/Profile'
import Update from '../views/Update'
import Battlelogs from '../views/Battlelogs'
import More from '../views/More'
import Skins from '../views/Skins'
import Joinus from '../views/Joinus'
import ClubSearch from "@/views/ClubSearch";
import Events from "@/views/Events";
import EventDetail from "@/views/EventDetail";

const routes = [
  {
    path: '/',
    name: 'start',
    component: Start
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/update',
    name: 'update',
    component: Update
  },
  {
    path: '/battlelogs',
    name: 'battlelogs',
    component: Battlelogs
  },
  {
    path: '/more',
    name: 'more',
    component: More
  },
  {
    path: '/skins',
    name: 'skins',
    component: Skins
  },
  {
    path: '/join',
    name: 'join',
    component: Joinus
  },
  {
    path: '/club',
    name: 'club',
    component: ClubSearch
  },
  {
    path: '/events',
    name: 'events',
    component: Events
  },
  {
    path: '/detail',
    name: 'detail',
    component: EventDetail,
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
