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
    return {error: null, fields: ["TN", "DS", "TSX"] }
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
    return {fields: [{
      ucfContentExtractionFieldId: "TS",
      ucfContentExtractionFieldDes: "typescript",
      tenants: ["DN", "TS"],
      createdOn: "1st feb 2024"
    }, 
    {
      ucfContentExtractionFieldId: "TSX",
      ucfContentExtractionFieldDes: "typescipt something...",
      tenants: ["DN", "TSX"],
      createdOn: "1st feb 2024"
    },
    {
      ucfContentExtractionFieldId: "DN",
      ucfContentExtractionFieldDes: "DENO, a javascript runtime",
      tenants: ["TN", "TS"],
      createdOn: "1st feb 2024"
    }]}
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
  

  
  