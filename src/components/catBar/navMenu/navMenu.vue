<template>
  <div class="nav-menu">
    <div class="all-cat pointer" @click="handleCat(buttonTitle)">
      {{ buttonTitle }}
    </div>
    <ul class="hot-tags">
      <li class="hot-tags-title">热门标签:</li>
      <li
        class="pointer hot-tag-item"
        v-for="item in tags"
        :key="item.id"
        @click="handleTags(item)"
      >
        {{ item.name }}
      </li>
    </ul>
    <div class="order">
      <div
        class="orderItem pointer"
        :class="index === orderIndex ? 'active' : ''"
        @click="handleOrder(index)"
        v-for="(item, index) in order"
        :key="item"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: ['热门', '最新']
    }
  },
  props: {
    tags: {
      type: [Array],
      default: () => []
    },
    buttonTitle: {
      type: [String],
      default: ''
    },
    orderIndex: {
      type: [String, Number],
      default: 0
    }
  },
  methods: {
    handleCat(item) {
      this.$emit('handleCat', item)
    },
    handleTags(item) {
      this.$emit('handleTags', item)
    },
    handleOrder(obj) {
      this.$emit('handleOrder', obj)
    }
  }
}
</script>
<style lang="scss" scoped>
.nav-menu {
  color: #888888;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  .all-cat {
    flex: 0 0 100px;
    text-align: center;
    width: 100px;
    line-height: 40px;
    background-color: $activeColor;
    color: #ffffff;
    border-radius: 5px 0 0 5px;
    &::after {
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      border-right: 2px solid #ffffff;
      border-bottom: 2px solid #ffffff;
      transform: rotate(45deg) translate(0, -6px);
    }
  }
  .hot-tags {
    flex: 0 1 auto;
    font-size: 15px;
    color: #888888;
    line-height: 40px;
    overflow-x: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
    li {
      flex: 1 0 auto;
      margin: 0 10px;
    }
    .hot-tag-item {
      &:hover {
        color: #ccc;
      }
    }
  }
  .order {
    flex: 1 0 auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-sizing: border-box;
    padding: 6px;
    .orderItem {
      width: 45px;
      height: 28px;
      line-height: 28px;
      font-size: 12px;
      text-align: center;
      border-radius: 4px;
      margin-right: 10px;
      transition: all 0.3s;
    }
    .orderItem.active {
      color: #ffffff;
      background-color: $activeColor;
    }
  }
}
</style>
