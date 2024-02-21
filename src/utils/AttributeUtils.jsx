export const getContentExtractionFields = async function(fabric) {
    const response = await fetch("/cf-tools/fast-serve/api/contentExtractionFields/" + fabric, {
      credentials: "same-origin"
    });
  
    if (!response.ok) {
      return {error: response}
    } else {
      const json = await response.json();
      return {error: null, fields: json.contentExtractionFields};
    }
  };
  
  export const getCCTTenats = async function(fabric) {
    const response = await fetch("/cf-tools/fast-serve/api/contentExtractionFields/" + fabric, {
      credentials: "same-origin"
    });
  
    if (!response.ok) {
      return {error: response}
    } else {
      const json = await response.json();
      return {error: null, fields: json.contentExtractionFields};
    }
  };
  
  export const getCCTCategories = async function(fabric) {
    const response = await fetch("/cf-tools/fast-serve/api/contentExtractionFields/" + fabric, {
      credentials: "same-origin"
    });
  
    if (!response.ok) {
      return {error: response}
    } else {
      const json = await response.json();
      return {error: null, fields: json.contentExtractionFields};
    }
  };
  

  
  