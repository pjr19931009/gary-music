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
          title: '发现音乐',
          keepAlive: true
        }
      },
      {
        path: 'search',
        name: 'search',
        redirect: 'search/song',
        component: Search,
        meta: {
          title: '搜索',
          keepAlive: false
        },
        children: [
          {
            path: 'song',
            component: SearchSong,
            name: 'searchSong',
            meta: {
              title: '搜索单曲',
              keepAlive: false
            }
          },
          {
            path: 'album',
            component: SearchAlbum,
            name: 'searchAlbum',
            meta: {
              title: '搜索专辑',
              keepAlive: false
            }
          },
          {
            path: 'singer',
            component: SearchSinger,
            name: 'searchSinger',
            meta: {
              title: '搜索歌手',
              keepAlive: false
            }
          },
          {
            path: 'playlist',
            component: SearchPlaylist,
            name: 'searchPlaylist',
            meta: {
              title: '搜索歌单',
              keepAlive: false
            }
          },
          {
            path: 'user',
            component: SearchUser,
            name: 'searchUser',
            meta: {
              title: '搜索用户',
              keepAlive: false
            }
          },
          {
            path: 'mv',
            component: SearchMV,
            name: 'searchMV',
            meta: {
              title: '搜索mv',
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
          title: '排行榜',
          keepAlive: true
        }
      },
      {
        path: 'category',
        name: 'category',
        component: Category,
        meta: {
          title: '歌单',
          keepAlive: true
        }
      },
      {
        path: 'singers',
        name: 'singers',
        component: Singers,
        meta: {
          title: '歌手',
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
          title: '歌单详情',
          keepAlive: false
        }
      },
      {
        path: 'artist',
        component: Artist,
        meta: {
          title: '歌手详情',
          keepAlive: false
        },
        children: [
          {
            path: '/',
            name: 'artist',
            component: HotMusic,
            meta: {
              title: '热门歌曲'
            }
          },
          {
            path: 'albumList',
            name: 'albumList',
            component: AlbumList,
            meta: {
              title: '专辑'
            }
          },
          {
            path: 'artMV',
            name: 'artMV',
            component: ArtMV,
            meta: {
              title: '相关MV'
            }
          }
        ]
      },
      {
        path: 'mv-detail',
        name: 'mvDetail',
        component: MVDetail,
        meta: {
          title: 'mv详情',
          keepAlive: false
        }
      },
      {
        path: 'user',
        name: 'user',
        component: User,
        meta: {
          title: '个人',
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
      title: '登录'
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
