<template>
  <div class="sings">
    <tags :tag="type" @tagClick="clickType" :currentId="reqOptions.type" />
    <tags :tag="area" @tagClick="clickArea" :currentId="reqOptions.area" />
    <tags :tag="initial" @tagClick="clickInitial" :currentId="reqOptions.initial" />
    <div class="scroll-box">
      <singer :data="singerList" />
      <div v-show="loading" class="loading-box">
        <loading />
      </div>
    </div>
  </div>
</template>

<script>
import tags from '@/components/tags/tags'
import singer from '@/components/singer/singer.vue'
import loading from '@/components/loading/loading.vue'

export default {
  components: {
    tags,
    singer,
    loading
  },
  data() {
    return {
      // 列表数据
      singerList: [],
      reqOptions: {
        limit: 32,
        offset: 0,
        type: -1, //取值:-1:全部 1:男歌手 2:女歌手 3:乐队
        area: -1, //取值:-1:全部 7华语 96欧美 8:日本 16韩国 0:其他
        initial: -1 //取值: 热门传-1,#传0  a-z
      },
      loading: false,
      type: [
        { id: 0, catId: -1, name: '全部' },
        { id: 1, catId: 1, name: '男歌手' },
        { id: 2, catId: 2, name: '女歌手' },
        { id: 3, catId: 3, name: '乐队' }
      ],
      area: [
        { id: 4, catId: -1, name: '全部' },
        { id: 5, catId: 7, name: '华语' },
        { id: 6, catId: 96, name: '欧美' },
        { id: 7, catId: 8, name: '日本' },
        { id: 8, catId: 16, name: '韩国' },
        { id: 9, catId: 0, name: '其他' }
      ],
      initial: [
        { id: 10, catId: -1, name: '热门' },
        { id: 11, catId: 'a', name: 'A' },
        { id: 12, catId: 'b', name: 'B' },
        { id: 13, catId: 'c', name: 'C' },
        { id: 14, catId: 'd', name: 'D' },
        { id: 15, catId: 'e', name: 'E' },
        { id: 16, catId: 'f', name: 'F' },
        { id: 17, catId: 'g', name: 'G' },
        { id: 18, catId: 'h', name: 'H' },
        { id: 19, catId: 'i', name: 'I' },
        { id: 20, catId: 'j', name: 'J' },
        { id: 21, catId: 'k', name: 'K' },
        { id: 22, catId: 'l', name: 'L' },
        { id: 23, catId: 'm', name: 'M' },
        { id: 24, catId: 'n', name: 'N' },
        { id: 25, catId: 'o', name: 'O' },
        { id: 26, catId: 'p', name: 'P' },
        { id: 27, catId: 'q', name: 'Q' },
        { id: 28, catId: 'r', name: 'R' },
        { id: 29, catId: 's', name: 'S' },
        { id: 30, catId: 't', name: 'T' },
        { id: 31, catId: 'u', name: 'U' },
        { id: 32, catId: 'v', name: 'V' },
        { id: 33, catId: 'w', name: 'W' },
        { id: 34, catId: 'x', name: 'X' },
        { id: 35, catId: 'y', name: 'Y' },
        { id: 36, catId: 'z', name: 'Z' },
        { id: 37, catId: 0, name: '其他' }
      ]
    }
  },
  methods: {
    async getSingerList(options) {
      const {
        data: { code, artists }
      } = await this.$api.singerList(options)

      if (code === 200) {
        this.singerList = [...this.singerList, ...artists]
        this.loading = false
      }
    },
    changeCat() {
      this.reqOptions.offset = 0
      this.singerList = []
      this.getSingerList(this.reqOptions)
    },
    clickType(val) {
      this.reqOptions.type = val.catId
      this.changeCat()
    },
    clickArea(val) {
      this.reqOptions.area = val.catId
      this.changeCat()
    },
    clickInitial(val) {
      this.reqOptions.initial = val.catId
      this.changeCat()
    },
    isBottom() {
      let isBottom =
        document.documentElement.scrollHeight - document.documentElement.scrollTop ===
        document.documentElement.clientHeight
      if (isBottom) {
        this.reqOptions.offset += this.reqOptions.limit
        if (!this.loading) {
          this.loading = true
          this.getSingerList(this.reqOptions)
        }
      }
    }
  },
  created() {
    this.getSingerList(this.reqOptions)
    window.addEventListener('scroll', this.isBottom)
  },
  destroy() {
    window.removeEventListener('scroll', this.isBottom)
  }
}
</script>
<style lang="scss">
.sings {
  min-height: 100vh;
}
.loading-box {
  display: flex;
  justify-content: center;
  transform: scale(0.5);
}
</style>
