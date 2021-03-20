<template>
  <div id="playlist-container" class="playlist-container">
    <div class="item pointer" v-for="item in data" :key="item.id">
      <list-item :item="item" />
    </div>
  </div>
</template>

<script>
import listItem from './listItem/listItem'
export default {
  components: {
    listItem
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style lang="scss" scoped>
.playlist-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0 $homePadding;
  .item {
    margin: 0 1.5% 20px 1%;
    flex: 0 1 10%;
    border-radius: 5px;
  }
}
</style>
