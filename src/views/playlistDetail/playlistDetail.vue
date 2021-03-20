<template>
  <div class="playlist-detail">
    <div class="pd-section">
      <div class="pd-header">
        <div id="avatar" class="pd-avatar">
          <img
            :src="playlist.coverImgUrl + '?param=200y200'"
            class="pd-avatar-img"
            v-show="playlist.coverImgUrl"
          />
        </div>
        <div class="pd-info">
          <div class="pd-title">{{ playlist.name }}</div>
          <div class="pd-creator">
            <div class="creator-avatar">
              <img
                :src="creator.avatarUrl + '?param=50y50'"
                v-show="creator.avatarUrl"
                class="creator-avatar-img"
              />
            </div>
            <div class="creator-name">
              {{ creator.nickname }}
            </div>
            <div class="create-time">{{ playlist.createTime | timestampToDate }}</div>
          </div>
          <div class="pd-tags">
            <span>标签:</span>
            <tags :tag="tags" :currentId="-1" />
          </div>
          <div class="pd-desc">
            <pre class="description" ref="description">{{ playlist.description }}</pre>
          </div>
          <show-desc v-if="descShow" :title="playlist.name" :content="playlist.description" />
        </div>
      </div>
      <div v-loading="loading">
        <template v-if="songList.length">
          <div class="pd-box">
            <div class="pd-button ">
              <button class="play-all pointer" @click="startAll">
                <i class="iconfont icon-playall"></i>
                播放全部
              </button>
              <button class="favorite pointer" @click="favoriteClick">
                <i class="iconfont icon-shoucang"></i>
                收藏
              </button>
            </div>
            <song-table class="pd-table" :songList="songList" />
          </div>
        </template>
        <template v-else>
          <div class="no-data" v-show="!loading">暂无歌曲</div>
        </template>
      </div>
    </div>
    <div class="pd-aside">
      <div class="pd-sub">
        <div class="title">喜欢歌单的人</div>
        <similar-list :imgArr="imgArr" @hanlderClick="hanlderUser" />
      </div>
      <div class="pd-recommend">
        <div class="title">相关推荐</div>
        <div
          class="related-playlists pointer clearfix"
          v-for="item in relatedPlaylists"
          :key="item.id"
        >
          <el-image :src="item.coverImgUrl + '?param=75y75'" @click="itemClick(item)" lazy>
            <div slot="placeholder" class="image-slot">
              <div class="dot">加载中...</div>
            </div>
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <div class="rp-name" @click="itemClick(item)">{{ item.name }}</div>
          <div class="rp-creator" @click="hanlderUser(item)">
            {{ 'by ' + item.creator.nickname }}
          </div>
        </div>
      </div>
      <div class="pd-comments">
        <div class="title">
          精彩评论
        </div>
        <div class="hot-comments-box">
          <div class="hot-comment clearfix" v-for="item in hotComments" :key="item.commentId">
            <img :src="item.user.avatarUrl + '?param=50y50'" class="comment-avatar" />
            <div class="comment-info">
              <span class="comment-username pointer" @click="hanlderUser(item)">{{
                item.user.nickname
              }}</span>
              <span class="comment-time">{{ item.time | timeToNow }}</span>
              <div class="comment-content">{{ item.content }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tags from '@/components/tags/tags'
import songTable from '@/components/songTable/songTable'
import similarList from '@/components/similarList/similarList'
import showDesc from '@/components/showDesc/showDesc'
export default {
  components: {
    tags,
    songTable,
    similarList,
    showDesc
  },
  data() {
    return {
      reqOptions: {
        id: 0,
        s: 12
      },
      playlist: {},
      songListId: [],
      songList: [],
      creator: {},
      tags: [],
      descShow: false,
      subscribers: [],
      relatedPlaylists: [],
      hotComments: [],
      loading: false
    }
  },
  computed: {
    imgArr() {
      if (this.subscribers.length) {
        let arr = this.subscribers.map(item => {
          return {
            id: item.userId,
            nickname: item.nickname,
            picUrl: item.avatarUrl + '?param=40y40'
          }
        })
        return arr
      }
    }
  },
  methods: {
    async getData() {
      this.loading = true
      const {
        data: { code, playlist }
      } = await this.$api.playlistDetail(this.reqOptions)
      this.tags = playlist.tags = playlist.tags.map(item => {
        return {
          name: item,
          catId: -1
        }
      })
      if (code === 200) {
        this.playlist = playlist
        this.subscribers = playlist.subscribers
        this.songListId = this.$utils.getIds(playlist.trackIds)
        this.creator = playlist.creator
        this.descHeight()
        //每1千条数据为一组
        let timestamp = new Date().valueOf()
        let arrLength = 1000
        let idsArr = []
        for (let i = 0; i < this.songListId.length; i += arrLength) {
          idsArr.push(this.songListId.slice(i, i + arrLength))
        }
        this.getSongDesc(idsArr, timestamp)
      }
    },
    async getSongDesc(idsArr, timestamp) {
      let songList = []
      for (let ids of idsArr) {
        try {
          const {
            data: { code, songs }
          } = await this.$api.getSongDesc({ ids: ids.join(','), timestamp })
          if (code === 200) {
            songList = songList.concat(songs)
          } else {
            return (this.songList = [])
          }
        } catch (error) {
          console.log(error)
        }
      }
      this.songList = songList.map(song => {
        return {
          name: song.name,
          album: song.al.name,
          art: song.ar,
          duration: Math.floor(song.dt / 1000),
          id: song.id,
          picUrl: song.al.picUrl,
          album: song.al
        }
      })
      this.songList = this.$utils.assignSongList(this.songList)
      this.loading = false
    },
    async recommendedRelatedPlaylists(id) {
      const {
        data: { code, playlists }
      } = await this.$api.recommendedRelatedPlaylists({ id })
      if (code === 200) {
        this.relatedPlaylists = playlists
      }
    },
    async playlistComment(id) {
      const {
        data: { code, comments, hotComments }
      } = await this.$api.playlistComment({ id })
      if (code === 200) {
        this.hotComments = hotComments
      }
    },
    itemClick(item) {
      this.$router.push(`/playlist-detail?id=${item.id}`)
    },
    descHeight() {
      this.$nextTick(() => {
        if (this.$refs.description.offsetHeight > 50) {
          this.$refs.description.classList.add('active')
          this.descShow = true
        }
      })
    },
    startAll() {
      if (this.songList.length) {
        this.$store.dispatch('startSong', this.songList[0])
      }
    },
    favoriteClick() {
      this.$message({
        message: '暂不支持登录,无法收藏哦',
        offset: 100
      })
    },
    hanlderUser(item) {
      item = item.creator || item.user || item
      this.$router.push({ name: 'user', query: { uid: item.id || item.userId || '' } })
    }
  },
  watch: {
    '$route.query.id': function(newVal, oldVal) {
      this.reqOptions.id = newVal
      this.getData()
    }
  },
  created() {
    this.descShow = false
    this.reqOptions.id = this.$route.query.id
    this.getData()
    this.recommendedRelatedPlaylists(this.reqOptions.id)
    this.playlistComment(this.reqOptions.id)
  }
}
</script>
<style lang="scss" scoped>
.playlist-detail {
  width: 100%;
  background-color: #eeeeee;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  .pd-section {
    padding: 10px;
    flex: 1 1 auto;
    background-color: #ffffff;
    box-sizing: border-box;
    .pd-header {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      margin-bottom: 20px;
      .pd-avatar {
        margin-right: 10px;
        width: 200px;
        height: 200px;
        .pd-avatar-img {
          border-radius: 5px;
          vertical-align: middle;
        }
      }
      .pd-info {
        width: 500px;
        .pd-title {
          font-size: 20px;
        }
        .pd-creator {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin: 10px 0;
          .creator-avatar {
            width: 50px;
            height: 50px;
            .creator-avatar-img {
              vertical-align: middle;
              border-radius: 25px;
            }
          }
          .creator-name {
            margin: 0 10px;
          }
        }
        .pd-tags {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-bottom: 10px;
          span {
            flex: 1 0 auto;
          }
        }
        .pd-desc {
          overflow: hidden;
          color: $textColor;
          .description.active {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            overflow: hidden;
            white-space: pre-wrap;
            word-wrap: break-word;
          }
        }
      }
    }
    .pd-box {
      .pd-button {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-content: center;
        button {
          border: none;
          outline: none;
          margin: 0 20px 20px 0;
          height: 30px;
          line-height: 30px;
          background-color: rgba(100, 100, 100, 0.2);
          color: $textColor;
          border-radius: 50px;
          padding: 0 10px;
        }
        .play-all {
          background-color: #ff0000;
          color: #ffffff;
        }
      }
    }

    .no-data {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }
  }

  .pd-aside {
    flex: 0 0 350px;
    margin-left: 10px;
    .pd-sub {
      padding: 10px;
      margin-bottom: 10px;
      background-color: #fff;
    }
    .pd-recommend {
      padding: 10px;
      background-color: #fff;
      margin-bottom: 10px;
      .related-playlists {
        margin: 10px 0;
        .el-image {
          width: 75px;
          height: 75px;
          float: left;
          margin-right: 5px;
        }
        .rp-name,
        .rp-creator {
          color: $textColor;
          padding: 10px 5px;
          &:hover {
            text-decoration: underline;
            color: $activeColor;
          }
        }
      }
    }
    .pd-comments {
      padding: 10px;
      background-color: #fff;
      margin-bottom: 10px;
      .hot-comment {
        display: flex;
        justify-content: flex-start;
        box-sizing: border-box;
        .comment-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50px;
        }
        .comment-info {
          .comment-username {
            display: inline-block;
            margin: 5px 10px;
            font-weight: bold;
            &:hover {
              text-decoration: underline;
            }
          }
          .comment-time {
            color: $textColor;
            font-size: 12px;
          }
          .comment-content {
            margin: 5px;
            background-color: rgba(231, 231, 231, 0.561);
            padding: 5px;
            line-height: 18px;
            color: $textColor;
            font-size: 12px;
          }
        }
      }
    }
  }
}
.title {
  padding: 0px;
  font-size: 14px;
  color: $textColor;
}
</style>
