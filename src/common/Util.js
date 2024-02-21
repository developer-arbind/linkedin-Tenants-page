export const getCookieVal = function (a) {
    let b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
    b = b ? b.pop() : '';
    return b.replace(new RegExp('"', 'g'), "");
  };
  export const getDate = function (auditStamp) {
    return auditStamp ? new Date(auditStamp.time).toDateString() : "";
  };
  export const getUser = function (auditStamp) {
    return auditStamp ? auditStamp.actor.split(':').slice(-1)[0] : "";
  };