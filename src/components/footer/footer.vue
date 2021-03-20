<template>
  <div class="footer">
    <div class="container">
      <p class="title">gary_music</p>
      <p class="desc">
        gary_music
      </p>
      <div class="social flex-row">
        <a href="">
          <span class="flex-center">
            <i class="iconfont icon-music"></i>
          </span>
        </a>
        <a href="">
          <span class="flex-center">
            <i class="iconfont icon-blog"></i>
          </span>
        </a>
      </div>
    </div>
    <div class="copyright">
      <div class="container">
        <p>
          <span class="mr5">Copyright © 2012-2020</span>
          <a href=""> gary_music </a>
          <span>. Designed by </span>
          <a href="" target="_blank"> gary_music</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>
<style lang="scss" scoped>
.footer {
  width: 100%;
  background: #161e27;
  .container {
    padding: 42px $layoutPadding;
    .title {
      position: relative;
      font-size: 14px;
      letter-spacing: 1px;
      color: #fff;
      margin-bottom: 14px;
      padding: 0 14px;
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        width: 3px;
        height: 15px;
        border-radius: 5px;
        background: #fa2800;
        transform: translate(0%, -50%);
      }
    }
    .desc {
      font-size: 12px;
      line-height: 1.8;
      color: #6d7685;
    }
    .social {
      margin: 14px -3px 0;
      display: flex;
      a {
        position: relative;
        border-radius: 50%;
        text-align: center;
        width: 34px;
        height: 34px;
        font-size: 14px;
        background-color: #232a31;
        border-color: #232a31;
        color: #6d7685;
        display: flex;

        font-weight: 400;
        margin: 3px;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
          border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        span {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          i {
            font-size: 22px;
          }
        }
        &:hover {
          background: #11181f;
          color: #fff;
        }
      }
    }
  }
  .copyright {
    padding: 21px $layoutPadding;
    border-top: 1px solid #232a31;
    .container {
      padding: 0;
      color: #6d7685;
      font-size: 12px;
      a {
        color: #6d7685;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
          border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        &:hover {
          color: #fff;
        }
      }
    }
  }
}
</style>
