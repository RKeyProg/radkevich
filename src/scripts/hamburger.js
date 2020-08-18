import Vue from "vue";

new Vue({
    el: '#welcome-section',
    data: {
        styles: {
            right: '-9999px',
            opacity: 0
        }
    },
    methods: {
        viewMobileMenu() {
            this.styles.right = 0;
            this.styles.opacity = 1;
        },
        hideMobileMenu() {
            this.styles.right = '-9999px';
            this.styles.opacity = 0;
        }
    }
})