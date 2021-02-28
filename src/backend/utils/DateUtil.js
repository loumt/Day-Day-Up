module.exports = {
    now: () => {
        let times = Date.now() - new Date().getTimezoneOffset() * 1000 * 60
        return new Date(times)
    },
    renderTime: (date) => {
        var dateee = new Date(date).toJSON();
        return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    }
}