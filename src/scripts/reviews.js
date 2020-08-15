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
            isEnd: false,
            isBeginning: true,
            sliderOptions: {
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
        checkPosition(slider) {
            this.$nextTick(() => {
                this.isEnd = slider.isEnd;
                this.isBeginning = slider.isBeginning;
                console.log(this.isBeginning, this.isEnd);
            });
        },
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
                    this.checkPosition(slider);
                    slider.slideNext();
                    break;
                case 'prev':
                    this.checkPosition(slider);
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
        if (this.swiper.isEnd) console.log("true");
    }
})