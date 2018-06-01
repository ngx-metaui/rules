/**
 *  This is generated file. Do not edit !!
 *
 *  @formatter:off
 *
 */
/* tslint:disable */
export const UserProfileRule = {
 	oss:			[
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'UserProfile',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'UserProfile',
			        '_isDecl': false
			      },
			      {
			        '_key': 'field',
			        '_value': 'userId',
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
			        '_value': 'UserProfile',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'UserProfile',
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
			      'label': 'You First Name'
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'UserProfile',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'UserProfile',
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
			      'label': 'You Last Name'
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'UserProfile',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'UserProfile',
			        '_isDecl': false
			      },
			      {
			        '_key': 'field',
			        '_value': 'age',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'label': 'Age'
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'UserProfile',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'UserProfile',
			        '_isDecl': false
			      },
			      {
			        '_key': 'field',
			        '_value': 'note',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'trait': 'required',
			      'label': 'Info About User'
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'UserProfile',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'UserProfile',
			        '_isDecl': false
			      },
			      {
			        '_key': 'field',
			        '_value': 'fullName',
			        '_isDecl': true
			      }
			    ],
			    '_properties': {
			      'trait': 'derived',
			      'label': 'Full Name',
			      'type': 'String',
			      'value': {
			        't': 'Expr',
			        'v': 'object.firstName + " " + object.lastName'
			      }
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'UserProfile',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'UserProfile',
			        '_isDecl': false
			      },
			      {
			        '_key': 'field',
			        '_value': 'extraInfo',
			        '_isDecl': true
			      }
			    ],
			    '_properties': {
			      'visible': {
			        't': 'Expr',
			        'v': 'object.age < 18'
			      },
			      'trait': 'derived',
			      'label': 'Warning',
			      'type': 'String',
			      'value': 'This user is too young !!'
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'UserProfile',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'UserProfile',
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
			        '_value': 'UserProfile',
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
			        '_value': 'UserProfile',
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
			        '_value': 'UserProfile',
			        '_isDecl': false
			      },
			      {
			        '_key': 'operation',
			        '_value': 'edit',
			        '_isDecl': false
			      },
			      {
			        '_key': 'field',
			        '_value': [
			          'firstName',
			          'lastName',
			          'age',
			          'note',
			          'fullName',
			          'extraInfo'
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
			        '_value': 'UserProfile',
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
			        '_value': 'UserProfile',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'UserProfile',
			        '_isDecl': false
			      },
			      {
			        '_key': 'operation',
			        '_value': 'view',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'UserProfile',
			        '_isDecl': false
			      },
			      {
			        '_key': 'operation',
			        '_value': 'view',
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
			        '_value': 'UserProfile',
			        '_isDecl': false
			      },
			      {
			        '_key': 'operation',
			        '_value': 'view',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'UserProfile',
			        '_isDecl': false
			      },
			      {
			        '_key': 'operation',
			        '_value': 'view',
			        '_isDecl': false
			      },
			      {
			        '_key': 'field',
			        '_value': [
			          'userId',
			          'firstName',
			          'lastName',
			          'age',
			          'note',
			          'fullName',
			          'extraInfo'
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
			        '_value': 'UserProfile',
			        '_isDecl': false
			      },
			      {
			        '_key': 'operation',
			        '_value': 'view',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'class',
			        '_value': 'UserProfile',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'role',
			        '_value': 'admin',
			        '_isDecl': false
			      },
			      {
			        '_key': 'class',
			        '_value': 'UserProfile',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'role',
			        '_value': 'admin',
			        '_isDecl': false
			      },
			      {
			        '_key': 'class',
			        '_value': 'UserProfile',
			        '_isDecl': false
			      },
			      {
			        '_key': 'operation',
			        '_value': [
			          'edit',
			          'view'
			        ],
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'role',
			        '_value': 'admin',
			        '_isDecl': false
			      },
			      {
			        '_key': 'class',
			        '_value': 'UserProfile',
			        '_isDecl': false
			      },
			      {
			        '_key': 'operation',
			        '_value': [
			          'edit',
			          'view'
			        ],
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
			        '_key': 'role',
			        '_value': 'admin',
			        '_isDecl': false
			      },
			      {
			        '_key': 'class',
			        '_value': 'UserProfile',
			        '_isDecl': false
			      },
			      {
			        '_key': 'operation',
			        '_value': [
			          'edit',
			          'view'
			        ],
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'role',
			        '_value': 'admin',
			        '_isDecl': false
			      },
			      {
			        '_key': 'class',
			        '_value': 'UserProfile',
			        '_isDecl': false
			      },
			      {
			        '_key': 'operation',
			        '_value': [
			          'edit',
			          'view'
			        ],
			        '_isDecl': false
			      },
			      {
			        '_key': 'field',
			        '_value': [
			          'userId',
			          'firstName',
			          'lastName',
			          'age',
			          'note',
			          'fullName',
			          'extraInfo',
			          'password',
			          'locale',
			          'lastAccessTime'
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
			        '_key': 'role',
			        '_value': 'admin',
			        '_isDecl': false
			      },
			      {
			        '_key': 'class',
			        '_value': 'UserProfile',
			        '_isDecl': false
			      },
			      {
			        '_key': 'operation',
			        '_value': [
			          'edit',
			          'view'
			        ],
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'role',
			        '_value': 'admin',
			        '_isDecl': false
			      },
			      {
			        '_key': 'class',
			        '_value': 'UserProfile',
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
