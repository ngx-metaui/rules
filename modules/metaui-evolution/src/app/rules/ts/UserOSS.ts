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
			        '_value': 'uniqueName',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'label': 'User Id'
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
			        '_value': 'lastName',
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
			      },
			      {
			        '_key': 'field',
			        '_value': 'age',
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
			      },
			      {
			        '_key': 'field',
			        '_value': 'dob',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'after': 'age'
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
			        '_key': 'layout',
			        '_value': 'Inspect2',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'trait': 'Stack'
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'layout',
			        '_value': 'Inspect2',
			        '_isDecl': false
			      },
			      {
			        '_key': 'layout',
			        '_value': 'MenuTop',
			        '_isDecl': true
			      }
			    ],
			    '_properties': {
			      'trait': 'ActionButtons'
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'layout',
			        '_value': 'Inspect2',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'layout',
			        '_value': 'Inspect2',
			        '_isDecl': false
			      },
			      {
			        '_key': 'layout',
			        '_value': 'First',
			        '_isDecl': true
			      }
			    ],
			    '_properties': {
			      'trait': 'Form'
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'layout',
			        '_value': 'Inspect2',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'object',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'action',
			        '_value': 'update',
			        '_isDecl': true
			      }
			    ],
			    '_properties': {
			      'visible': {
			        't': 'Expr',
			        'v': 'properties.editing'
			      },
			      'actionResults': {
			        't': 'Expr',
			        'v': 'object.firstName = ("Mr." + object.firstName)'
			      }
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'object',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'action',
			        '_value': 'Save',
			        '_isDecl': true
			      }
			    ],
			    '_properties': {
			      'visible': {
			        't': 'Expr',
			        'v': 'properties.editing'
			      },
			      'buttonStyle': 'info',
			      'actionResults': {
			        't': 'Expr',
			        'v': 'object.firstName = ("Ms." + object.firstName)'
			      },
			      'label': 'My Save'
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'group',
			        '_value': 'ObjectDetail',
			        '_isDecl': false
			      },
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
			        '_key': 'group',
			        '_value': 'ObjectDetail',
			        '_isDecl': false
			      },
			      {
			        '_key': 'class',
			        '_value': 'User',
			        '_isDecl': false
			      },
			      {
			        '_key': 'layout',
			        '_value': '*',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'trait': 'labelsOnTop'
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'group',
			        '_value': 'ObjectDetail',
			        '_isDecl': false
			      },
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
			        '_key': 'group',
			        '_value': 'ObjectDetail',
			        '_isDecl': false
			      },
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
			      'label': 'User Id'
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'group',
			        '_value': 'ObjectDetail',
			        '_isDecl': false
			      },
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
			        '_key': 'group',
			        '_value': 'ObjectDetail',
			        '_isDecl': false
			      },
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
			        '_key': 'group',
			        '_value': 'ObjectDetail',
			        '_isDecl': false
			      },
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
			        '_key': 'group',
			        '_value': 'ObjectDetail',
			        '_isDecl': false
			      },
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
			        '_key': 'group',
			        '_value': 'ObjectDetail',
			        '_isDecl': false
			      },
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
			      'after': 'uniqueName'
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'group',
			        '_value': 'ObjectDetail',
			        '_isDecl': false
			      },
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
			      'after': 'firstName'
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'group',
			        '_value': 'ObjectDetail',
			        '_isDecl': false
			      },
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
