<template>
  <div class="search-container">
    <div class="bgimg"></div>
    <div class="search-header">
      <input class="search-inp" type="text" v-model="inpKeywords" @keyup.enter="search" />
      <i class="iconfont icon-search search-icon" @click="search"></i>
    </div>
    <div class="search-main">
      <div class="title">搜索结果</div>
      <ul class="tags">
        <li
          :class="['pointer', item.type == currentTag ? 'active' : '']"
          v-for="item in tags"
          :key="item.type"
          @click="hanlderType(item)"
        >
          {{ item.title }}
        </li>
      </ul>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: [
        { type: 1, title: '单曲', name: 'searchSong' },
        { type: 10, title: '专辑', name: 'searchAlbum' },
        { type: 100, title: '歌手', name: 'searchSinger' },
        { type: 1000, title: '歌单', name: 'searchPlaylist' },
        { type: 1002, title: '用户', name: 'searchUser' },
        { type: 1004, title: 'MV', name: 'searchMV' }
      ],
      keywords: '',
      inpKeywords: '',
      currentTag: 1
    }
  },
  methods: {
    //查询
    search() {
      this.keywords = this.inpKeywords
      this.$router.push({
        query: {
          keywords: this.keywords
        }
      })

      // 历史查询记录
      let oldHistoryWord = this.$localStore.get('historyKeyword')
      oldHistoryWord.unshift(this.keywords)
      let newHistoryWord = [...new Set(oldHistoryWord)]
      this.$localStore.set('historyKeyword', newHistoryWord)
    },
    // tags点击切换
    hanlderType(item) {
      this.$router.push({ name: item.name, query: { keywords: this.keywords } })
    }
  },

  created() {
    //tags状态
    this.tags.map(tag => {
      if (tag.name === this.$route.name) this.currentTag = tag.type
    })
    this.inpKeywords = this.keywords = this.$route.query.keywords
  },

  beforeRouteUpdate(to, from, next) {
    this.tags.map(tag => {
      if (tag.name === to.name) this.currentTag = tag.type
    })
    next()
  }
}
</script>
<style lang="scss" scope>
.search-container {
  width: 100%;
  background: #ffffff;
  padding: 0 20px;
}
.bgimg {
  &:before {
    content: '';
    width: 100%;
    height: 250px;
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 70px;
    background: url(../../assets/images/personal.jpg) no-repeat center;
    pointer-events: none;
    z-index: 2;
  }
}
.search-header {
  width: 100%;
  height: 210px;
  margin-bottom: 20px;
  position: relative;
  z-index: 99;
  .search-inp {
    width: 600px;
    height: 50px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    color: $textColor;
    padding: 5px 5px;
    box-sizing: border-box;
  }
  .search-icon {
    display: block;
    width: 50px;
    height: 50px;
    position: absolute;
    left: 550px;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
  }
}
.search-main {
  position: relative;
  .tags {
    display: flex;
    justify-content: flex-start;
    padding: 0 20px;
    margin-bottom: 40px;
    li {
      margin-left: 20px;
      transition: all 0.5s;
      &.active {
        color: $activeColor;
        position: relative;
        &::after {
          transition: all 0.3s;
          width: 100%;
        }
      }
      &::after {
        content: '';
        position: absolute;
        display: block;
        width: 0%;
        height: 5px;
        background: $activeColor;
      }
    }
  }
}

.el-pagination {
  text-align: center;
}

.no-data {
  flex: 1;
  text-align: center;
  padding: 20px;
  font-size: 20px;
  font-weight: bold;
}
</style>
