function getTitle(vm) {
    const { title } = vm.$options
    if (title) {
        return typeof title === 'function' ?
            title.call(vm) :
            title
    }
}

const serverTitleMixin = {
    created() {
        const title = getTitle(this)
        if (title) {
            this.$ssrContext.title = `vue_ssr_demo1| ${title}`
        }
    }
}

const clientTitleMixin = {
    mounted() {
        const title = getTitle(this)
        if (title) {
            document.title = `vue_ssr_demo2 | ${title}`
        }
    }
}

export default process.env.VUE_ENV === 'server' ?
    serverTitleMixin :
    clientTitleMixin