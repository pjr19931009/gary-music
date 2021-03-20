<template>
  <div class="tag-container">
    <template v-for="value in tag">
      <div
        :key="value.name"
        :class="['tags', 'pointer', { active: value.catId === currentId }]"
        @click="tagClick(value)"
      >
        {{ value.name }}
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    tag: {
      type: [Array],
      default: () => []
    },
    currentId: {
      type: [String, Number],
      default: -1
    }
  },

  methods: {
    tagClick(val) {
      this.$emit('tagClick', val)
    }
  }
}
</script>
<style lang="scss" scoped>
.tag-container {
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  .tags {
    display: inline-block;
    color: #5e5e5e;
    margin: 5px 10px 5px 0;
    padding: 6px 12px;
    background-color: rgba(100, 100, 100, 0.08);
    border-radius: 100px;
    font-size: 12px;
    transition: all 0.5s;
    &:hover {
      color: #ffffff;
      background-color: #ff0000;
    }
  }
}
.tags.active {
  color: #ffffff;
  background: $activeColor;
}
</style>
