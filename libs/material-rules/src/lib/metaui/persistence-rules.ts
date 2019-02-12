/**
 *  This is generated file. Do not edit !!
 *
 *  @formatter:off
 *
 */
/* tslint:disable */
export const SystemPersistenceRules = {
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
			        '_key': 'trait',
			        '_value': 'toOneRelationship',
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
			        '_value': 'toOneRelationship',
			        '_isDecl': false
			      },
			      {
			        '_key': 'editable',
			        '_value': false,
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'component': 'Button',
			      'bindings': {
			        'ngcontent': {
			          't': 'Expr',
			          'v': 'value ? FieldPath.getFieldValue(value, meta.displayLabel(type, properties.get("labelField"))) : null'
			        },
			        'click': {
			          't': 'Expr',
			          'v': 'this.set("object", value), this.set("actionCategory", "General"), this.set("action", "Inspect"), meta.fireAction(this, "", true)'
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
			        '_value': 'toOneRelationship',
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
			        '_key': 'trait',
			        '_value': 'toManyChooser',
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
			        '_value': 'toManyChooser',
			        '_isDecl': false
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
			        'destinationClass': {
			          't': 'Expr',
			          'v': 'elementType'
			        },
			        'multiselect': true,
			        'displayKey': {
			          't': 'Expr',
			          'v': 'meta.displayLabel(type, properties.get("labelField"))'
			        },
			        'type': 'Chooser',
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
			        '_key': 'trait',
			        '_value': 'toManyChooser',
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
			        '_key': 'trait',
			        '_value': 'toManyLink',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'component': 'AWHyperlink',
			      'bindings': {
			        'omitTags': {
			          't': 'Expr',
			          'v': '!value || (value.size() == 0)'
			        },
			        'ngcontent': {
			          't': 'Expr',
			          'v': 'value ? ("" + value.size() + " items") : "(none)"'
			        },
			        'action': {
			          't': 'Expr',
			          'v': 'set("object", value), set("actionCategory", "General"), set("action", "Inspect"), meta.fireAction(this, requestContext)'
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
			        '_key': 'action',
			        '_value': 'Inspect',
			        '_isDecl': false
			      }
			    ],
			    '_properties': {
			      'pageBindings': {
			        'layout': 'Inspect',
			        'operation': 'view',
			        'object': {
			          't': 'Expr',
			          'v': 'object'
			        }
			      },
			      'visible': true,
			      'trait': 'pageAction',
			      'pageName': 'MetaContentPageComponent'
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
