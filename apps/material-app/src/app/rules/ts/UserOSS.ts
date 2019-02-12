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
			        '_value': 'title',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'trait': 'bold',
			      'after': 'zTop'
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
			        '_value': [
			          'uniqueName',
			          'firstName',
			          'prefAirline',
			          'favAnimal',
			          'toppings'
			        ],
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
			        '_value': [
			          'lastName',
			          'favColor',
			          'birthDate',
			          'isChecked'
			        ],
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
			      'hint': 'This is generated field.',
			      'label': 'Id'
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
			        '_value': [
			          'firstName',
			          'lastName'
			        ],
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'trait': 'required'
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
			      'trait': [
			        'required',
			        'asSelect'
			      ],
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
			        '_value': 'favColor',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'trait': [
			        'asSelect',
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
			        '_value': 'favAnimal',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'hint': {
			        't': 'Expr',
			        'v': '"Animal says: " + value.sound'
			      },
			      'trait': [
			        'asAutoComplete',
			        'required'
			      ],
			      'label': 'My Animal',
			      'choices': {
			        't': 'Expr',
			        'v': 'controller.animals'
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
			        '_value': 'isChecked',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'label': 'Do I live in cave?'
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
			        '_value': 'toppings',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'label': 'Preferred toppings',
			      'choices': [
			        'Extra cheese',
			        'Mushroom',
			        'Onion',
			        'Pepperoni',
			        'Sausage',
			        'Tomato'
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
			      ],
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
			      'trait': 'toOneRelationship'
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
