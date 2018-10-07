/**
 *
 * @license
 * Copyright 2017 SAP Ariba
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

package ariba.ideplugin.idea.lang.grammer;
import com.intellij.lexer.*;
import com.intellij.psi.tree.IElementType;
import static ariba.ideplugin.idea.lang.grammer.psi.OSSTypes.*;

@SuppressWarnings({"ALL"})

%%

%{
  public _OSSLexer() {
    this((java.io.Reader)null);
  }
%}

%public
%class _OSSLexer
%implements FlexLexer
%function advance
%type IElementType
%unicode
%eof{ return;
%eof}

EOL="\r"|"\n"|"\r\n"
LINE_WS=[\ \t\f]
WHITE_SPACE=({LINE_WS}|{EOL})+

LINE_COMMENT="//".*
BLOCK_COMMENT="/*" !([^]* "*/" [^]*) ("*/")?
IDENTIFIER=[a-zA-Z_]([a-zA-Z_0-9])*
EXPR_LITERAL=\${1,2}\{([^}]*)}
STRING_LITERAL=\"[^\"]*\"
SQ_STRING_LITERAL='[^']*'
KEY_PATH=[a-zA-Z_]([a-zA-Z_0-9.\$])*
DYN_FIELDPATHBINDING=\$[a-zA-Z_]([a-zA-Z_0-9.])*
LOCALIZATION_KEY=\$\[[a-zA-Z_0-9]*\]
INT_LITERAL=(0([0-7])*|[1-9]([0-9])*|0[x,X]([0-9,a-f,A-F])+)([l,L,h,H])?
FLT_LITERAL=(([0-9])+\.([0-9])*|\.([0-9])+(e,E]([+,-])?([0-9])+)?([d,D,f,F,b,B])?|([0-9])+[e,E]([+,-])?([0-9])+([d,D,f,F,b,B])?|([0-9])+[d,D,f,F,b,B] )

%%
<YYINITIAL> {
  {WHITE_SPACE}                 { return com.intellij.psi.TokenType.WHITE_SPACE; }

  ";"                           { return SEMI; }
  ":"                           { return COLON; }
  ","                           { return COMA; }
  "="                           { return OP_EQ; }
  "@"                           { return AT; }
  "#"                           { return HASH; }
  "."                           { return DOT; }
  "("                           { return LEFT_PARENTH; }
  ")"                           { return RIGHT_PARENTH; }
  "{"                           { return LEFT_BRACE; }
  "}"                           { return RIGHT_BRACE; }
  "["                           { return LEFT_BRACKET; }
  "]"                           { return RIGHT_BRACKET; }
  "=>"                          { return NEXT; }
  "*"                           { return STAR; }
  "~"                           { return NEGATE; }
  "!"                           { return EXCL_MARK; }
  "class"                       { return KW_CLASS; }
  "displayKey"                  { return KW_DISPLAYKEY; }
  "searchOperation"             { return KW_SEARCHOPERATION; }
  "trait"                       { return KW_TRAIT; }
  "operation"                   { return KW_OPERATION; }
  "field"                       { return KW_FIELD; }
  "bindings"                    { return KW_BINDINGS; }
  "component"                   { return KW_COMPONENT; }
  "object"                      { return KW_OBJECT; }
  "valueRedirector"             { return KW_VALUEREDIRECTOR; }
  "action"                      { return KW_ACTION; }
  "actionResults"               { return KW_ACTIONRESULTS; }
  "visible"                     { return KW_VISIBLE; }
  "pageName"                    { return KW_PAGENAME; }
  "pageBindings"                { return KW_PAGEBINDINGS; }
  "after"                       { return KW_AFTER; }
  "zLeft"                       { return KW_ZLEFT; }
  "zTop"                        { return KW_ZTOP; }
  "zBottom"                     { return KW_ZBOTTOM; }
  "zRight"                      { return KW_ZRIGHT; }
  "zNone"                       { return KW_ZNONE; }
  "layout"                      { return KW_LAYOUT; }
  "homePage"                    { return KW_HOMEPAGE; }
  "module_trait"                { return KW_MODULE_TRAIT; }
  "module"                      { return KW_MODULE; }
  "wrapperComponent"            { return KW_WRAPPERCOMPONENT; }
  "wrapperBindings"             { return KW_WRAPPERBINDINGS; }
  "portletWrapper"              { return KW_PORTLETWRAPPER; }
  "displayGroup"                { return KW_DISPLAYGROUP; }
  "needsForm"                   { return KW_NEEDSFORM; }
  "before"                      { return KW_BEFORE; }
  "textSearchSupported"         { return KW_TEXTSEARCHSUPPORTED; }
  "useTextIndex"                { return KW_USETEXTINDEX; }
  "label"                       { return KW_LABEL; }

  {LINE_COMMENT}                { return LINE_COMMENT; }
  {BLOCK_COMMENT}               { return BLOCK_COMMENT; }
  {IDENTIFIER}                  { return IDENTIFIER; }
  {EXPR_LITERAL}                { return EXPR_LITERAL; }
  {STRING_LITERAL}              { return STRING_LITERAL; }
  {SQ_STRING_LITERAL}           { return SQ_STRING_LITERAL; }
  {KEY_PATH}                    { return KEY_PATH; }
  {DYN_FIELDPATHBINDING}        { return DYN_FIELDPATHBINDING; }
  {LOCALIZATION_KEY}            { return LOCALIZATION_KEY; }
  {INT_LITERAL}                 { return INT_LITERAL; }
  {FLT_LITERAL}                 { return FLT_LITERAL; }

  [^] { return com.intellij.psi.TokenType.BAD_CHARACTER; }
}
