<template>
  <div class="tabs-container">
    <ul id="tabs-list" class="tabs-list">
      <li
        ref="1"
        :class="[value == isActive ? 'active' : '', 'tabs-items', 'pointer']"
        v-for="(value, index) in data"
        :key="index"
        @click="tabsClick(index)"
      >
        {{ value }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    data: {
      type: Array,
      default: [],
      required: true
    }
  },
  methods: {
    // 点击tabs
    tabsClick(index) {
      this.$emit('isActive', index)
    }
  },
  computed: {
    isActive() {
      return this.$route.meta.title
    }
  }
}
</script>
<style lang="scss" scoped>
.tabs-container {
  width: 100%;
  height: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  .tabs-list {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .tabs-items {
      margin-left: 2%;
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
</style>
