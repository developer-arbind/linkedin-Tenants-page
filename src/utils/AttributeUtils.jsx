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
  


export const supportedTenant = async () => {
  return ["DS", "TSX", "TN", "JSX", "JS", "PY", "CPP", "MD", "SD"]
}; 

export const allCatg = async () => {
  return {
    categories: [{
      titile: "DS",
      categories: [{
        title: "ADULT",
        rank: 0,
        maps: [{
          title: "ADULT_SOMETHING",
          rank: 0,
        }, {
          title: "ADULT_KUCH",
          rank: 0,
        }]
      }, {
        title: "IRC",
        rank: 0
      }]
    }, {
      titile: "TS",
      categories: [{
        title: "TEEN",
        rank: 0,
        maps: [{
          title: "AGRRESIVE_TEEN",
          rank:0,
        }]
      }, {
        title: "DANGER_TEEN",
        rank: 0,
        maps: [{
          title: "DUMB_TEEN",
          rank: 0,
        },
        {
          title: "SWEET_TEEN",
          rank: 0,
        }]
      }]
    }, {
      titile: "TSX",
      categories: [{
        title: "SMARTTEEN",
        rank: 0,
        maps: [{
          title: "SMART_TEEN",
          rank:0,
        },
        {
          title: "AVAERAGE_TEEN",
          rank: 0,
        },
        {
          title: "DUMB_TEEN",
          rank: 0,
        }]
      }]
    }, {
      titile: "JSX",
      categories: [{
        title: "REACT",
        rank: 0,
        maps: [{
          title: "REACT+TYPESCRIPT",
          rank: 0,
        }]
      }]
    }, {
      titile: "TTC",
      categories: [{
        title: "DEFAULT",
        rank: 0,
      }]
    },{
      titile: "JS",
      categories: [{
        title: "ADULT1",
        rank: 0,
        maps: [{
          title: "ADULT_SOMETHING1",
          rank: 0,
        }, {
          title: "ADULT_KUCH1",
          rank: 0,
        }]
      }, {
        title: "IRC1",
        rank: 0
      }]
    }, {
      titile: "PY",
      categories: [{
        title: "TEEN1",
        rank: 0,
        maps: [{
          title: "AGRRESIVE_TEEN1",
          rank:0,
        }]
      }, {
        title: "DANGER_TEEN1",
        rank: 0,
        maps: [{
          title: "DUMB_TEEN1",
          rank: 0,
        },
        {
          title: "SWEET_TEEN1",
          rank: 0,
        }]
      }]
    }, {
      titile: "CPP",
      categories: [{
        title: "SMARTTEEN1",
        rank: 0,
        maps: [{
          title: "SMART_TEEN1",
          rank:0,
        },
        {
          title: "AVAERAGE_TEEN1",
          rank: 0,
        },
        {
          title: "DUMB_TEEN1",
          rank: 0,
        }]
      }]
    }, {
      titile: "MD",
      categories: [{
        title: "REACT1",
        rank: 0,
        maps: [{
          title: "REACT+TYPESCRIPT1",
          rank: 0,
        }]
      }]
    }, {
      titile: "TTC1",
      categories: [{
        title: "DEFAULT",
        rank: 0,
      }]
    }, {
      titile: "SD",
      categories: [{
        title: "REACT2",
        rank: 0,
        maps: [{
          title: "REACT+TYPESCRIPT2",
          rank: 0,
        }]
      }]
    }, {
      titile: "TTC2",
      categories: [{
        title: "DEFAULT",
        rank: 0,
      }]
    }]
  }
}

export const createdCatg = async function () {
    return {
      categories: [{
        titile: "DS",
        categories: [{
          title: "ADULT",
          rank: 1,
          maps: [{
            title: "ADULT_SOMETHING",
            rank: 1,
          }, {
            title: "ADULT_KUCH",
            rank: 2,
          }]
        }, {
          title: "IRC",
          rank: 2
        }]
      }, {
        titile: "TS",
        categories: [{
          title: "TEEN",
          rank: 3,
          maps: [{
            title: "AGRRESIVE_TEEN",
            rank: 3,
          }]
        }, {
          title: "DANGER_TEEN",
          rank: 0,
          maps: [{
            title: "DUMB_TEEN",
            rank: 3,
          },
          {
            title: "SWEET_TEEN",
            rank: 1,
          }]
        }]
      }, {
        titile: "TSX",
        categories: [{
          title: "SMARTTEEN",
          rank: 2,
          maps: [{
            title: "SMART_TEEN",
            rank: 2,
          },
          {
            title: "AVAERAGE_TEEN",
            rank: 1,
          },
          {
            title: "DUMB_TEEN",
            rank: 0,
          }]
        }]
      }, {
        titile: "JSX",
        categories: [{
          title: "REACT",
          rank: 0,
          maps: [{
            title: "REACT+TYPESCRIPT",
            rank: 1,
          },  {
            title: "TTC",
            rank: 1
          }]
        }]
      }]
    }
}

  
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
  




  
  
  