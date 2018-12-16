/**
 *  This is generated file. Do not edit !!
 *
 *  @formatter:off
 *
 */
/* tslint:disable */
export const UserRule = {
 	oss:			[
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'User',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'User',
			        '_isDecl': false
			      },
			      {
			        '_key': 'field',
			        '_value': 'description',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'hint': {
			        't': 'Expr',
			        'v': '"You can type some long text here: " + value.length'
			      },
			      'trait': [
			        'fluid',
			        'longtext'
			      ]
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'User',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'User',
			        '_isDecl': false
			      },
			      {
			        '_key': 'field',
			        '_value': 'favColor',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'trait': [
			        'list',
			        'required'
			      ],
			      'choices': [
			        'Blue',
			        'Red',
			        'Yellow'
			      ]
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'User',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'User',
			        '_isDecl': false
			      },
			      {
			        '_key': 'field',
			        '_value': 'prefAirline',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'trait': 'list',
			      'label': 'My airlines',
			      'choices': {
			        't': 'Expr',
			        'v': 'controller.airlines'
			      }
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'User',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'User',
			        '_isDecl': false
			      },
			      {
			        '_key': 'field',
			        '_value': 'uniqueName',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'hint': 'This is generated field.'
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'User',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'User',
			        '_isDecl': false
			      },
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'after': 'zNone'
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'User',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'User',
			        '_isDecl': false
			      },
			      {
			        '_key': 'field',
			        '_value': 'uniqueName',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'after': 'zLeft'
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'User',
			        '_isDecl': false
			      },
			      {
			        '_key': 'field',
			        '_value': 'firstName',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'trait': 'required',
			      'after': 'uniqueName'
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'User',
			        '_isDecl': false
			      },
			      {
			        '_key': 'field',
			        '_value': 'prefAirline',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'after': 'firstName'
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'User',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'User',
			        '_isDecl': false
			      },
			      {
			        '_key': 'field',
			        '_value': 'title',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'after': 'zRight'
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'User',
			        '_isDecl': false
			      },
			      {
			        '_key': 'field',
			        '_value': 'lastName',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'trait': 'required',
			      'after': 'title'
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'User',
			        '_isDecl': false
			      },
			      {
			        '_key': 'field',
			        '_value': 'favColor',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'after': 'lastName'
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'User',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'User',
			        '_isDecl': false
			      },
			      {
			        '_key': 'field',
			        '_value': 'description',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'after': 'zBottom'
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'User',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  }
			]
};

/* tslint:disable */
/**
 *  @formatter:on
 *
 */
