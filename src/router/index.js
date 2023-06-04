import { createRouter, createWebHashHistory } from 'vue-router'
import Start from '../views/Start'
import Profile from '../views/Profile'
import Update from '../views/Update'
import Battlelogs from '../views/Battlelogs'
import More from '../views/More'
import Skins from '../views/Skin/Skins'
import AssortSkins from '../views/Skin/AssortSkins'
import AssortSkinsDetail from '../views/Skin/AssortSkinsDetail'
import Joinus from '../views/Joinus'
import ClubSearch from "@/views/ClubSearch";
import Events from "@/views/Events";
import EventDetail from "@/views/EventDetail";
import BrawlerData from "@/views/BrawlerData";
import TacticsBoard from "@/views/TacticsBoard";
import MapRank from "@/views/MapRank";
import Rank from "@/views/Rank/Rank";
import BattleDetail from "@/views/BattleDetail";

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
    path: '/assort_skins/detail',
    name: 'AssortSkinsDetail',
    component: AssortSkinsDetail
  },
  {
    path: '/assort_skins',
    name: 'assort_skins',
    component: AssortSkins
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
  },
  {
    path: '/brawlerData',
    name: 'brawlerData',
    component: BrawlerData,
  },
  {
    path: '/tactics_board',
    name: 'tactics_board',
    component: TacticsBoard,
  },
  {
    path: '/maprank',
    name: 'maprank',
    component: MapRank,
  },
  {
    path: '/rank',
    name: 'rank',
    component: Rank,
  },
  {
    path: '/battleDetail',
    name: 'battleDetail',
    component: BattleDetail,
  }
]

const router = createRouter({
  mode: 'hash',
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // eslint-disable-next-line
  if (_hmt) {
    if (to.path) {
      // eslint-disable-next-line
      _hmt.push(['_trackPageview', '/#' + to.fullPath]);
    }
  }
  next();
});

export default router
