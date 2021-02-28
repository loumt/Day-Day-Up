const cheerio = require('cheerio')
const _ = require('lodash')
const ReSouService = require('./../../service/ReSouService')
const DateUtil = require('./../../utils/DateUtil')

module.exports = html => {
    let $ = cheerio.load(html)

    let tbody = $('#pl_top_realtimehot').find('tbody');

    let trs = tbody.find('tr');

    let rs = []
    trs.each((index, tr) => {
        let ranktop = $(tr).find(".ranktop");
        if (_.isEmpty(ranktop.text())) {
            return true;
        }
        let ranking = ranktop.text();
        let note = $(tr).find(".td-02");
        let href = note.find('a').attr('href');

        if (!href || href.indexOf('Refer=top') === -1) {
            return;
        }
        let title = note.find('a').text()
        let hotlevel = note.find('span').text()
        let model = {
            title,
            ranking,
            hotlevel: parseInt(hotlevel),
            href: 'https://s.weibo.com' + href,
            ctime: DateUtil.now()
        }
        rs.push(model)
    })

    console.log(`热搜条数: ${rs.length}`)

    return rs
}