import Vue from "vue";
import axios from "axios";

const thumbs = {
    props: ["currentWork", "works", "anim"],
    data() {
        return {
            disabled: false,
        }
    },
    template: "#preview-thumbs",
    methods: {
        beforeEnterCb() {
            this.disabled = true;
            this.$emit('isButtonDisabled', this.disabled);
        },
        enterCb(el, done) {
            const list = el.closest("ul");

            list.classList.add("transition");
            
            if (this.anim === "next") {
                el.classList.add("nextOutsided");
                list.style.transform = "translateX(-25%)";
            } else {
                el.classList.add("prevOutsided");
                list.style.transform = "translateX(25%)";
            }

            list.addEventListener("transitionend", e => done());
        },
        afterEnterCb(el) {
            const list = el.closest("ul");

            list.classList.remove("transition");
            list.style.transform = "translateX(0px)";
            el.classList.remove("nextOutsided");
            el.classList.remove("prevOutsided");
            this.disabled = false;
            this.$emit('isButtonDisabled', this.disabled);
        },
        leaveCb(el, done) {
            el.classList.add('fade');
            el.addEventListener("transitionend", e => done());
        },
    }
};

const btns = {
    props: {
        disabled: Boolean,
    },
    template: "#preview-btns",
};

const display = {
    props: ["currentWork", "works", "currentIndex"],
    data() {
        return {
            disabled: false,
            direction: "",
        }
    },
    template: "#preview-display",
    components: {thumbs, btns},
    computed: {
        selectingWorks() {
            return [...this.works].slice(0, 4);
        }
    },
    methods: {
        isDisabled(disabled) {
            this.disabled = disabled;
        },
        whichPress(direction) {
            this.direction = direction;
            this.$emit('slide', direction);
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
            currentIndex: 0,
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
        },
    },
    async created() {
        const data = await axios.get('/works/370');
        this.works = this.requireImagesToArray(data.data);
    }
});