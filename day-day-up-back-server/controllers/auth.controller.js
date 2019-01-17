const BMP24 = require('gd-bmp').BMP24;


/**
 * 主页
 * @param req
 * @param res
 * @param next
 */
exports.main = (req,res,next)=>{
  res.render('main')
}


/**
 * 验证码
 * @param req
 * @param res
 * @param next
 */
exports.captcha = (req,res,next)=>{
  try {
    let captcha = makeCaptcha();
    req.session.captcha = captcha.str;
    res.end(captcha.img);
  } catch (err) {
    res.status(500).end();
  }

  function rand(min, max) {
    return Math.random() * (max - min + 1) + min | 0;
  }

  function makeCaptcha() {
    let img = new BMP24(100, 32);
    let p = "ABCDEFGHKMNPQRSTUVWXYZabcdefghkmnopqrstuvwxyz3456789";
    let fonts = [BMP24.font8x16, BMP24.font12x24, BMP24.font16x32]; //BMP24.font8x16, BMP24.font12x24, BMP24.font16x32
    let x = rand(12, 18), y = 8;
    let str = '';

    // 初始化
    img.fillRect(0, 0, img.w - 1, img.h - 1, 0xffffff);
    img.drawRect(0, 0, img.w - 1, img.h - 1, 0xdddddd);

    // 画圆圈
    img.drawCircle(rand(0, 100), rand(0, 32), rand(10, 32), rand(0x00ff00, 0x33ff33));

    // 画线条
    img.drawLine(rand(0, 100), rand(0, 32), rand(0, 100), rand(0, 32), rand(0x00ff00, 0x33ff33));

    // // 画曲线
    // let w = img.w / 2;
    // let h = img.h;
    // let color = rand(0x00ff00, 0x33ff33);
    // let y1 = rand(-5, 5); //Y轴位置调整
    // let w2 = rand(10, 15); //数值越小频率越高
    // let h3 = rand(4, 6); //数值越小幅度越大
    // let bl = rand(1, 2);
    // for (let i = -w; i < w; i += 0.1) {
    //     let y = Math.floor(h / h3 * Math.sin(i / w2) + h / 2 + y1);
    //     let x = Math.floor(i + w);
    //     for (let j = 0; j < bl; j++) {
    //         img.drawPoint(x, y + j, color);
    //     }
    // }

    for (let i = 0; i < 4; i++) {
      str += p.charAt(Math.random() * p.length | 0);
    }

    for (let i = 0; i < str.length; i++) {
      let f = fonts[Math.random() * fonts.length | 0];
      y = 8 + rand(-10, 0);
      img.drawChar(str[i], x, y, f, rand(0x00ff00, 0x33ff33));
      x += f.w + rand(4, 10);
    }

    return {img: img.getFileData(), str: str};
  }
}