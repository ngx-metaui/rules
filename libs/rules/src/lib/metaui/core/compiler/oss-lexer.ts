/**
 * @license
 * Copyright 2019 Frank Kolar
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
 *
 */
/**
 *
 *
 * MetaUILexer is OSS tokenizer that recognizes all the supported token. There can be several
 * tokens in the OSS language:
 *
 * Spaces & new lines => Skipped
 *
 * Comments => Scans and returns TOKEN
 *
 * Identifier => Scans and returns TOKEN
 * ex:
 *   ["a"-"z","A"-"Z","_"] ( ["a"-"z","A"-"Z","_","0"-"9"] )*
 *   Commons symbols, keywords
 *
 * Expression => Scans and returns TOKEN
 * ex:
 *  ${value}
 *
 * StaticDynamicExpr =>  Scans and returns TOKEN
 *  ex:
 *      $${value}
 *
 *
 * Key Path => Scans and returns TOKEN
 *  ex:
 *  ["a"-"z","A"-"Z","_"] ( ["a"-"z","A"-"Z","_","0"-"9", ".", "$"] )*
 *   form1.zLeft
 *
 * Dynamic field path binding =>  Scans and returns TOKEN
 * ex:
 *    "$" ["a"-"z","A"-"Z","_"] ( ["a"-"z","A"-"Z","_","0"-"9", "."] )* >
 *    $object
 *    $object.aaa
 *
 * Integer => Scans and returns TOKEN
 * ex:
 *    Integer 111
 *    Float   1.22
 *
 *
 * String literals => Scans and returns TOKEN
 * ex:
 *      Single Queues
 *      Double Queues
 *
 * I18n =>  Scans and returns TOKEN
 *      $[KEY001]
 *
 *
 *
 */
export class OSSLexer {

  pos: number;
  column: number;
  line: number;
  nexChar: number;
  currChar: number;


  constructor(private input: string) {
    this.pos = 0;
    this.column = 1;
    this.line = 1;

    this.currChar = this.input.charCodeAt(this.pos);
    this.nexChar = this.peek();
  }


  nextToken(withComment: boolean = true): OSSToken {

    while (this.currChar !== LexerUtils.EOF) {

      if (LexerUtils.isSpace(this.currChar)) {
        this.consumeSpaces();
      }

      if (LexerUtils.isComment([this.currChar, this.nexChar])) {
        const isBlockComment = LexerUtils.isBlockCommentStart([this.currChar, this.nexChar]);
        const commentToken = this.toCommentToken(isBlockComment);
        if (withComment) {
          return commentToken;
        } else {
          return this.nextToken(withComment);
        }
      }

      if (LexerUtils.isCommonSymbol([this.currChar, this.nexChar])) {
        return this.toCommonSymbolToken();
      }

      if (LexerUtils.isAlpha(this.currChar)) {
        return this.toIdentifierOrKeyPathToken();
      }

      if (LexerUtils.isExpressiontart([this.currChar, this.nexChar])) {
        return this.toExpressionToken();
      }

      if (LexerUtils.isFieldPathBinding([this.currChar, this.nexChar])) {
        return this.fieldPathBindingToken();
      }

      if (LexerUtils.isI18nKey([this.currChar, this.nexChar])) {
        return this.i18nKeyToken();
      }

      if (LexerUtils.isStrLiteralStart(this.currChar)) {
        return this.stringToken();
      }


      if (LexerUtils.isAsterix(this.currChar)) {
        return this.asterixToken();
      }

      if (LexerUtils.isDigit(this.currChar)) {
        return this.numberToken();
      }

      this.currChar = LexerUtils.EOF;
    }
    return new OSSToken(this.column, this.line, OSSTokenType.EOF, null, this.pos,
      this.pos);
  }


  private readInput() {
    return this.input[this.pos];
  }

  private advance(): void {
    if (LexerUtils.isLineEnds(this.currChar)) {
      this.column = 1;
      this.line++;
    } else {
      this.column++;
    }
    this.pos++;

    if (this.pos > this.input.length - 1) {
      this.currChar = this.nexChar = LexerUtils.EOF;

    } else {
      this.currChar = this.input.charCodeAt(this.pos);
      this.nexChar = this.peek();
    }
  }

  peekNextToken(withComment: boolean = true): OSSToken {
    const currPos = this.pos;
    const currColumn = this.column;
    const currLine = this.line;
    const currNxC = this.nexChar;
    const currCChar = this.currChar;

    const nextToken = this.nextToken(withComment);

    this.pos = currPos;
    this.column = currColumn;
    this.line = currLine;
    this.nexChar = currNxC;
    this.currChar = currCChar;

    return nextToken;
  }


  // get some text context where it failed not just a token
  errorContext(): string {
    const from = Math.max(this.pos - 300, 0);
    let msg = '';
    for (let i = from; i < this.pos; i++) {
      msg += this.input[i];
    }
    return msg;
  }

  private peek(): number {
    const nextPos = this.pos + 1;
    if (nextPos > this.input.length - 1) {
      return LexerUtils.EOF;
    }
    return this.input.charCodeAt(nextPos);
  }

  private error(msg: string): void {
    const err = new Error(`Error while parsing: ${msg}: \n ${this.errorContext()}`);
    throw err;
  }


  private toIdentifierOrKeyPathToken(): OSSToken {

    const startPos = this.pos;
    const startLine = this.line;
    const columnStart = this.column;
    let isKeyPath = false;

    let tokenType: OSSTokenType = OSSTokenType.Identifier;
    let value = '';

    const identifier: (code: number) => boolean = (code: number) => LexerUtils
      .isAlphaNum(this.currChar) || LexerUtils.isKeyPathChar(this.currChar);

    // first char must be ["a"-"z","A"-"Z","_"] then followed by alpha+num
    while (!LexerUtils.isEOF(this.currChar) && identifier(this.currChar)) {

      value += this.readInput();
      this.advance();

      // or if key path then . or $
      if (LexerUtils.isKeyPathChar(this.currChar)) {
        tokenType = OSSTokenType.KeyPath;
        isKeyPath = true;
      }
    }

    if (!isKeyPath && (value === 'true' || value === 'false')) {
      tokenType = (value === 'true') ? OSSTokenType.BOOLTRue : OSSTokenType.BOOLFalse;

    } else if (!isKeyPath && value === 'null') {
      tokenType = OSSTokenType.Null;
    } else if (!isKeyPath) {
      tokenType = tokenType = OSSTokenType.Identifier;
    }

    return new OSSToken(columnStart, startLine, tokenType, value, startPos,
      (startPos + value.length));
  }

  // simple expression and static dynamic expression
  private toExpressionToken(): OSSToken {

    const startPos = this.pos;
    const startLine = this.line;
    const columnStart = this.column;

    let type: OSSTokenType = OSSTokenType.ExprLiteral;

    let value = '';

    // staticaly resolvable expr.
    if (this.currChar === LexerUtils.DOLLAR && this.nexChar === LexerUtils.DOLLAR) {
      this.advance(); // On $
      this.advance(); // On $

      type = OSSTokenType.ExprLiteralStaticDyn;

    } else {
      this.advance(); //  On {
    }

    if (this.currChar !== LexerUtils.LBRACE) {
      this.error('Invalid Expression. Missing {');
    }


    this.advance(); // Move after {

    while (LexerUtils.RBRACE !== this.currChar) {
      if (LexerUtils.isEOF(this.currChar)) {
        this.error('Literal expression is not terminated');
      }
      value += this.readInput();
      this.advance();
    }
    this.advance();

    // When we have multiline expr eval cant have ;
    const normalizedValue = value.trim().split(';')
      .filter((item) => item.length > 2).join(',');
    return new OSSToken(columnStart, startLine, type, normalizedValue, startPos,
      (startPos + value.length));
  }

  private fieldPathBindingToken(): OSSToken {

    const columnStart = this.column;
    const startPos = this.pos;
    const startLine = this.line;

    this.advance(); // after $
    let value = '';

    const validFieldPathChar: (code: number) => boolean = (code: number) => {
      return LexerUtils.isAlphaNum(code) || LexerUtils.DOT === code;
    };

    while (validFieldPathChar(this.currChar)) {
      value += this.readInput();
      this.advance();
    }

    return new OSSToken(columnStart, startLine, OSSTokenType.FieldPathBinding, value,
      startPos, (startPos + value.length));
  }


  private asterixToken(): OSSToken {
    const startPos = this.pos;
    const columnStart = this.column;
    const startLine = this.line;
    const value = this.readInput();

    this.advance();
    return new OSSToken(columnStart, startLine, OSSTokenType.Star, value,
      startPos, (startPos + value.length));
  }

  private numberToken(): OSSToken {
    const startPos = this.pos;
    const columnStart = this.column;
    const startLine = this.line;
    let type: OSSTokenType = OSSTokenType.IntLiteral;

    const consumeNums: () => void = () => {
      while (!LexerUtils.isEOF(this.currChar) && LexerUtils.isDigit(this.currChar)) {
        value += this.readInput();
        this.advance();
      }
    };
    let value = '';
    consumeNums();

    if (this.currChar === LexerUtils.DOT) {
      value += this.readInput();
      this.advance();

      consumeNums();
      type = OSSTokenType.FltLiteral;
    }
    return new OSSToken(columnStart, startLine, type, value, startPos,
      (startPos + value.length));
  }

  private stringToken(): OSSToken {
    const startPos = this.pos;
    const startLine = this.line;
    const columnStart = this.column;
    const currQuote = this.currChar; // this can be ' or "

    let value = '';
    this.advance(); // after ' or "

    while (currQuote !== this.currChar) {
      value += this.readInput();
      this.advance();

      if (LexerUtils.isEOF(this.currChar)) {
        this.error('string literal is not correctly terminated.');
      }
    }
    this.advance(); // after ' or "
    return new OSSToken(columnStart, startLine, OSSTokenType.StringLiteral, value,
      startPos, (startPos + value.length));
  }

  private i18nKeyToken(): OSSToken {
    const startPos = this.pos;
    const startLine = this.line;
    const columnStart = this.column;

    this.advance(); // after $
    this.advance(); // after [
    let value = '';

    // consume i18n content
    while (LexerUtils.isAlphaNum(this.currChar)) {

      value += this.readInput();
      this.advance();
    }
    // once we consume all aphanum => expect closing bracket, otherwise show error
    if (LexerUtils.RBRACKET !== this.currChar) {
      this.error('i18n key is not correctly terminated');
    }

    this.advance(); // after ]
    return new OSSToken(columnStart, startLine, OSSTokenType.I18nKey, value,
      startPos, (startPos + value.length));
  }

  private toCommonSymbolToken(): OSSToken {
    const posStart = this.pos;
    const lineStart = this.line;
    const columnStart = this.column;
    let tokenType: OSSTokenType;

    let value = '';

    switch (this.currChar) {
      case LexerUtils.SEMI:
      case LexerUtils.COLON:
      case LexerUtils.COMA:
      case LexerUtils.AT:
      case LexerUtils.HASH:
      case LexerUtils.DOT:
      case LexerUtils.LP:
      case LexerUtils.RP:
      case LexerUtils.LBRACE:
      case LexerUtils.RBRACE:
      case LexerUtils.LBRACKET:
      case LexerUtils.RBRACKET:
      case LexerUtils.NEGATE:
      case LexerUtils.EXCLMARK:
        tokenType = LexerCommonTokensTable.get(this.currChar);
        value += this.readInput();
        this.advance();
        break;

      case LexerUtils.EQ:
        if (this.nexChar === LexerUtils.GT) { // =>

          value += this.readInput();
          this.advance();
          value += this.readInput();
          this.advance();
          tokenType = OSSTokenType.NextPrecedenceChain;
        } else {
          // regular =
          value += this.readInput();
          this.advance();
          tokenType = OSSTokenType.OpEq;
        }
        break;
    }
    return new OSSToken(columnStart, lineStart, tokenType, value, posStart,
      (posStart + value.length));
  }

  /**
   * Parses Block or line level comment
   *
   */
  private toCommentToken(isBlock: boolean): OSSToken {
    const posStart = this.pos;
    const lineStart = this.line;
    const columnStart = this.column;

    let value = '';
    if (isBlock) {
      value = this.consumeBlockComment();
    } else {
      value = this.consumeLineComment();
    }


    return new OSSToken(columnStart, lineStart,
      isBlock ? OSSTokenType.BlockComment : OSSTokenType.LineComment,
      value, posStart, (posStart + value.length));

  }

  private consumeBlockComment() {
    let value: string = this.readInput();

    while (!LexerUtils.isBlockCommentEnd([this.currChar, this.nexChar])) {
      if (LexerUtils.isEOF(this.currChar)) {
        this.error('block comment is not correctly terminated');
      }
      this.advance();
      value += this.readInput();
    }
    this.advance(); // its last SLASH
    value += this.readInput();

    this.advance(); // move pointer to the next char after SLASH
    return value;
  }

  private consumeLineComment() {
    let value: string = this.readInput();

    while (!LexerUtils.isLineEnds(this.nexChar)) {
      if (this.currChar === LexerUtils.EOF) {
        this.error('line comment is not correctly terminated');
      }
      this.advance();
      value += this.readInput();
    }
    this.advance();
    value += this.readInput();
    return value;
  }

  private consumeSpaces(): void {
    while (!LexerUtils.isEOF(this.currChar) && LexerUtils.isSpace(this.currChar)) {
      this.advance();
    }
  }

  toSymbol(token: OSSTokenType): string {
    switch (token) {
      case OSSTokenType.LineComment:
        return '\'//\'';
      case OSSTokenType.BlockComment:
        return '\'/** */\'';
      case OSSTokenType.Semi:
        return '\';\'';
      case OSSTokenType.Colon:
        return '\':\'';
      case OSSTokenType.Coma:
        return '\',\'';
      case OSSTokenType.OpEq:
        return '\'=\'';
      case OSSTokenType.At:
        return '\'@\'';
      case OSSTokenType.Hash:
        return '\'#\'';
      case OSSTokenType.Dot:
        return '\'.\'';
      case OSSTokenType.LParen:
        return '\'(\'';
      case OSSTokenType.RParen:
        return '\')\'';
      case OSSTokenType.LBrace:
        return '\'{\'';
      case OSSTokenType.RBrace:
        return '\'}\'';
      case OSSTokenType.LBracket:
        return '\'[\'';
      case OSSTokenType.RBracket:
        return '\']\'';
      case OSSTokenType.NextPrecedenceChain:
        return '\'=>\'';
      case OSSTokenType.Star:
        return '\'*\'';
      case OSSTokenType.NullMarker:
        return '\'~\'';
      case OSSTokenType.ExclMark:
        return '\'!\'';
      case OSSTokenType.BOOLTRue:
        return '\'true\'';
      case OSSTokenType.BOOLFalse:
        return '\'false\'';
      case OSSTokenType.Null:
        return '\'null\'';
      case OSSTokenType.ExprLiteral:
        return '\'$\'';
      case OSSTokenType.ExprLiteralStaticDyn:
        return '\'$$\'';
      default:
        return '?';
    }
  }

}


export enum OSSTokenType {
  EOF,

  /**
   * Common Tokens and Symbols
   */
  LineComment, BlockComment, Semi, Colon, Coma, OpEq, At, Hash, Dot, LParen,
  RParen, LBrace, RBrace, LBracket, RBracket, NextPrecedenceChain, Star,
  NullMarker, ExclMark, BOOLTRue, BOOLFalse, Null,

  /**
   * RESERVED KEYWORDS Identifiers
   */
  KWClassIdentifier, KWDisplayKeyIdentifier, KWSearchOpIdentifier, KWTraitIdentifier,
  KWOperationIdentifier, KWFieldIdentifier, KWBindingsIdentifier, KWComponentIdentifier,
  KWObjectIdentifier, KWValueRedirectorIdentifier, KWActionIdentifier, KWActionResultsIdentifier,
  KWVisibleIdentifier, KWPageNameIdentifier, KWPageBindingsIdentifier, KWAfterIdentifier,
  KWZtopIdentifier, KWZbottomIdentifier, KWZleftIdentifier, KWZrightIdentifier,
  KWZmiddleIdentifier, KWZnoneIdentifier, KWLayoutIdentifier, KWHomepageIdentifier,
  KWModuleTraitIdentifier, KWModuleIdentifier, KWWrapperCompIdentifier,
  KWWrapperBindingsIdentifier, KWPortletWrapperIdentifier, KWDisplayGroupIdentifier,
  KWBeforeIdentifier, KWTextsearchSupportedIdentifier, KWUseTextIndexIdentifier,
  KWLabelIdentifier, KWEditableIdentifier, KWValidIdentifier, Identifier,


  /**
   * App specific literals and expressions
   */

  ExprLiteral, ExprLiteralStaticDyn, IntLiteral, FltLiteral, StringLiteral,
  FieldPathBinding, I18nKey, KeyPath


}

export class OSSToken {

  constructor(public column: number, public line: number,
              public type: OSSTokenType, public value?: string, public starts?: number,
              public ends?: number) {
  }


  toString(): string {
    return `"${OSSTokenType[this.type]}" Token with value: ${
      (this.type === OSSTokenType.EOF) ? 'EOF' : this.value}`;
  }
}

export const KeyPredecessorChainNode: OSSTokenType[] = [
  OSSTokenType.KeyPath, OSSTokenType.Identifier, OSSTokenType.Star
];

export const KeyPredecessorChain: OSSTokenType[] = [
  OSSTokenType.NextPrecedenceChain, OSSTokenType.Semi
];

export const KeyProperty: OSSTokenType[] = [
  OSSTokenType.Identifier, OSSTokenType.StringLiteral
];


export const SimpleValue: OSSTokenType[] = [
  OSSTokenType.IntLiteral, OSSTokenType.FltLiteral,
  OSSTokenType.Identifier, OSSTokenType.KeyPath, OSSTokenType.BOOLTRue,
  OSSTokenType.BOOLFalse, OSSTokenType.Null, OSSTokenType.StringLiteral
];


export class LexerUtils {
  static readonly EOF = 0;
  static readonly TAB = 9;
  static readonly SPACE = 32;
  static readonly EXCLMARK = 33; // !
  static readonly DQ = 34; // "
  static readonly HASH = 35; // #
  static readonly DOLLAR = 36; // $
  static readonly SQ = 39; // '
  static readonly STAR = 42; // *
  static readonly COMA = 44; // ,
  static readonly LP = 40; // (
  static readonly RP = 41;  // )
  static readonly DOT = 46; // .
  static readonly SLASH = 47; // /
  static readonly COLON = 58; // :
  static readonly SEMI = 59; // ;
  static readonly LT = 60; // <
  static readonly EQ = 61; // =
  static readonly GT = 62; // >
  static readonly AT = 64; // @

  static readonly LBRACKET = 91; // [
  static readonly RBRACKET = 93; // ]
  static readonly UNDERSCORE = 95; // _
  static readonly LBRACE = 123; // {
  static readonly RBRACE = 125; // }
  static readonly NEGATE = 126; // ~

  static readonly CHAR_A = 65; // A
  static readonly CHAR_Z = 90; // Z
  static readonly CHAR_a = 97; // a
  static readonly CHAR_z = 122; // z


  static readonly CHAR_0 = 48; // 0
  static readonly CHAR_9 = 57; // 9


  static readonly LineFeed = 10; // \n
  static readonly CarriageReturn = 13; // \r


  static readonly CommonTokens = [
    LexerUtils.SEMI, LexerUtils.COLON, LexerUtils.COMA, LexerUtils.EQ, LexerUtils.AT,
    LexerUtils.HASH, LexerUtils.HASH, LexerUtils.DOT, LexerUtils.LP, LexerUtils.RP,
    LexerUtils.LBRACE, LexerUtils.RBRACE, LexerUtils.LBRACKET, LexerUtils.RBRACKET,
    LexerUtils.NEGATE, LexerUtils.EXCLMARK
  ];


  static isSpace(code: number): boolean {
    return code === LexerUtils.SPACE || code === LexerUtils.TAB ||
      LexerUtils.isLineEnds(code);
  }


  static isEOF(code: number): boolean {
    return code === LexerUtils.EOF;
  }

  static isLineEnds(code: number): boolean {
    return code === LexerUtils.LineFeed || code === LexerUtils.CarriageReturn;
  }

  static isComment(codes: number[]): boolean {
    return LexerUtils.isBlockCommentStart(codes) || LexerUtils.isLineCommentStart(codes);
  }


  static isBlockCommentStart(codes: number[]): boolean {
    return codes[0] === LexerUtils.SLASH && codes[1] === LexerUtils.STAR;
  }


  static isLineCommentStart(codes: number[]): boolean {
    return codes[0] === LexerUtils.SLASH && codes[1] === LexerUtils.SLASH;
  }

  static isBlockCommentEnd(codes: number[]): boolean {
    return codes[0] === LexerUtils.STAR && codes[1] === LexerUtils.SLASH;
  }


  static isExpressiontart(codes: number[]): boolean {
    return (codes[0] === LexerUtils.DOLLAR && codes[1] === LexerUtils.LBRACE) ||
      (codes[0] === LexerUtils.DOLLAR && codes[1] === LexerUtils.DOLLAR);
  }

  static isAlpha(code: number): boolean {
    return (code >= LexerUtils.CHAR_a && code <= LexerUtils.CHAR_z) ||
      (code >= LexerUtils.CHAR_A && code <= LexerUtils.CHAR_Z) ||
      (code === LexerUtils.UNDERSCORE);
  }

  static isDigit(code: number): boolean {
    return code >= LexerUtils.CHAR_0 && code <= LexerUtils.CHAR_9;
  }

  static isAlphaNum(code: number): boolean {
    return LexerUtils.isAlpha(code) || LexerUtils.isDigit(code);
  }

  static isCommonSymbol(codes: number[]) {
    return LexerUtils.CommonTokens.indexOf(codes[0]) !== -1 ||
      (codes[0] === LexerUtils.EQ && codes[1] === LexerUtils.GT);

  }

  static isFieldPathBinding(codes: number[]): boolean {
    return codes[0] === LexerUtils.DOLLAR && LexerUtils.isAlpha(codes[1]);
  }


  static isI18nKey(codes: number[]): boolean {
    return codes[0] === LexerUtils.DOLLAR && LexerUtils.LBRACKET === codes[1];
  }


  static isKeyPathChar(code: number) {
    return LexerUtils.DOT === code || LexerUtils.DOLLAR === code;

  }


  static isStrLiteralStart(code: number) {
    return LexerUtils.SQ === code || LexerUtils.DQ === code;
  }

  static isAsterix(code: number) {
    return LexerUtils.STAR === code;
  }


}

const LexerCommonTokensTable: Map<number, OSSTokenType> = new Map()
  .set(LexerUtils.SEMI, OSSTokenType.Semi)
  .set(LexerUtils.COLON, OSSTokenType.Colon)
  .set(LexerUtils.COMA, OSSTokenType.Coma)
  .set(LexerUtils.AT, OSSTokenType.At)
  .set(LexerUtils.HASH, OSSTokenType.Hash)
  .set(LexerUtils.DOT, OSSTokenType.Dot)
  .set(LexerUtils.STAR, OSSTokenType.Star)
  .set(LexerUtils.EXCLMARK, OSSTokenType.ExclMark)
  .set(LexerUtils.LP, OSSTokenType.LParen)
  .set(LexerUtils.RP, OSSTokenType.RParen)
  .set(LexerUtils.LBRACE, OSSTokenType.LBrace)
  .set(LexerUtils.RBRACE, OSSTokenType.RBrace)
  .set(LexerUtils.LBRACKET, OSSTokenType.LBracket)
  .set(LexerUtils.RBRACKET, OSSTokenType.RBracket)
  .set(LexerUtils.NEGATE, OSSTokenType.NullMarker);



