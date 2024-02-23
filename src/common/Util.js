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


  export const clearString = (input) => { ///extra added
    // Split the input string by commas
    const parts = input.split(',');
  
    // Filter out empty strings
    const filteredParts = parts.filter(part => part.trim() !== '');
  
    // Join the filtered parts with commas
    const result = filteredParts.join(',');
  
    return result;
  }