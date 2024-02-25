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

  export function objectsAreEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // Check if the number of keys is the same
    if (keys1.length !== keys2.length) {
        return false;
    }

    // Check if all keys and values are equal
    for (let key of keys1) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }

    // If all checks pass, objects are equal
    return true;
}
  export const clearString = (input) => { ///extra added
    // Split the input string by commas
    const parts = input.split(',');
  
    // Filter out empty strings
    const filteredParts = parts.filter(part => part.trim() !== '');
  
    // Join the filtered parts with commas
    const result = filteredParts.join(',');
  
    return result;
  }