<!-- 历史播放列表 -->
<template>
  <div class="history-container">
    <div class="a-tool-list pointer">
      <!-- 图标 -->
      <i class="iconfont audio icon-liebiao" @click="changeShow"></i>
    </div>
    <!-- 过渡 -->
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__fadeInRight"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <!-- box -->
      <div class="his-box" v-if="showBox">
        <el-row class="his-box-header" type="flex" justify="space-between">
          <el-col :span="8">历史播放</el-col>
          <el-col :span="5"
            ><i class="icon-trash iconfont clear-all pointer" @click="clearHisList"></i>
          </el-col>
        </el-row>
        <el-row class="his-box-item" v-if="hasHis">
          <el-col :span="24">
            <div class="item-field-box" v-for="(item, index) in hisList" :key="index">
              <field-item
                :item="item"
                :playStatus="playState == item.id ? true : false"
                class="his-playfield"
                @click.native="startPlay(item)"
              ></field-item>
              <div class="his-delete pointer" @click="deleteHistory(item.id)">
                x
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="no-his" v-else>
          暂无记录
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import fieldItem from '@/components/playField/fieldItem/fieldItem'
export default {
  components: {
    fieldItem
  },
  props: {
    // 显示状态
    showBox: {
      type: [Boolean, String],
      default: false
    }
  },
  data() {
    return {
      hisList: []
    }
  },
  computed: {
    // 播放状态
    playState() {
      if (this.$store.state.song.songState) {
        return this.$store.state.song.songInfo.id
      }
      return false
    },
    //是否有记录
    hasHis() {
      if (!this.hisList || this.hisList.length == 0) {
        return false
      }
      return true
    }
  },
  watch: {
    '$store.state.song.songInfo': {
      handler: function() {
        this.getHisList()
      }
    }
  },
  methods: {
    // 显示隐藏
    changeShow() {
      this.$emit('update:showBox', !this.showBox)
    },
    // 取历史记录
    getHisList() {
      return (this.hisList = this.$localStore.get('hisSong'))
    },
    // 删除一条历史记录
    deleteHistory(id) {
      this.hisList.map((item, index) => {
        if (item.id === id) {
          this.hisList.splice(index, 1)
        }
      })
      this.$localStore.set('hisSong', this.hisList)
    },
    // 清空历史记录
    clearHisList() {
      this.$confirm('是否清空历史记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '清空成功!'
          })
          this.$localStore.set('hisSong', [])
          this.getHisList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消清空'
          })
        })
    },
    startPlay(songObj) {
      this.$store.dispatch('startSong', songObj)
    }
  },

  mounted() {
    this.getHisList()
  }
}
</script>
<style lang="scss" scoped>
.history-container {
  font-size: 14px;
  .his-box {
    position: absolute;
    width: 1000px;
    height: 600px;
    background: rgba(0, 0, 0, 0.5);
    // color: #ffffff;
    border-radius: 5px;
    overflow: hidden;
    right: 5px;
    bottom: 90px;
    padding: 20px;
    box-sizing: border-box;
    .his-box-header {
      .el-col {
        padding: 10px 0px;
        text-align: center;
      }
      .clear-all {
        color: #ffffff;
      }
    }
    .his-box-item {
      overflow-y: auto;
      height: 500px;
      padding: 10px 0px;
      .el-col {
        .item-field-box {
          position: relative;

          height: 60px;
          .his-playfield {
            width: 95%;
            height: 60px;
            color: #ffffff;
          }
          .his-delete {
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            line-height: 60px;
            text-align: center;
            width: 10px;
            &:hover {
              transform: scale(1.5);
            }
          }
        }
      }
    }
    .no-his {
      width: 100%;
      font-weight: bold;
      text-align: center;
      position: relative;
      top: 50%;
      transform: translate(0, -50%);
    }
  }
}
</style>
