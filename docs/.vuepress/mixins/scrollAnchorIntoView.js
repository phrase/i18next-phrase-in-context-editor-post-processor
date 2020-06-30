const scrollToHash = ($route, timeout) => {
    setTimeout(() => {
        if ($route.hash) {
            const element = document.getElementById($route.hash.slice(1));

            if (element && element.scrollIntoView) {
                element.scrollIntoView();
            }
        }
    }, timeout);
};

module.exports = {
    mounted () {
        scrollToHash(this.$route, 800);
    }
};
