/**
 * 阻止非必要的重度资源消耗型操作
 **/

let obj = {  
  getGiantFile: function(fileId) {/*...*/ }
};
obj = new Proxy(obj, {  
  get(target, key, proxy) {
    return function(...args) {
      const id = args[0];
      let isEnroute = checkEnroute(id);
      let isDownloading = checkStatus(id);      
      let cached = getCached(id);
      if (isEnroute || isDownloading) {
        return false;
      }
      if (cached) {
        return cached;
      }
      return Reflect.apply(target[key], target, args);
    }
  }
});