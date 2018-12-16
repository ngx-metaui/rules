/**
 *  This is generated file. Do not edit !!
 *
 *  @formatter:off
 *
 */
/* tslint:disable */
export const SystemRules = {
 		oss:			[
			  {
			    '_selectors': [
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
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': '*',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'component': 'InputField',
			      'bindings': {
			        'readonly': true,
			        'id': {
			          't': 'Expr',
			          'v': 'properties.get("field")'
			        },
			        'placeholder': {
			          't': 'Expr',
			          'v': 'properties.get("label")'
			        },
			        'value': {
			          't': 'CFP',
			          'v': 'value'
			        },
			        'required': false
			      }
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
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
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': [
			          'boolean',
			          'Boolean'
			        ],
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': [
			          'boolean',
			          'Boolean'
			        ],
			        '_isDecl': false
			      },
			      {
			        '_key': 'editable',
			        '_value': '*',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'component': 'Checkbox',
			      'bindings': {
			        'ngModel': {
			          't': 'CFP',
			          'v': 'value'
			        },
			        'binary': true
			      }
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': [
			          'boolean',
			          'Boolean'
			        ],
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
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
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': 'Number',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': 'Number',
			        '_isDecl': false
			      },
			      {
			        '_key': 'editable',
			        '_value': '*',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'component': 'InputField',
			      'bindings': {
			        'ngModel': {
			          't': 'CFP',
			          'v': 'value'
			        },
			        'readonly': false,
			        'required': {
			          't': 'Expr',
			          'v': 'properties.get("required")'
			        }
			      }
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': 'Number',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': 'Number',
			        '_isDecl': false
			      },
			      {
			        '_key': 'operation',
			        '_value': 'search',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'bindings': {
			        'formatter': {
			          't': 'CFP',
			          'v': 'formatters.blankNull.integer'
			        }
			      }
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': 'Number',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
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
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': 'Date',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'component': 'DateAndTimeComponent',
			      'bindings': {
			        'formatter': 'shortDate',
			        'showTime': false
			      }
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': 'Date',
			        '_isDecl': false
			      },
			      {
			        '_key': 'fiveZoneLayout',
			        '_value': true,
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': 'Date',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': 'Date',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'dateTime',
			        '_isDecl': true
			      },
			      {
			        '_key': 'editable',
			        '_value': '*',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'bindings': {
			        'formatter': 'dateTime',
			        'showTime': true
			      }
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': 'Date',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
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
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': [
			          'Array',
			          'Set'
			        ],
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': [
			          'Array',
			          'Set'
			        ],
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'enum',
			        '_isDecl': true
			      },
			      {
			        '_key': 'editable',
			        '_value': '*',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'component': 'GenericChooserComponent',
			      'bindings': {
			        'multiselect': true,
			        'destinationClass': {
			          't': 'Expr',
			          'v': 'properties.get("enumClass")'
			        },
			        'displayKey': 'name',
			        'key': {
			          't': 'Expr',
			          'v': 'field'
			        },
			        'object': {
			          't': 'Expr',
			          'v': 'object'
			        }
			      }
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': [
			          'Array',
			          'Set'
			        ],
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': [
			          'Array',
			          'Set'
			        ],
			        '_isDecl': false
			      },
			      {
			        '_key': 'operation',
			        '_value': [
			          'search',
			          'list'
			        ],
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
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': [
			          'Array',
			          'Set'
			        ],
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': [
			          'Array',
			          'Set'
			        ],
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'ownedToMany',
			        '_isDecl': true
			      }
			    ],
			    '_properties': {
			      'component': 'MetaDetailTable',
			      'after': 'zDetail'
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': [
			          'Array',
			          'Set'
			        ],
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
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
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': 'String',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': 'String',
			        '_isDecl': false
			      },
			      {
			        '_key': 'editable',
			        '_value': '*',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'component': 'InputField',
			      'bindings': {
			        'ngModel': {
			          't': 'CFP',
			          'v': 'value'
			        },
			        'readonly': false,
			        'id': {
			          't': 'Expr',
			          'v': 'properties.get("field")'
			        },
			        'placeholder': {
			          't': 'Expr',
			          'v': 'properties.get("label")'
			        },
			        'required': {
			          't': 'Expr',
			          'v': 'properties.get("required")'
			        }
			      }
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': 'String',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': 'String',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'longtext',
			        '_isDecl': true
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
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': 'String',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'longtext',
			        '_isDecl': true
			      },
			      {
			        '_key': 'editable',
			        '_value': '*',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'component': 'TextArea',
			      'bindings': {
			        'ngModel': {
			          't': 'CFP',
			          'v': 'value'
			        },
			        'readonly': false,
			        'disabled': false,
			        'required': {
			          't': 'Expr',
			          'v': 'properties.get("required")'
			        }
			      }
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': 'String',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'longtext',
			        '_isDecl': true
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': 'String',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'longtext',
			        '_isDecl': true
			      },
			      {
			        '_key': 'operation',
			        '_value': [
			          'search',
			          'list'
			        ],
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
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': 'String',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'longtext',
			        '_isDecl': true
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': 'String',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': 'String',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'secret',
			        '_isDecl': true
			      }
			    ],
			    '_properties': {
			      'bindings': {
			        'formatter': {
			          't': 'CFP',
			          'v': 'formatters.hiddenPassword'
			        }
			      }
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': 'String',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'secret',
			        '_isDecl': true
			      },
			      {
			        '_key': 'editable',
			        '_value': '*',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'component': 'AWPasswordField',
			      'bindings': {}
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': 'String',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'secret',
			        '_isDecl': true
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': 'String',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'secret',
			        '_isDecl': true
			      },
			      {
			        '_key': 'operation',
			        '_value': [
			          'search',
			          'list'
			        ],
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
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': 'String',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'secret',
			        '_isDecl': true
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': 'String',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': 'String',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'truncated',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'component': 'TruncateString',
			      'bindings': {
			        'size': 10
			      }
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': 'String',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
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
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'type',
			        '_value': 'Money',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'component': 'CurrencyComponent',
			      'bindings': {
			        'money': {
			          't': 'CFP',
			          'v': 'value'
			        },
			        'currencies': {
			          't': 'Expr',
			          'v': 'properties.get("currencies")'
			        }
			      }
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
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
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'derived',
			        '_isDecl': true
			      }
			    ],
			    '_properties': {
			      'editable': false
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'derived',
			        '_isDecl': true
			      },
			      {
			        '_key': 'editing',
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
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'derived',
			        '_isDecl': true
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
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
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'searchable',
			        '_isDecl': true
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'searchable',
			        '_isDecl': true
			      },
			      {
			        '_key': 'operation',
			        '_value': 'search',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'visible': true,
			      'editable': {
			        't': 'OV',
			        'v': 'true'
			      },
			      'after': {
			        't': 'OV',
			        'v': 'null'
			      }
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'searchable',
			        '_isDecl': true
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
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
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'required',
			        '_isDecl': true
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'required',
			        '_isDecl': true
			      },
			      {
			        '_key': 'operation',
			        '_value': [
			          'edit',
			          'create'
			        ],
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'required': true
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'required',
			        '_isDecl': true
			      },
			      {
			        '_key': 'operation',
			        '_value': [
			          'edit',
			          'create'
			        ],
			        '_isDecl': false
			      },
			      {
			        '_key': 'object',
			        '_value': '*',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'valid': {
			        't': 'Expr',
			        'v': '((value != undefined) && (value != null) && (value.length \u003e 0)) ? true : "Required field"'
			      }
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'required',
			        '_isDecl': true
			      },
			      {
			        '_key': 'operation',
			        '_value': [
			          'edit',
			          'create'
			        ],
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'required',
			        '_isDecl': true
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
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
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'fluid',
			        '_isDecl': true
			      }
			    ],
			    '_properties': {
			      'fluid': true
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
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
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'list',
			        '_isDecl': true
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'list',
			        '_isDecl': true
			      },
			      {
			        '_key': 'editable',
			        '_value': '*',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'component': 'Select',
			      'bindings': {
			        'displayKey': {
			          't': 'Expr',
			          'v': 'meta.displayLabel(type, properties.get("labelField"))'
			        },
			        'ngModel': {
			          't': 'CFP',
			          'v': 'value'
			        },
			        'readonly': false,
			        'disabled': false,
			        'list': {
			          't': 'Expr',
			          'v': 'properties.get("choices")'
			        },
			        'required': {
			          't': 'Expr',
			          'v': 'properties.get("required")'
			        }
			      }
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'list',
			        '_isDecl': true
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
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
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'asObject',
			        '_isDecl': true
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'asObject',
			        '_isDecl': true
			      },
			      {
			        '_key': 'editable',
			        '_value': false,
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'component': 'MetaObjectDetailComponent',
			      'nestedLayout': true,
			      'bindings': {
			        'layout': 'Inspect',
			        'useNoLabelLayout': true,
			        'label': {
			          't': 'Expr',
			          'v': 'properties.get("label")'
			        },
			        'object': {
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
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'asObject',
			        '_isDecl': true
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
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
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'asHover',
			        '_isDecl': true
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'asHover',
			        '_isDecl': true
			      },
			      {
			        '_key': 'editable',
			        '_value': false,
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'component': 'HoverCardComponent',
			      'bindings': {
			        'linkTitle': {
			          't': 'CFP',
			          'v': 'value'
			        },
			        'appendContentToBody': false,
			        'ngcontentLayout': 'Content'
			      }
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'asHover',
			        '_isDecl': true
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
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
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'layout',
			        '_value': 'Content',
			        '_isDecl': true
			      }
			    ],
			    '_properties': {
			      'component': 'MetaObjectDetailComponent',
			      'bindings': {
			        'layout': 'Inspect',
			        'object': {
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
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'noCreate',
			        '_isDecl': true
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'noCreate',
			        '_isDecl': true
			      },
			      {
			        '_key': 'operation',
			        '_value': 'create',
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
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'noCreate',
			        '_isDecl': true
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
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
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'noSearch',
			        '_isDecl': true
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'noSearch',
			        '_isDecl': true
			      },
			      {
			        '_key': 'operation',
			        '_value': 'search',
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
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'noSearch',
			        '_isDecl': true
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
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
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'component',
			        '_value': 'GenericChooserComponent',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'component',
			        '_value': 'GenericChooserComponent',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'Popup',
			        '_isDecl': true
			      }
			    ],
			    '_properties': {
			      'bindings': {
			        'type': 'Dropdown'
			      }
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'component',
			        '_value': 'GenericChooserComponent',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'component',
			        '_value': 'GenericChooserComponent',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'PopupControl',
			        '_isDecl': true
			      }
			    ],
			    '_properties': {
			      'bindings': {
			        'type': 'PopupControl'
			      }
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'component',
			        '_value': 'GenericChooserComponent',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'component',
			        '_value': 'GenericChooserComponent',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'Chooser',
			        '_isDecl': true
			      }
			    ],
			    '_properties': {
			      'bindings': {
			        'type': 'Chooser'
			      }
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'component',
			        '_value': 'GenericChooserComponent',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'component',
			        '_value': 'GenericChooserComponent',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'PostOnChange',
			        '_isDecl': true
			      }
			    ],
			    '_properties': {
			      'bindings': {}
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'component',
			        '_value': 'GenericChooserComponent',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
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
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'component',
			        '_value': [
			          'StringComponent',
			          'AWHyperlink',
			          'PopupMenuLink'
			        ],
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'component',
			        '_value': [
			          'StringComponent',
			          'AWHyperlink',
			          'PopupMenuLink'
			        ],
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'bold',
			        '_isDecl': true
			      }
			    ],
			    '_properties': {
			      'wrapperComponent': 'GenericContainerComponent',
			      'wrapperBindings': {
			        'tagName': 'b'
			      }
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'component',
			        '_value': [
			          'StringComponent',
			          'AWHyperlink',
			          'PopupMenuLink'
			        ],
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'component',
			        '_value': [
			          'StringComponent',
			          'AWHyperlink',
			          'PopupMenuLink'
			        ],
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'italic',
			        '_isDecl': true
			      }
			    ],
			    '_properties': {
			      'wrapperComponent': 'GenericContainerComponent',
			      'wrapperBindings': {
			        'tagName': 'i'
			      }
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'component',
			        '_value': [
			          'StringComponent',
			          'AWHyperlink',
			          'PopupMenuLink'
			        ],
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'component',
			        '_value': [
			          'StringComponent',
			          'AWHyperlink',
			          'PopupMenuLink'
			        ],
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'heading1',
			        '_isDecl': true
			      }
			    ],
			    '_properties': {
			      'wrapperComponent': 'GenericContainerComponent',
			      'wrapperBindings': {
			        'tagName': 'h1'
			      }
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'component',
			        '_value': [
			          'StringComponent',
			          'AWHyperlink',
			          'PopupMenuLink'
			        ],
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'component',
			        '_value': [
			          'StringComponent',
			          'AWHyperlink',
			          'PopupMenuLink'
			        ],
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'heading2',
			        '_isDecl': true
			      }
			    ],
			    '_properties': {
			      'wrapperComponent': 'GenericContainerComponent',
			      'wrapperBindings': {
			        'tagName': 'h2'
			      }
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'component',
			        '_value': [
			          'StringComponent',
			          'AWHyperlink',
			          'PopupMenuLink'
			        ],
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'component',
			        '_value': [
			          'StringComponent',
			          'AWHyperlink',
			          'PopupMenuLink'
			        ],
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'heading3',
			        '_isDecl': true
			      }
			    ],
			    '_properties': {
			      'wrapperComponent': 'GenericContainerComponent',
			      'wrapperBindings': {
			        'tagName': 'h3'
			      }
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'component',
			        '_value': [
			          'StringComponent',
			          'AWHyperlink',
			          'PopupMenuLink'
			        ],
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'field',
			        '_value': '*',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'floatingLabel': 'auto'
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'layout',
			        '_value': '*',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'layout',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'ActionButtons',
			        '_isDecl': true
			      }
			    ],
			    '_properties': {
			      'component': 'MetaActionListComponent',
			      'visible': true,
			      'bindings': {
			        'defaultStyle': 'primary',
			        'renderAs': 'buttons',
			        'align': 'right'
			      },
			      'elementClass': 'l-action-buttons'
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'layout',
			        '_value': '*',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'layout',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'ActionLinks',
			        '_isDecl': true
			      }
			    ],
			    '_properties': {
			      'component': 'MetaActionListComponent',
			      'visible': true,
			      'bindings': {
			        'renderAs': 'links',
			        'align': 'none'
			      },
			      'elementClass': 'l-action-buttons'
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'layout',
			        '_value': '*',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'layout',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'ActionLinksAligned',
			        '_isDecl': true
			      }
			    ],
			    '_properties': {
			      'component': 'MetaActionListComponent',
			      'visible': true,
			      'bindings': {
			        'renderAs': 'links',
			        'align': 'right'
			      },
			      'elementClass': 'l-action-buttons'
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'layout',
			        '_value': '*',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'layout',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'ActionMenu',
			        '_isDecl': true
			      }
			    ],
			    '_properties': {
			      'component': 'MetaActionListComponent',
			      'visible': true,
			      'bindings': {
			        'renderAs': 'menu',
			        'align': 'right'
			      },
			      'elementClass': 'l-action-buttons'
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'layout',
			        '_value': '*',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'layout',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'InstanceActionButtons',
			        '_isDecl': true
			      }
			    ],
			    '_properties': {
			      'component': 'MetaActionListComponent',
			      'visible': true,
			      'bindings': {
			        'filterActions': 'instance',
			        'renderAs': 'buttons',
			        'align': 'right'
			      },
			      'elementClass': 'l-action-buttons'
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'layout',
			        '_value': '*',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'layout',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'StaticActionButtons',
			        '_isDecl': true
			      }
			    ],
			    '_properties': {
			      'component': 'MetaActionListComponent',
			      'visible': true,
			      'bindings': {
			        'filterActions': 'static',
			        'renderAs': 'buttons',
			        'align': 'right'
			      },
			      'elementClass': 'l-action-buttons'
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'layout',
			        '_value': '*',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'layout',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'Tabs',
			        '_isDecl': true
			      }
			    ],
			    '_properties': {
			      'component': 'MetaTabs',
			      'visible': true
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'layout',
			        '_value': '*',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'layout',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'Sections',
			        '_isDecl': true
			      }
			    ],
			    '_properties': {
			      'component': 'MetaSectionsComponent',
			      'visible': true
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'layout',
			        '_value': '*',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'layout',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'Form',
			        '_isDecl': true
			      }
			    ],
			    '_properties': {
			      'component': 'MetaForm',
			      'visible': true
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'layout',
			        '_value': '*',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'layout',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'Stack',
			        '_isDecl': true
			      }
			    ],
			    '_properties': {
			      'component': 'MetaElementListComponent',
			      'visible': true
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'layout',
			        '_value': '*',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'layout',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'component',
			        '_value': 'MetaForm',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'floatingLabels',
			        '_isDecl': true
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'layout',
			        '_value': '*',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'layout',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'layout_trait',
			        '_value': 'labelsOnTop',
			        '_isDecl': false
			      },
			      {
			        '_key': 'class',
			        '_value': '*',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'bindings': {
			        'showFloatingLabels': true
			      }
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'layout',
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
			        '_value': {},
			        '_isDecl': false
			      },
			      {
			        '_key': 'layout',
			        '_value': [
			          'Inspect',
			          'SearchForm'
			        ],
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'component': 'StringComponent',
			      'bindings': {}
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'layout',
			        '_value': 'ListItem',
			        '_isDecl': false
			      },
			      {
			        '_key': 'class',
			        '_value': '*',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'component': 'StringComponent',
			      'bindings': {
			        'value': {
			          't': 'Expr',
			          'v': 'properties.get("objectTitle")'
			        }
			      }
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'module',
			        '_value': '*',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'pageBindings': {
			        't': 'Expr',
			        'v': '(properties.get("homePage") == "MetaHomePageComponent") ? new Map().set("module", values.get("module")) : null'
			      },
			      'component': 'MetaDashboardLayoutComponent',
			      'visible': {
			        't': 'SDW',
			        'v': '!properties.get("hidden")'
			      },
			      'homePage': 'MetaHomePageComponent'
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'module',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'layout',
			        '_value': '*',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'visible': true
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'module',
			        '_value': '*',
			        '_isDecl': false
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'module',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'ActionTOC',
			        '_isDecl': true
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'module',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'ActionTOC',
			        '_isDecl': true
			      },
			      {
			        '_key': 'layout',
			        '_value': 'Actions',
			        '_isDecl': true
			      }
			    ],
			    '_properties': {
			      'component': 'MetaActionListComponent',
			      'label': 'Actions',
			      'after': 'zToc'
			    },
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'module',
			        '_value': '*',
			        '_isDecl': false
			      },
			      {
			        '_key': 'trait',
			        '_value': 'ActionTOC',
			        '_isDecl': true
			      }
			    ],
			    '_rank': 0
			  },
			  {
			    '_selectors': [
			      {
			        '_key': 'module',
			        '_value': '*',
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
