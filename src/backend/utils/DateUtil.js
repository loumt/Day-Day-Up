module.exports = {
  now: ()=>{
    let times = Date.now() - new Date().getTimezoneOffset() * 1000 * 60
    return new Date(times)
  }
}