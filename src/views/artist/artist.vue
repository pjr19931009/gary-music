<template>
  <div class="artist">
    <div class="section">
      <div class="art-info">
        <div class="art-avatar">
          <img :src="artistAvatar" />
        </div>
        <div class="art-desc">
          <div class="art-name">
            {{ artist.name }}
          </div>
          <div class="briefDesc" ref="briefDesc">
            {{ artist.briefDesc }}
          </div>
          <show-desc v-if="isShow" :title="artist.name" :content="artist.briefDesc" />
        </div>
      </div>
      <div class="art-nav">
        <div
          :class="['nav-item', { active: isActive === index }, 'pointer']"
          v-for="(item, index) in navTitle"
          :key="item"
          @click="hangdleNavItem(index)"
        >
          {{ item }}
        </div>
      </div>
      <div class="art-content">
        <router-view />
      </div>
    </div>
    <div class="aside">
      <div class="title">相似歌手</div>
      <similar-list :imgArr="imgArr" @hanlderClick="hanlderClick" />
    </div>
  </div>
</template>

<script>
import similarList from '@/components/similarList/similarList'
import showDesc from '@/components/showDesc/showDesc'
export default {
  components: { similarList, showDesc },
  data() {
    return {
      artID: 0,
      artist: {},
      isShow: false,
      navTitle: ['热门歌曲', '专辑', '相关MV'],
      isActive: 0,
      simiSinger: []
    }
  },
  computed: {
    artistAvatar() {
      if (this.artist.cover) {
        return this.artist.cover + '?param=500y350'
      }
      return ''
    },
    imgArr() {
      if (this.simiSinger.length) {
        let arr = this.simiSinger.map(item => {
          return {
            id: item.id,
            picUrl: item.picUrl + '?param=50y50',
            nickname: item.name,
            albumSize: item.albumSize,
            musicSize: item.musicSize
          }
        })
        return arr
      }
    }
  },
  methods: {
    async artistDetail(id) {
      const {
        data: {
          code,
          data: { artist }
        }
      } = await this.$api.artistDetail({ id })
      if (code === 200) {
        this.artist = artist
        this.$bus.$emit('mvsCount', this.artist.mvSize)
      }
    },
    async simiArt(id) {
      const {
        data: { code, artists }
      } = await this.$api.simiArt({ id })
      if (code === 200) {
        this.simiSinger = artists
      }
    },
    showAllDesc() {
      if (this.$refs.briefDesc.clientHeight > 280) {
        return true
      }
      return false
    },
    hangdleNavItem(index) {
      switch (index) {
        case 0:
          this.$router.push(`/artist?id=${this.artID}`)
          break
        case 1:
          this.$router.push(`/artist/albumList?id=${this.artID}`)
          break
        case 2:
          this.$router.push(`/artist/artMV?id=${this.artID}`)
          break
      }
    },
    goRoute(current) {
      this.navTitle.forEach((item, index) => {
        if (item === current.meta.title) {
          this.isActive = index
        }
      })
    },
    hanlderClick(item) {
      this.artID = item.id
      this.$router.push(`/artist?id=${this.artID}`)
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.name === 'artMV') {
      to.params.mvsCount = this.artist.mvSize
    }
    this.artID = to.query.id
    this.artistDetail(this.artID)
    this.simiArt(this.artID)
    this.goRoute(to)
    next()
  },
  created() {
    this.artID = this.$route.query.id
    this.artistDetail(this.artID)
    this.simiArt(this.artID)
    this.goRoute(this.$route)
  },
  updated() {
    this.$nextTick(() => {
      this.isShow = this.showAllDesc()
    })
  }
}
</script>
<style lang="scss" scoped>
.artist {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  .section {
    flex: 1 1 auto;
    background-color: #fff;
    padding: 10px;
    .art-info {
      display: flex;
      justify-content: flex-start;
      .art-avatar {
        flex: 0 0 500px;
        height: 350px;
        margin-right: 20px;
      }
      .art-desc {
        color: $textColor;
        .art-name {
          font-size: 20px;
          margin-bottom: 10px;
        }
        .briefDesc {
          font-size: 14px;
          line-height: 20px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 15;
        }
      }
    }
    .art-nav {
      margin-top: 20px;
      display: flex;
      justify-content: space-around;
      border-bottom: 1px solid #d5d5d5;
      .nav-item {
        flex: 1 0 auto;
        text-align: center;
        width: 0;
        height: 50px;
        line-height: 50px;
        font-size: 20px;
      }
      .nav-item.active {
        color: $activeColor;
      }
    }
  }
  .aside {
    flex: 0 0 350px;
    background-color: #ffffff;
    padding: 10px;
    margin-left: 10px;
    box-sizing: border-box;
    .title {
      font-size: 16px;
      padding: 0;
    }
  }
}
</style>
