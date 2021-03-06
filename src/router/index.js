import Vue from 'vue'
import VueRouter from 'vue-router'

const Layout = () => import(/* webpackChunkName: "layout" */ '@/views/layout/layout')
const Home = () => import(/* webpackChunkName: "home" */ '@/views/home/home')
const Login = () => import(/* webpackChunkName: "login" */ '@/views/login/login')
const Search = () => import(/* webpackChunkName: "search" */ '@/views/search/search')
const SearchSong = () => import(/* webpackChunkName: "search" */ '@/views/search/song/song')
const SearchSinger = () => import(/* webpackChunkName: "search" */ '@/views/search/singer/singer')
const SearchPlaylist = () =>
  import(/* webpackChunkName: "search" */ '@/views/search/playlist/playlist')
const SearchMV = () => import(/* webpackChunkName: "search" */ '@/views/search/mv/mv')
const SearchUser = () => import(/* webpackChunkName: "search" */ '@/views/search/user/user')
const SearchAlbum = () => import(/* webpackChunkName: "search" */ '@/views/search/album/album')
const TopList = () => import(/* webpackChunkName: "topList" */ '@/views/topList/topList')
const Category = () => import(/* webpackChunkName: "category" */ '@/views/category/category')
const Singers = () => import(/* webpackChunkName: "singers" */ '@/views/singers/singers')
const Mv = () => import(/* webpackChunkName: "mv" */ '@/views/mv/mv')
const PlaylistDetail = () =>
  import(/* webpackChunkName: "playlistDetail" */ '@/views/playlistDetail/playlistDetail')
const Artist = () => import(/* webpackChunkName: "artist" */ '@/views/artist/artist')
const HotMusic = () => import(/* webpackChunkName: "hotMusic" */ '@/views/artist/hotMusic/hotMusic')
const AlbumList = () =>
  import(/* webpackChunkName: "albumList" */ '@/views/artist/albumList/albumList')
const ArtMV = () => import(/* webpackChunkName: "artMV" */ '@/views/artist/artMV/artMV')
const MVDetail = () => import(/* webpackChunkName: "mvDetail" */ '@/views/mvDetail/mvDetail')
const User = () => import(/* webpackChunkName: "user" */ '@/views/user/user')
const Error = () => import(/* webpackChunkName: "error" */ '@/views/error/404')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'home',
        component: Home,
        meta: {
          title: '????????????',
          keepAlive: true
        }
      },
      {
        path: 'search',
        name: 'search',
        redirect: 'search/song',
        component: Search,
        meta: {
          title: '??????',
          keepAlive: false
        },
        children: [
          {
            path: 'song',
            component: SearchSong,
            name: 'searchSong',
            meta: {
              title: '????????????',
              keepAlive: false
            }
          },
          {
            path: 'album',
            component: SearchAlbum,
            name: 'searchAlbum',
            meta: {
              title: '????????????',
              keepAlive: false
            }
          },
          {
            path: 'singer',
            component: SearchSinger,
            name: 'searchSinger',
            meta: {
              title: '????????????',
              keepAlive: false
            }
          },
          {
            path: 'playlist',
            component: SearchPlaylist,
            name: 'searchPlaylist',
            meta: {
              title: '????????????',
              keepAlive: false
            }
          },
          {
            path: 'user',
            component: SearchUser,
            name: 'searchUser',
            meta: {
              title: '????????????',
              keepAlive: false
            }
          },
          {
            path: 'mv',
            component: SearchMV,
            name: 'searchMV',
            meta: {
              title: '??????mv',
              keepAlive: false
            }
          }
        ]
      },
      {
        path: 'topList',
        name: 'topList',
        component: TopList,
        meta: {
          title: '?????????',
          keepAlive: true
        }
      },
      {
        path: 'category',
        name: 'category',
        component: Category,
        meta: {
          title: '??????',
          keepAlive: true
        }
      },
      {
        path: 'singers',
        name: 'singers',
        component: Singers,
        meta: {
          title: '??????',
          keepAlive: true
        }
      },
      {
        path: 'mv',
        name: 'mv',
        component: Mv,
        meta: {
          title: 'MV',
          keepAlive: true
        }
      },
      {
        path: 'playlist-detail',
        name: 'playlistDetail',
        component: PlaylistDetail,
        meta: {
          title: '????????????',
          keepAlive: false
        }
      },
      {
        path: 'artist',
        component: Artist,
        meta: {
          title: '????????????',
          keepAlive: false
        },
        children: [
          {
            path: '/',
            name: 'artist',
            component: HotMusic,
            meta: {
              title: '????????????'
            }
          },
          {
            path: 'albumList',
            name: 'albumList',
            component: AlbumList,
            meta: {
              title: '??????'
            }
          },
          {
            path: 'artMV',
            name: 'artMV',
            component: ArtMV,
            meta: {
              title: '??????MV'
            }
          }
        ]
      },
      {
        path: 'mv-detail',
        name: 'mvDetail',
        component: MVDetail,
        meta: {
          title: 'mv??????',
          keepAlive: false
        }
      },
      {
        path: 'user',
        name: 'user',
        component: User,
        meta: {
          title: '??????',
          keepAlive: false
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '??????'
    }
  },
  {
    path: '*',
    name: '404',
    component: Error,
    meta: {
      title: '404'
    }
  }
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

export default router
