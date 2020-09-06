<template>
    <div class="user-conponent">
        <avatar :size="size" :src="userPic" />
        <div class="user-data">
            <div class="username">{{name}}</div>
            <div class="occ">{{occ}}</div>
        </div>
    </div>
</template>

<script>
import avatar from "../avatar";

export default {
    props: {
        size: {
            type:Number,
            default: 2.7,
        },
        occ: String,
        name: String,
    },
    components: {
        avatar
    },
    computed: {
        userPic() {
            return require("../../../images/content/user.jpg").default;
        }
    }
}
</script>

<style lang="postcss">
.user-data {
    margin-left: 10px;
    font-weight: bold;
}

.user-conponent {
    display: flex;
    font-size: 18px;
    font-weight: 600;
    align-items: center;
    color: inherit;
}

.username {
    font-size: 18px;
    line-height: 25px;
}

.occ {
    font-size: 16px;
    line-height: 22px;
    color: rgba(65, 76, 99, 0.5);
}
</style>