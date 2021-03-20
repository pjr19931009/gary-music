<template>
  <div class="pd-table">
    <div class="table-title">
      <div class="title-index"></div>
      <div class="title-name">歌名</div>
      <div class="title-art">歌手</div>
      <div class="title-al">专辑</div>
      <div class="title-dt">时长</div>
    </div>
    <play-field :data="songList" class="pd-item" />
  </div>
</template>

<script>
import playField from '@/components/playField/playField'
export default {
  components: {
    playField
  },
  props: {
    songList: [Array]
  }
}
</script>
<style lang="scss">
.pd-table {
  .pd-item {
    padding: 0;
    .newsong-item {
      flex: 0 0 100%;
      height: 50px;
      margin: 0;
      border-radius: 0px;
      box-shadow: 0px 0px 0px 0px #888888;
      &:nth-child(2n + 1) {
        background-color: #eeeeee;
      }
      &:hover {
        background-color: #dddddd;
      }
    }
  }
  .table-title {
    height: 50px;
    width: 100%;
    background-color: #ffffff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    color: $textColor;
    .title-index {
      flex: 0 0 150px;
    }
    .title-dt {
      flex: 0 0 60px;
    }
    .title-name,
    .title-art,
    .title-al {
      width: 0;
      flex: 1 1;
    }
    div {
      margin-left: 1%;
    }
  }
}
</style>
