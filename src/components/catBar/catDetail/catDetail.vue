<template>
  <div class="cat-detail">
    <template v-for="(item, index) in categories">
      <div class="title" :key="item">{{ item }}</div>
      <tags :key="index" :tag="tagsArr(index)" @tagClick="tagClick" />
    </template>
  </div>
</template>

<script>
import tags from '@/components/tags/tags'
export default {
  components: {
    tags
  },
  props: {
    cat: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    categories() {
      return this.cat.categories
    },
    subscribe() {
      return this.cat.sub || []
    }
  },
  methods: {
    tagsArr(index) {
      return this.subscribe.filter(item => {
        if (item.category == index) {
          return item
        }
      })
    },
    tagClick(val) {
      this.$emit('tagClick', val)
    }
  }
}
</script>
<style lang="scss" scoped>
.cat-detail {
  position: absolute;
  top: 50px;
  width: 40%;
  height: 250px;
  background-color: #ffffff;
  overflow-y: auto;
  box-sizing: border-box;
  border-radius: 5px;
  z-index: 9999;
}
.title {
  color: #5e5e5e;
  padding: 5px;
}
</style>
