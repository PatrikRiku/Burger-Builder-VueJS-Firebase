<template>
    <div>
        Whoops 404
        <a href="#" @click.prevent="back">Go back</a>
    </div>
</template>

<script>
export default {
    methods: {
        back() {
            this.$router.go(-1);
        }
    }
}
</script>
