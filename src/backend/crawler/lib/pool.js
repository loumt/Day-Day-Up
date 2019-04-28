let pool = {};

module.exports = {
  get: ()=>{
    let r = []
    for(let t in pool){
      r.push(pool[t].pop())
    }
    return r;
  },
  post: (t,v) => {
    if(!v.address || !v.combine || !v.handler){
      return
    }

    if(pool[t]){
      pool[t].push(v)
    }else{
      pool[t] = [v]
    }
  }
}
