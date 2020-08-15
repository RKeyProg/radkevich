import Vue from "vue";
import {
    Swiper,
    SwiperSlide,
    directive
} from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';

new Vue({
    el: "#slider-component",
    template: "#slider-container",
    components: {
        Swiper,
        SwiperSlide
    },
    data() {
        return {
            reviews: [],
            sliderOptions: {
                autoHeight: true,
                breakpoints: {
                    320: {
                        slidesPerView: 1
                    },
                    481: {
                        slidesPerView: 2,
                    },
                    769: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    }
                }
            }
        }
    },
    methods: {
        requireImagesToArray(data) {
            return data.map((item) => {
                const requiredImage = require(`../images/content/${item.img}`).default;
                item.img = requiredImage;
                return item;
            });
        },
        slide(direction) {
            const slider = this.$refs['slider'].$swiper;
            switch (direction) {
                case 'next':
                    slider.slideNext();
                    break;
                case 'prev':
                    slider.slidePrev();
                    break;
            }
        }
    },
    computed: {
        swiper() {
            return this.$refs.slider.$swiper
        }
    },
    created() {
        const data = require("../data/reviews.json");
        this.reviews = this.requireImagesToArray(data);
    },
    mounted() {
        
    }
})