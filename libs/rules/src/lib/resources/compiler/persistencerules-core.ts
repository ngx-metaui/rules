/**
 *  This is generated file. Do not edit !!
 *
 *  @formatter:off
 *
 */
/* tslint:disable */
export const SystemPersistenceRules = {
  oss: [
    {
      '_selectors': [
        {
          '_key': 'class',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_properties': {
        'displayKey': 'toString',
        'searchOperation': 'search'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'class',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'Searchable',
          '_isDecl': false
        }
      ],
      '_properties': {
        'textSearchSupported': true,
        'searchOperation': 'keywordSearch'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'class',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'class',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'operation',
          '_value': 'keywordSearch',
          '_isDecl': false
        }
      ],
      '_properties': {
        'useTextIndex': true
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'class',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'operation',
          '_value': 'keywordSearch',
          '_isDecl': false
        },
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_properties': {
        'visible': false
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'class',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'operation',
          '_value': 'keywordSearch',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'class',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'operation',
          '_value': 'keywordSearch',
          '_isDecl': false
        },
        {
          '_key': 'field',
          '_value': 'keywords',
          '_isDecl': true
        }
      ],
      '_properties': {
        'trait': 'SearchableProperty',
        'visible': {
          't': 'OV',
          'v': 'true'
        },
        'type': 'string',
        'rank': 0,
        'after': 'zTop',
        'bindings': {
          'size': 30
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'class',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'operation',
          '_value': 'keywordSearch',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'class',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'class',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'operation',
          '_value': 'textSearch',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'class',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'operation',
          '_value': 'textSearch',
          '_isDecl': false
        },
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'class',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'operation',
          '_value': 'textSearch',
          '_isDecl': false
        },
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'SearchableProperty',
          '_isDecl': false
        }
      ],
      '_properties': {
        'visible': {
          't': 'OV',
          'v': 'true'
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'class',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'operation',
          '_value': 'textSearch',
          '_isDecl': false
        },
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'class',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'operation',
          '_value': 'textSearch',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'class',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'traitGroup',
          '_value': 'RelViewers',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'traitGroup',
          '_value': 'RelViewers',
          '_isDecl': true
        },
        {
          '_key': 'trait',
          '_value': 'toOneRelationship',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'traitGroup',
          '_value': 'RelViewers',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'traitGroup',
          '_value': 'RelViewers',
          '_isDecl': true
        },
        {
          '_key': 'trait',
          '_value': 'toManyChooser',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'traitGroup',
          '_value': 'RelViewers',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'traitGroup',
          '_value': 'RelViewers',
          '_isDecl': true
        },
        {
          '_key': 'trait',
          '_value': 'toManyLink',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'traitGroup',
          '_value': 'RelViewers',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'action',
          '_value': 'Inspect',
          '_isDecl': false
        }
      ],
      '_properties': {
        'visible': true,
        'trait': 'pageAction',
        'pageName': 'MetaContentPageComponent',
        'pageBindings': {
          'object': {
            't': 'Expr',
            'v': 'object'
          },
          'operation': 'view',
          'layout': 'Inspect',
          'clientPanel': true
        }
      },
      '_rank': 0
    }
  ]
};

/* tslint:disable */
/**
 *  @formatter:on
 *
 */
