<template>
  <div class="singer-container">
    <template v-for="item in data">
      <sing-item
        :data="item"
        :key="item.id"
        @click.native="searchSinger(item)"
        class="singer-item"
      />
    </template>
  </div>
</template>

<script>
import singItem from './singerItem/singerItem'
export default {
  components: {
    singItem
  },
  props: {
    data: [Array]
  },
  methods: {
    searchSinger(singer) {
      this.$router.push(`/artist?id=${singer.id}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.singer-container {
  width: 100%;
  padding: 0 $homePadding;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  box-sizing: border-box;
  .singer-item {
    flex: 0 0 8%;
    margin: 2%;
  }
}
</style>
