import * as ts from 'typescript';
import {Rule, SchematicContext, SchematicsException, Tree} from '@angular-devkit/schematics';
import {parseSourceFile} from '@angular/cdk/schematics';
import {Change, InsertChange, NoopChange} from '@schematics/angular/utility/change';
import {Schema} from '../../common/schema';
import {getSourceNodes} from '@schematics/angular/utility/ast-utils';


const RegisterBody =
  `// mandatory - you need to register app defined rules and types

    config.registerRules(userRules);
`;


export function registerUserRulesWithMetaConfig(options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {

    const modulePath = options.module as string;

    const changes = addConstructorInjectionForAppConfig(host, options);
    const declarationRecorder = host.beginUpdate(modulePath);
    for (const change of changes) {
      if (change instanceof InsertChange) {
        declarationRecorder.insertLeft(change.pos, change.toAdd);
      }
    }
    host.commitUpdate(declarationRecorder);
    return host;
  };
}


function addConstructorInjectionForAppConfig(host: Tree, options: Schema): Change[] {
  const modulePath = options.module as string;

  const srcPath: any = parseSourceFile(host, modulePath);
  const nodes: any = getSourceNodes(srcPath);
  const ctorNode = nodes.find(n => n.kind === ts.SyntaxKind.Constructor);

  let constructorChange: Change[];
  if (!ctorNode) {
    constructorChange = createConstructorForInjection(modulePath, nodes);

  } else {
    constructorChange = addInjectionToExistingConstructor(modulePath, ctorNode);
  }
  return constructorChange;
}

function createConstructorForInjection(modulePath: string, nodes: ts.Node[]): Change[] {

  const classNode = nodes.find(n => n.kind === ts.SyntaxKind.ClassKeyword);
  if (!classNode) {
    throw new SchematicsException(`expected class in ${modulePath}`);
  }
  if (!classNode.parent) {
    throw new SchematicsException(`expected constructor in ${modulePath}
    to have a parent node`);
  }

  let siblings = classNode.parent.getChildren();
  const classIndex = siblings.indexOf(classNode);

  siblings = siblings.slice(classIndex);
  const classIdentifierNode = siblings.find(n => n.kind === ts.SyntaxKind.Identifier);

  if (!classIdentifierNode) {
    throw new SchematicsException(`expected class in ${modulePath} to have an identifier`);
  }

  const curlyNodeIndex = siblings.findIndex(n => n.kind === ts.SyntaxKind.FirstPunctuation);
  siblings = siblings.slice(curlyNodeIndex);

  const listNode = siblings.find(n => n.kind === ts.SyntaxKind.SyntaxList);

  if (!listNode) {
    throw new SchematicsException(`expected first class in ${modulePath} to have a body`);
  }

  const toAdd = `

  constructor(private config: MetaConfig) {
    ${RegisterBody}
  }
`;

  return [new InsertChange(modulePath, listNode.pos + 1, toAdd)];

}


function addInjectionToExistingConstructor(modulePath: string, ctorNode: ts.Node): Change[] {

  const siblings = ctorNode.getChildren();

  const parameterListNode = siblings.find(n => n.kind === ts.SyntaxKind.SyntaxList);

  if (!parameterListNode) {
    throw new SchematicsException(`expected constructor in ${modulePath} to have a parameter list`);
  }

  const parameterNodes = parameterListNode.getChildren();

  const paramNode = parameterNodes.find(p => {
    const typeNode = findSuccessor(p, [ts.SyntaxKind.TypeReference,
      ts.SyntaxKind.Identifier]);
    if (!typeNode) {
      return false;
    }
    return typeNode.getText() === 'MetaConfig';
  });

  if (!paramNode && parameterNodes.length === 0) {
    const toAdd = `private config: MetaConfig`;
    return [new InsertChange(modulePath, parameterListNode.pos, toAdd)];

  } else if (!paramNode && parameterNodes.length > 0) {

    const toAdd = `, private config: MetaConfig`;
    const lastParameter = parameterNodes[parameterNodes.length - 1];

    const ctorBlock = siblings.find(n => n.kind === ts.SyntaxKind.Block);
    if (!ctorBlock) {
      throw new SchematicsException(`unable to locale ctor block`);
    }

    const bodyStart = ctorBlock.getChildren().find(n => n.kind === ts.SyntaxKind.SyntaxList);
    if (!bodyStart) {
      throw new SchematicsException(`unable to locale ctor body`);
    }

    return [
      new InsertChange(modulePath, lastParameter.end, toAdd),
      new InsertChange(modulePath, bodyStart.pos, RegisterBody)
    ];
  }

  return [new NoopChange()];
}


function findSuccessor(node: ts.Node, searchPath: ts.SyntaxKind[]) {
  let children = node.getChildren();
  let next: ts.Node | undefined;

  for (const syntaxKind of searchPath) {
    next = children.find(n => n.kind === syntaxKind);
    if (!next) {
      return null;
    }
    children = next.getChildren();
  }
  return next;
}
