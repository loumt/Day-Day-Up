"use strict";

const fs = require('fs')
const path = require('path')

/**
 * 文件工具
 */
class FsTools{
    static mkdirsSync(fd) {
        if (fs.existsSync(fd)) {
            return true;
        } else {
            if (this.mkdirsSync(path.dirname(fd))) {
                fs.mkdirSync(fd);
                return true;
            }
        }
    }
}

module.exports=FsTools;