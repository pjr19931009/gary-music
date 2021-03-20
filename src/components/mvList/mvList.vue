<template>
  <div class="mv-list">
    <mv-item
      class="mv-item"
      v-for="item in mvList"
      :key="item.id"
      :item="item"
      @mvClick="mvClick"
    />
    <!-- 居中占位 -->
    <div class="offset-item" v-for="val in 3" :key="val"></div>
  </div>
</template>

<script>
import mvItem from './mvItem/mvItem'
export default {
  components: {
    mvItem
  },
  props: {
    mvList: {
      type: [Array],
      default: () => []
    }
  },
  methods: {
    mvClick(val) {
      this.$emit('mvClick', val)
    }
  }
}
</script>
<style lang="scss" scoped>
.mv-list {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px;
  box-sizing: border-box;
  .mv-item {
    max-width: 22%;
    flex: 1 0 22%;
    margin-right: 1%;
  }
  .offset-item {
    height: 0;
    max-width: 22%;
    flex: 1 0 22%;
    margin-right: 1%;
  }
}
</style>
