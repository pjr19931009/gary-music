<template>
  <div class="swiper-container">
    <template v-if="isFlag">
      <swiper
        ref="mySwiper"
        :options="swiperOptions"
        :auto-update="true"
        :auto-destroy="true"
        :delete-instance-on-destroy="true"
        :cleanup-styles-on-destroy="true"
        key="swiper"
      >
        <template v-for="value in banners">
          <swiper-slide :key="value">
            <img :src="value" v-if="hasBanner" />
          </swiper-slide>
        </template>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </template>
    <template v-if="!isFlag">
      <swiper
        ref="mySwiper1"
        :options="swiperOptionsMb"
        :auto-update="true"
        :auto-destroy="true"
        :delete-instance-on-destroy="true"
        :cleanup-styles-on-destroy="true"
        class="swiperMb"
        key="swiperMb"
        @click.prevent
      >
        <template v-for="value in banners">
          <swiper-slide :key="value">
            <img :src="value" v-if="hasBanner" />
          </swiper-slide>
        </template>
      </swiper>
    </template>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination'
        },
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: true,
        loopFillGroupWithBlank: true
      },
      swiperOptionsMb: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: true,
        loopFillGroupWithBlank: true
      },
      isFlag: true
    }
  },
  props: {
    banners: {
      type: Array,
      default: []
    }
  },
  methods: {
    getWidth() {
      let width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
      if (width < 992) {
        this.isFlag = false
      } else if (width > 992) {
        this.isFlag = true
      }
    }
  },
  computed: {
    hasBanner() {
      return this.banners && this.banners.length > 0
    }
  },
  created() {
    this.getWidth()
    window.addEventListener('resize', this.getWidth)
  },
  destroy() {
    window.removeEventListener('resize', this.getWidth)
  }
}
</script>
<style lang="scss" scoped>
img {
  width: 100%;
  border-radius: 5px;
}
.swiper-container {
  width: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
</style>
