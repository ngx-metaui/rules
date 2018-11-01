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
			        '_value': 'name',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'editable': {
			        't': 'Expr',
			        'v': 'object.isAngularDeveloper'
			      },
			      'trait': 'required',
			      'label': 'Full name'
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
			      'trait': 'longtext'
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
			        '_value': 'description',
			        '_isDecl': false
			      },
			      {
			        '_key': 'editing',
			        '_value': false,
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'visible': {
			        't': 'Expr',
			        'v': 'object.isAngularDeveloper'
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
			      },
			      {
			        '_key': 'field',
			        '_value': 'description',
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
			        '_value': 'age',
			        '_isDecl': false
			      },
			      {
			        '_key': 'editable',
			        '_value': false,
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'component': 'AgeRatingComponent',
			      'bindings': {
			        'value': {
			          't': 'CFP',
			          'v': 'value'
			        }
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
			        '_value': 'created',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'valid': {
			        't': 'Expr',
			        'v': 'object.isValidCreateDate() ? true : "The date cannot be in the future"'
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
			        '_value': 'name',
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
			        '_value': 'description',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'after': 'name'
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
			        '_value': 'created',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'after': 'description'
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
			      'after': 'created'
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
			        '_value': 'isAngularDeveloper',
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
			        '_key': 'operation',
			        '_value': 'edit',
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
			        '_key': 'operation',
			        '_value': 'edit',
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
			      },
			      {
			        '_key': 'operation',
			        '_value': 'edit',
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
			        '_key': 'operation',
			        '_value': 'edit',
			        '_isDecl': false
			      },
			      {
			        '_key': 'field',
			        '_value': 'name',
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
			        '_key': 'operation',
			        '_value': 'edit',
			        '_isDecl': false
			      },
			      {
			        '_key': 'field',
			        '_value': 'description',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'after': 'name'
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
			        '_key': 'operation',
			        '_value': 'edit',
			        '_isDecl': false
			      },
			      {
			        '_key': 'field',
			        '_value': 'age',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'after': 'description'
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
			        '_key': 'operation',
			        '_value': 'edit',
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
			        '_key': 'operation',
			        '_value': 'create',
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
			        '_key': 'operation',
			        '_value': 'create',
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
			      },
			      {
			        '_key': 'operation',
			        '_value': 'create',
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
			        '_key': 'operation',
			        '_value': 'create',
			        '_isDecl': false
			      },
			      {
			        '_key': 'field',
			        '_value': 'name',
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
			        '_key': 'operation',
			        '_value': 'create',
			        '_isDecl': false
			      },
			      {
			        '_key': 'field',
			        '_value': 'description',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'after': 'name'
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
			        '_key': 'operation',
			        '_value': 'create',
			        '_isDecl': false
			      },
			      {
			        '_key': 'field',
			        '_value': 'created',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'after': 'description'
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
			        '_key': 'operation',
			        '_value': 'create',
			        '_isDecl': false
			      },
			      {
			        '_key': 'field',
			        '_value': 'isAngularDeveloper',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'after': 'created'
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
			        '_key': 'operation',
			        '_value': 'create',
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
			        '_key': 'action',
			        '_value': 'Save',
			        '_isDecl': true
			      }
			    ],
			    '_properties': {
			      'visible': {
			        't': 'Expr',
			        'v': 'properties.get("editing")'
			      },
			      'buttonStyle': 'info',
			      'actionResults': {
			        't': 'Expr',
			        'v': 'alert("Record saved !")'
			      },
			      'label': 'Save'
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
			        '_key': 'action',
			        '_value': 'Discard',
			        '_isDecl': true
			      }
			    ],
			    '_properties': {
			      'visible': {
			        't': 'Expr',
			        'v': 'properties.get("editing")'
			      },
			      'buttonStyle': 'info',
			      'actionResults': {
			        't': 'Expr',
			        'v': 'alert("All cleared !")'
			      },
			      'label': 'Discard Changes'
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
