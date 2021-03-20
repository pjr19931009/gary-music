<template>
  <div id="play-filed" class="play-filed">
    <template v-for="item in data">
      <filed-item
        :item="item"
        :key="item.id"
        :playStatus="playState == item.id ? true : false"
        @click.native="startPlay(item)"
        class="newsong-item"
      />
    </template>
  </div>
</template>

<script>
import filedItem from './fieldItem/fieldItem'
export default {
  components: {
    filedItem
  },
  props: {
    data: [Array]
  },
  computed: {
    // 播放状态
    playState() {
      if (this.$store.state.song.songState) {
        return this.$store.state.song.songInfo.id
      }
      return false
    }
  },
  methods: {
    // 播放开始
    startPlay(songObj) {
      this.$store.dispatch('startSong', songObj)
    }
  }
}
</script>
<style lang="scss">
.play-filed {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 $homePadding;
  width: 100%;
  box-sizing: border-box;
  .newsong-item {
    flex: 0 0 49%;
    height: 85px;
    background-color: #fff;
    margin-bottom: 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 5px 0px #888888;
    transition: all 0.5s;
  }
}
</style>
