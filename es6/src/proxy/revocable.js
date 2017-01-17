/**
 * 即时撤销对敏感数据的访问
 **/
let sensitiveData = {  
  username: 'devbryce'
};
const {sensitiveData, revokeAccess} = Proxy.revocable(sensitiveData, handler);
function handleSuspectedHack(){  
  // Don't panic
  // Breathe
  revokeAccess();
}
// logs 'devbryce'
console.log(sensitiveData.username);
handleSuspectedHack();
// TypeError: Revoked
console.log(sensitiveData.username);