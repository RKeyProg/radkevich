import Vue from "vue";
import axios from "axios";

const thumbs = {
    props: ["currentWork", "works"],
    template: "#preview-thumbs"
};

const btns = {
    template: "#preview-btns",
};

const display = {
    props: ["currentWork", "works", "currentIndex"],
    template: "#preview-display",
    components: {thumbs, btns},
    computed: {
        selectingWorks() {
            const works = [...this.works];
            return works.slice(0,4);
        }
    }
};

const tags = {
    props: ["tags"],
    template: "#preview-tags"
};

const info = {
    props: ["currentWork"],
    template: "#preview-info",
    components: {tags},
    computed: {
        tagsArray() {
            return this.currentWork.techs.split(",");
        }
    }
};

new Vue({
    el: "#preview-component",
    template: "#preview-container",
    components: {display, info},
    data() {
        return {
            works: [],
            currentIndex: 0
        }
    },
    computed: {
        currentWork() {
            return this.works[0];
        }
    },
    watch: {
        currentIndex(value) {
            this.makeInfinityLoopForNdx(value);
        }
    },
    methods: {
        makeInfinityLoopForNdx(index) {
            const worksNumber = this.works.length - 1;
            if (index < 0) this.currentIndex = worksNumber;
            if (index > worksNumber) this.currentIndex = 0;
        },
        requireImagesToArray(data) {
            return data.map(item => {
                const requiredImage = `https://webdev-api.loftschool.com/${item.photo}`
                item.photo = requiredImage;
                return item;
            });
        },
        slide(direction) {
            const lastItem = this.works[this.works.length - 1];
            switch (direction) {
                case 'next':
                    this.works.push(this.works[0]);
                    this.works.shift();
                    this.currentIndex++
                    break;
                case 'prev':
                    this.works.unshift(lastItem);
                    this.works.pop();
                    this.currentIndex--
                    break;
            }
        }
    },
    async created() {
        const data = await axios.get('/works/370');
        this.works = this.requireImagesToArray(data.data);
    }
});