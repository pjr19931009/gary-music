<template>
  <div class="search pointer">
    <i class="iconfont icon-search" @click="dialogVisible = true"></i>
    <el-dialog
      :visible.sync="dialogVisible"
      width="50%"
      top="20vh"
      :show-close="false"
      :destroy-on-close="true"
      @open="dialogOpen"
    >
      <div class="search-dialog-box" v-loading="loading">
        <div class="search-box">
          <input
            type="text"
            v-model="keyWord"
            class="search-input"
            placeholder="按回车键搜索~~~"
            @keyup.enter="goSearch(keyWord)"
          />
        </div>
        <div class="hot-keyword">
          <div class="history-search-tags">
            <div class="history-title">
              <p class="iconfont icon-history">历史搜索</p>
              <p @click="clearHis">清空</p>
            </div>
            <el-tag
              :hit="true"
              v-for="his in historyTags"
              size="medium"
              :key="his"
              closable
              @click="goSearch(his)"
              @close="handleClose(his)"
              type="info"
            >
              {{ his }}
            </el-tag>
          </div>
          <div class="hot-search-tags">
            <div class="iconfont icon-hot">
              <span>热门搜索</span>
            </div>
            <el-tag
              :hit="true"
              v-for="hot in hotWord"
              @click="goSearch(hot)"
              size="medium"
              :key="hot"
              type="info"
            >
              {{ hot }}
            </el-tag>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 显示隐藏dialog
      dialogVisible: false,
      //   热门搜索词
      hotWord: '',
      //   搜索时显示loading
      loading: false,
      //搜索关键词
      keyWord: '',
      //   历史搜索词
      historyTags: []
    }
  },

  methods: {
    // 打开搜索
    dialogOpen() {
      this.getHotWord()
      this.getHistoryTags()
    },
    //热词
    async getHotWord() {
      this.loading = true
      const { data } = await this.$api.hotKeyWords()
      const { code, result } = data
      if (code === 200) {
        this.hotWord = result.hots.map(item => {
          return item.first
        })
        this.loading = false
        return
      }
      this.loading = false
      return (this.hotWord = [])
    },
    // 删除历史tags
    handleClose(val) {
      this.historyTags.splice(this.historyTags.indexOf(val), 1)
      this.setHisStore()
    },

    // 增加localstore的historyKeyword
    addHisStore() {
      this.historyTags = [...new Set(this.historyTags)]
      this.setHisStore()
    },

    // 设置localstore的historyKeyword
    setHisStore() {
      this.$localStore.set('historyKeyword', this.historyTags)
    },
    // 携带关键词跳转搜索页
    goSearch(keywords) {
      this.dialogVisible = false
      if (typeof keywords === 'string' && keywords.trim()) {
        this.historyTags.unshift(keywords.trim())
        this.addHisStore(keywords)
        this.$router.push({
          path: '/search',
          query: {
            keywords
          }
        })
        this.keyWords = ''
      }
    },
    // 从本地获取历史搜索记录
    getHisStore() {
      return this.$localStore.get('historyKeyword')
    },
    // 获取this.historyTags
    getHistoryTags() {
      const historyTags = this.getHisStore()
      if (historyTags) {
        this.historyTags = historyTags
      }
    },
    //清空历史记录
    clearHis() {
      this.dialogVisible = false
      this.$confirm('是否清空历史记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$localStore.remove('historyKeyword')
          this.historyTags = []
          this.$message({
            type: 'success',
            message: '删除成功!',
            offset: 100
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            offset: 100
          })
        })
    }
  }
}
</script>
<style lang="scss">
$radius: 5px;

.el-dialog {
  border-radius: $radius;
  overflow: hidden;
  font-size: 14px;
  .el-dialog__body,
  .el-dialog__header {
    padding: 0 0;
  }
  .search-dialog-box {
    width: 100%;
    .search-box {
      position: relative;
      height: 250px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff url('../../../assets/images/personal.jpg') no-repeat center;
      overflow: hidden;
      &::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        background: inherit;
        filter: blur(20px);
      }
      &::after {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        background: linear-gradient(140deg, rgba(1, 3, 27, 0.5), rgba(233, 4, 4, 0.1));
      }
      .search-input {
        width: 90%;
        height: 18%;
        background: rgba(255, 255, 255, 0.08);
        text-align: center;
        color: $white;
        border-radius: $radius;
        z-index: 999;
      }
      ::-webkit-input-placeholder {
        /* WebKit, Blink, Edge */
        color: $white;
        font-size: 15px;
        position: relative;
        top: 0;
      }
    }
    .hot-keyword {
      background: $white;
      padding: 20px 40px;
      .history-search-tags {
        min-height: 125px;
      }
      .hot-search-tags {
        min-height: 125px;
      }
      .iconfont {
        color: #ff0000;
        font-size: 20px;
        margin-bottom: 8px;
        span {
          color: #000000;
        }
      }
    }
  }
}
.el-tag {
  margin: 5px 5px 5px 0;
}
.history-title {
  display: flex;
  justify-content: space-between;
}
</style>
