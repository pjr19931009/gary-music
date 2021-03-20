<template>
  <div class="error-container">
    <div class="content-error h-v-50">
      <img src="../../assets/images/404.png" />
      <h1>404</h1>
      <h4>哎呀！ 该页面无法找到。</h4>
    </div>
  </div>
</template>

<script>
export default {}
</script>
<style lang="scss" scoped>
.error-container {
  height: calc(100vh - 273px);
  padding-top: 70px;
  .content-error {
    display: flex;
    -webkit-box-orient: vertical;
    flex-direction: column;
    flex: 1 1 auto;
    justify-content: center;
    align-items: center;
    img {
      margin-bottom: 20px;
    }
    h1 {
      font-size: 50px;
      font-weight: 300;
      line-height: 1.2;
    }
    h4 {
      font-size: 30px;
    }
  }
}
</style>
