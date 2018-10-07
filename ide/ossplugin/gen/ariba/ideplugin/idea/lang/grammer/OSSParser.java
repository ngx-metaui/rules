// This is a generated file. Not intended for manual editing.
package ariba.ideplugin.idea.lang.grammer;

import com.intellij.lang.PsiBuilder;
import com.intellij.lang.PsiBuilder.Marker;
import static ariba.ideplugin.idea.lang.grammer.psi.OSSTypes.*;
import static ariba.ideplugin.idea.lang.grammer.OSSParserUtil.*;
import com.intellij.psi.tree.IElementType;
import com.intellij.lang.ASTNode;
import com.intellij.psi.tree.TokenSet;
import com.intellij.lang.PsiParser;
import com.intellij.lang.LightPsiParser;

@SuppressWarnings({"SimplifiableIfStatement", "UnusedAssignment"})
public class OSSParser implements PsiParser, LightPsiParser {

  public ASTNode parse(IElementType t, PsiBuilder b) {
    parseLight(t, b);
    return b.getTreeBuilt();
  }

  public void parseLight(IElementType t, PsiBuilder b) {
    boolean r;
    b = adapt_builder_(t, b, this, null);
    Marker m = enter_section_(b, 0, _COLLAPSE_, null);
    if (t == KEY) {
      r = key(b, 0);
    }
    else if (t == LOCALIZED_STRING) {
      r = localizedString(b, 0);
    }
    else if (t == MAP) {
      r = map(b, 0);
    }
    else if (t == PRECEDENCE_CHAIN) {
      r = precedenceChain(b, 0);
    }
    else if (t == RULE) {
      r = rule(b, 0);
    }
    else if (t == RULE_BODY) {
      r = ruleBody(b, 0);
    }
    else if (t == RULE_BODY_KEY_VALUE) {
      r = ruleBodyKeyValue(b, 0);
    }
    else if (t == SELECTOR) {
      r = selector(b, 0);
    }
    else if (t == SELECTOR_DEF) {
      r = selectorDef(b, 0);
    }
    else if (t == SELECTOR_VALUE) {
      r = selectorValue(b, 0);
    }
    else if (t == SIMPLE_VALUE) {
      r = simpleValue(b, 0);
    }
    else if (t == TRAIT_LIST) {
      r = traitList(b, 0);
    }
    else if (t == VALUE) {
      r = value(b, 0);
    }
    else if (t == VALUE_OR_LIST) {
      r = valueOrList(b, 0);
    }
    else if (t == WRAPPED_LIST) {
      r = wrappedList(b, 0);
    }
    else {
      r = parse_root_(t, b, 0);
    }
    exit_section_(b, 0, m, t, r, true, TRUE_CONDITION);
  }

  protected boolean parse_root_(IElementType t, PsiBuilder b, int l) {
    return rules(b, l + 1);
  }

  /* ********************************************************** */
  // KW_CLASS
  //                     | KW_DISPLAYKEY
  //                     | KW_SEARCHOPERATION
  //                     | KW_TRAIT
  //                     | KW_OPERATION
  //                     | KW_FIELD
  //                     | KW_BINDINGS
  //                     | KW_COMPONENT
  //                     | KW_OBJECT
  //                     | KW_VALUEREDIRECTOR
  //                     | KW_ACTION
  //                     | KW_ACTIONRESULTS
  //                     | KW_VISIBLE
  //                     | KW_PAGENAME
  //                     | KW_PAGEBINDINGS
  //                     | KW_AFTER
  //                     | KW_ZLEFT
  //                     | KW_ZRIGHT
  //                     | KW_ZTOP
  //                     | KW_ZBOTTOM
  //                     | KW_ZNONE
  //                     | KW_LAYOUT
  //                     | KW_HOMEPAGE
  //                     | KW_MODULE_TRAIT
  //                     | KW_WRAPPERCOMPONENT
  //                     | KW_WRAPPERBINDINGS
  //                     | KW_PORTLETWRAPPER
  //                     | KW_DISPLAYGROUP
  //                     | KW_NEEDSFORM
  //                     | KW_BEFORE
  //                     | KW_TEXTSEARCHSUPPORTED
  //                     | KW_USETEXTINDEX
  //                     | KW_LABEL
  //                     | KW_MODULE
  //                     | IDENTIFIER
  static boolean IDENTIFIER_KEY(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "IDENTIFIER_KEY")) return false;
    boolean r;
    Marker m = enter_section_(b);
    r = consumeToken(b, KW_CLASS);
    if (!r) r = consumeToken(b, KW_DISPLAYKEY);
    if (!r) r = consumeToken(b, KW_SEARCHOPERATION);
    if (!r) r = consumeToken(b, KW_TRAIT);
    if (!r) r = consumeToken(b, KW_OPERATION);
    if (!r) r = consumeToken(b, KW_FIELD);
    if (!r) r = consumeToken(b, KW_BINDINGS);
    if (!r) r = consumeToken(b, KW_COMPONENT);
    if (!r) r = consumeToken(b, KW_OBJECT);
    if (!r) r = consumeToken(b, KW_VALUEREDIRECTOR);
    if (!r) r = consumeToken(b, KW_ACTION);
    if (!r) r = consumeToken(b, KW_ACTIONRESULTS);
    if (!r) r = consumeToken(b, KW_VISIBLE);
    if (!r) r = consumeToken(b, KW_PAGENAME);
    if (!r) r = consumeToken(b, KW_PAGEBINDINGS);
    if (!r) r = consumeToken(b, KW_AFTER);
    if (!r) r = consumeToken(b, KW_ZLEFT);
    if (!r) r = consumeToken(b, KW_ZRIGHT);
    if (!r) r = consumeToken(b, KW_ZTOP);
    if (!r) r = consumeToken(b, KW_ZBOTTOM);
    if (!r) r = consumeToken(b, KW_ZNONE);
    if (!r) r = consumeToken(b, KW_LAYOUT);
    if (!r) r = consumeToken(b, KW_HOMEPAGE);
    if (!r) r = consumeToken(b, KW_MODULE_TRAIT);
    if (!r) r = consumeToken(b, KW_WRAPPERCOMPONENT);
    if (!r) r = consumeToken(b, KW_WRAPPERBINDINGS);
    if (!r) r = consumeToken(b, KW_PORTLETWRAPPER);
    if (!r) r = consumeToken(b, KW_DISPLAYGROUP);
    if (!r) r = consumeToken(b, KW_NEEDSFORM);
    if (!r) r = consumeToken(b, KW_BEFORE);
    if (!r) r = consumeToken(b, KW_TEXTSEARCHSUPPORTED);
    if (!r) r = consumeToken(b, KW_USETEXTINDEX);
    if (!r) r = consumeToken(b, KW_LABEL);
    if (!r) r = consumeToken(b, KW_MODULE);
    if (!r) r = consumeToken(b, IDENTIFIER);
    exit_section_(b, m, null, r);
    return r;
  }

  /* ********************************************************** */
  // STRING_LITERAL | IDENTIFIER_KEY
  public static boolean key(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "key")) return false;
    boolean r;
    Marker m = enter_section_(b, l, _NONE_, KEY, "<key>");
    r = consumeToken(b, STRING_LITERAL);
    if (!r) r = IDENTIFIER_KEY(b, l + 1);
    exit_section_(b, l, m, r, false, null);
    return r;
  }

  /* ********************************************************** */
  // simpleValue
  //                     | wrappedList
  //                     | map
  //                     | DYN_FIELDPATHBINDING
  //                     | localizedString
  //                     | EXPR_LITERAL
  static boolean listValue(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "listValue")) return false;
    boolean r;
    Marker m = enter_section_(b);
    r = simpleValue(b, l + 1);
    if (!r) r = wrappedList(b, l + 1);
    if (!r) r = map(b, l + 1);
    if (!r) r = consumeToken(b, DYN_FIELDPATHBINDING);
    if (!r) r = localizedString(b, l + 1);
    if (!r) r = consumeToken(b, EXPR_LITERAL);
    exit_section_(b, m, null, r);
    return r;
  }

  /* ********************************************************** */
  // LOCALIZATION_KEY key
  public static boolean localizedString(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "localizedString")) return false;
    if (!nextTokenIs(b, LOCALIZATION_KEY)) return false;
    boolean r;
    Marker m = enter_section_(b);
    r = consumeToken(b, LOCALIZATION_KEY);
    r = r && key(b, l + 1);
    exit_section_(b, m, LOCALIZED_STRING, r);
    return r;
  }

  /* ********************************************************** */
  // '{' [  mapEntry  (';' mapEntry)*  ';'?  ] '}'
  public static boolean map(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "map")) return false;
    if (!nextTokenIs(b, LEFT_BRACE)) return false;
    boolean r;
    Marker m = enter_section_(b);
    r = consumeToken(b, LEFT_BRACE);
    r = r && map_1(b, l + 1);
    r = r && consumeToken(b, RIGHT_BRACE);
    exit_section_(b, m, MAP, r);
    return r;
  }

  // [  mapEntry  (';' mapEntry)*  ';'?  ]
  private static boolean map_1(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "map_1")) return false;
    map_1_0(b, l + 1);
    return true;
  }

  // mapEntry  (';' mapEntry)*  ';'?
  private static boolean map_1_0(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "map_1_0")) return false;
    boolean r;
    Marker m = enter_section_(b);
    r = mapEntry(b, l + 1);
    r = r && map_1_0_1(b, l + 1);
    r = r && map_1_0_2(b, l + 1);
    exit_section_(b, m, null, r);
    return r;
  }

  // (';' mapEntry)*
  private static boolean map_1_0_1(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "map_1_0_1")) return false;
    int c = current_position_(b);
    while (true) {
      if (!map_1_0_1_0(b, l + 1)) break;
      if (!empty_element_parsed_guard_(b, "map_1_0_1", c)) break;
      c = current_position_(b);
    }
    return true;
  }

  // ';' mapEntry
  private static boolean map_1_0_1_0(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "map_1_0_1_0")) return false;
    boolean r;
    Marker m = enter_section_(b);
    r = consumeToken(b, SEMI);
    r = r && mapEntry(b, l + 1);
    exit_section_(b, m, null, r);
    return r;
  }

  // ';'?
  private static boolean map_1_0_2(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "map_1_0_2")) return false;
    consumeToken(b, SEMI);
    return true;
  }

  /* ********************************************************** */
  // key ':' value
  static boolean mapEntry(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "mapEntry")) return false;
    boolean r, p;
    Marker m = enter_section_(b, l, _NONE_);
    r = key(b, l + 1);
    r = r && consumeToken(b, COLON);
    p = r; // pin = 2
    r = r && value(b, l + 1);
    exit_section_(b, l, m, r, p, null);
    return r || p;
  }

  /* ********************************************************** */
  // precedenceChainNodeWithTrait ('=>' precedenceChainNodeWithTrait)+   ';'
  public static boolean precedenceChain(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "precedenceChain")) return false;
    boolean r, p;
    Marker m = enter_section_(b, l, _NONE_, PRECEDENCE_CHAIN, "<precedence chain>");
    r = precedenceChainNodeWithTrait(b, l + 1);
    r = r && precedenceChain_1(b, l + 1);
    p = r; // pin = 2
    r = r && consumeToken(b, SEMI);
    exit_section_(b, l, m, r, p, null);
    return r || p;
  }

  // ('=>' precedenceChainNodeWithTrait)+
  private static boolean precedenceChain_1(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "precedenceChain_1")) return false;
    boolean r;
    Marker m = enter_section_(b);
    r = precedenceChain_1_0(b, l + 1);
    int c = current_position_(b);
    while (r) {
      if (!precedenceChain_1_0(b, l + 1)) break;
      if (!empty_element_parsed_guard_(b, "precedenceChain_1", c)) break;
      c = current_position_(b);
    }
    exit_section_(b, m, null, r);
    return r;
  }

  // '=>' precedenceChainNodeWithTrait
  private static boolean precedenceChain_1_0(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "precedenceChain_1_0")) return false;
    boolean r;
    Marker m = enter_section_(b);
    r = consumeToken(b, NEXT);
    r = r && precedenceChainNodeWithTrait(b, l + 1);
    exit_section_(b, m, null, r);
    return r;
  }

  /* ********************************************************** */
  // DYN_FIELDPATHBINDING | IDENTIFIER_KEY  | '*'
  static boolean precedenceChainNode(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "precedenceChainNode")) return false;
    boolean r;
    Marker m = enter_section_(b);
    r = consumeToken(b, DYN_FIELDPATHBINDING);
    if (!r) r = IDENTIFIER_KEY(b, l + 1);
    if (!r) r = consumeToken(b, STAR);
    exit_section_(b, m, null, r);
    return r;
  }

  /* ********************************************************** */
  // precedenceChainNode   traitList?
  static boolean precedenceChainNodeWithTrait(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "precedenceChainNodeWithTrait")) return false;
    boolean r, p;
    Marker m = enter_section_(b, l, _NONE_);
    r = precedenceChainNode(b, l + 1);
    p = r; // pin = 1
    r = r && precedenceChainNodeWithTrait_1(b, l + 1);
    exit_section_(b, l, m, r, p, null);
    return r || p;
  }

  // traitList?
  private static boolean precedenceChainNodeWithTrait_1(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "precedenceChainNodeWithTrait_1")) return false;
    traitList(b, l + 1);
    return true;
  }

  /* ********************************************************** */
  // key ':' value ';'
  static boolean property(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "property")) return false;
    boolean r;
    Marker m = enter_section_(b);
    r = key(b, l + 1);
    r = r && consumeToken(b, COLON);
    r = r && value(b, l + 1);
    r = r && consumeToken(b, SEMI);
    exit_section_(b, m, null, r);
    return r;
  }

  /* ********************************************************** */
  // selector+  traitList? ('{' ruleBody  '}' | ';')
  public static boolean rule(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "rule")) return false;
    boolean r;
    Marker m = enter_section_(b, l, _NONE_, RULE, "<rule>");
    r = rule_0(b, l + 1);
    r = r && rule_1(b, l + 1);
    r = r && rule_2(b, l + 1);
    exit_section_(b, l, m, r, false, null);
    return r;
  }

  // selector+
  private static boolean rule_0(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "rule_0")) return false;
    boolean r;
    Marker m = enter_section_(b);
    r = selector(b, l + 1);
    int c = current_position_(b);
    while (r) {
      if (!selector(b, l + 1)) break;
      if (!empty_element_parsed_guard_(b, "rule_0", c)) break;
      c = current_position_(b);
    }
    exit_section_(b, m, null, r);
    return r;
  }

  // traitList?
  private static boolean rule_1(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "rule_1")) return false;
    traitList(b, l + 1);
    return true;
  }

  // '{' ruleBody  '}' | ';'
  private static boolean rule_2(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "rule_2")) return false;
    boolean r;
    Marker m = enter_section_(b);
    r = rule_2_0(b, l + 1);
    if (!r) r = consumeToken(b, SEMI);
    exit_section_(b, m, null, r);
    return r;
  }

  // '{' ruleBody  '}'
  private static boolean rule_2_0(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "rule_2_0")) return false;
    boolean r;
    Marker m = enter_section_(b);
    r = consumeToken(b, LEFT_BRACE);
    r = r && ruleBody(b, l + 1);
    r = r && consumeToken(b, RIGHT_BRACE);
    exit_section_(b, m, null, r);
    return r;
  }

  /* ********************************************************** */
  // ruleBodyKeyValue*  rule* ruleBodyKeyValue* rule* precedenceChain*
  public static boolean ruleBody(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "ruleBody")) return false;
    boolean r;
    Marker m = enter_section_(b, l, _NONE_, RULE_BODY, "<rule body>");
    r = ruleBody_0(b, l + 1);
    r = r && ruleBody_1(b, l + 1);
    r = r && ruleBody_2(b, l + 1);
    r = r && ruleBody_3(b, l + 1);
    r = r && ruleBody_4(b, l + 1);
    exit_section_(b, l, m, r, false, null);
    return r;
  }

  // ruleBodyKeyValue*
  private static boolean ruleBody_0(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "ruleBody_0")) return false;
    int c = current_position_(b);
    while (true) {
      if (!ruleBodyKeyValue(b, l + 1)) break;
      if (!empty_element_parsed_guard_(b, "ruleBody_0", c)) break;
      c = current_position_(b);
    }
    return true;
  }

  // rule*
  private static boolean ruleBody_1(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "ruleBody_1")) return false;
    int c = current_position_(b);
    while (true) {
      if (!rule(b, l + 1)) break;
      if (!empty_element_parsed_guard_(b, "ruleBody_1", c)) break;
      c = current_position_(b);
    }
    return true;
  }

  // ruleBodyKeyValue*
  private static boolean ruleBody_2(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "ruleBody_2")) return false;
    int c = current_position_(b);
    while (true) {
      if (!ruleBodyKeyValue(b, l + 1)) break;
      if (!empty_element_parsed_guard_(b, "ruleBody_2", c)) break;
      c = current_position_(b);
    }
    return true;
  }

  // rule*
  private static boolean ruleBody_3(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "ruleBody_3")) return false;
    int c = current_position_(b);
    while (true) {
      if (!rule(b, l + 1)) break;
      if (!empty_element_parsed_guard_(b, "ruleBody_3", c)) break;
      c = current_position_(b);
    }
    return true;
  }

  // precedenceChain*
  private static boolean ruleBody_4(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "ruleBody_4")) return false;
    int c = current_position_(b);
    while (true) {
      if (!precedenceChain(b, l + 1)) break;
      if (!empty_element_parsed_guard_(b, "ruleBody_4", c)) break;
      c = current_position_(b);
    }
    return true;
  }

  /* ********************************************************** */
  // key ':' value '!'? ';'?
  public static boolean ruleBodyKeyValue(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "ruleBodyKeyValue")) return false;
    boolean r, p;
    Marker m = enter_section_(b, l, _NONE_, RULE_BODY_KEY_VALUE, "<rule body key value>");
    r = key(b, l + 1);
    r = r && consumeToken(b, COLON);
    p = r; // pin = 2
    r = r && report_error_(b, value(b, l + 1));
    r = p && report_error_(b, ruleBodyKeyValue_3(b, l + 1)) && r;
    r = p && ruleBodyKeyValue_4(b, l + 1) && r;
    exit_section_(b, l, m, r, p, null);
    return r || p;
  }

  // '!'?
  private static boolean ruleBodyKeyValue_3(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "ruleBodyKeyValue_3")) return false;
    consumeToken(b, EXCL_MARK);
    return true;
  }

  // ';'?
  private static boolean ruleBodyKeyValue_4(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "ruleBodyKeyValue_4")) return false;
    consumeToken(b, SEMI);
    return true;
  }

  /* ********************************************************** */
  // rule *
  static boolean rules(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "rules")) return false;
    int c = current_position_(b);
    while (true) {
      if (!rule(b, l + 1)) break;
      if (!empty_element_parsed_guard_(b, "rules", c)) break;
      c = current_position_(b);
    }
    return true;
  }

  /* ********************************************************** */
  // '@'? (selectorDef |  '~' IDENTIFIER_KEY)
  public static boolean selector(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "selector")) return false;
    boolean r;
    Marker m = enter_section_(b, l, _NONE_, SELECTOR, "<selector>");
    r = selector_0(b, l + 1);
    r = r && selector_1(b, l + 1);
    exit_section_(b, l, m, r, false, null);
    return r;
  }

  // '@'?
  private static boolean selector_0(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "selector_0")) return false;
    consumeToken(b, AT);
    return true;
  }

  // selectorDef |  '~' IDENTIFIER_KEY
  private static boolean selector_1(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "selector_1")) return false;
    boolean r;
    Marker m = enter_section_(b);
    r = selectorDef(b, l + 1);
    if (!r) r = selector_1_1(b, l + 1);
    exit_section_(b, m, null, r);
    return r;
  }

  // '~' IDENTIFIER_KEY
  private static boolean selector_1_1(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "selector_1_1")) return false;
    boolean r;
    Marker m = enter_section_(b);
    r = consumeToken(b, NEGATE);
    r = r && IDENTIFIER_KEY(b, l + 1);
    exit_section_(b, m, null, r);
    return r;
  }

  /* ********************************************************** */
  // IDENTIFIER_KEY   selectorValue?
  public static boolean selectorDef(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "selectorDef")) return false;
    boolean r;
    Marker m = enter_section_(b, l, _NONE_, SELECTOR_DEF, "<selector def>");
    r = IDENTIFIER_KEY(b, l + 1);
    r = r && selectorDef_1(b, l + 1);
    exit_section_(b, l, m, r, false, null);
    return r;
  }

  // selectorValue?
  private static boolean selectorDef_1(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "selectorDef_1")) return false;
    selectorValue(b, l + 1);
    return true;
  }

  /* ********************************************************** */
  // '=' (simpleValue | '(' valueOrList ')' )
  public static boolean selectorValue(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "selectorValue")) return false;
    if (!nextTokenIs(b, OP_EQ)) return false;
    boolean r;
    Marker m = enter_section_(b);
    r = consumeToken(b, OP_EQ);
    r = r && selectorValue_1(b, l + 1);
    exit_section_(b, m, SELECTOR_VALUE, r);
    return r;
  }

  // simpleValue | '(' valueOrList ')'
  private static boolean selectorValue_1(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "selectorValue_1")) return false;
    boolean r;
    Marker m = enter_section_(b);
    r = simpleValue(b, l + 1);
    if (!r) r = selectorValue_1_1(b, l + 1);
    exit_section_(b, m, null, r);
    return r;
  }

  // '(' valueOrList ')'
  private static boolean selectorValue_1_1(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "selectorValue_1_1")) return false;
    boolean r;
    Marker m = enter_section_(b);
    r = consumeToken(b, LEFT_PARENTH);
    r = r && valueOrList(b, l + 1);
    r = r && consumeToken(b, RIGHT_PARENTH);
    exit_section_(b, m, null, r);
    return r;
  }

  /* ********************************************************** */
  // STRING_LITERAL
  //                     |  SQ_STRING_LITERAL
  //                     | INT_LITERAL
  //                     | FLT_LITERAL
  static boolean simpleVal1(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "simpleVal1")) return false;
    boolean r;
    Marker m = enter_section_(b);
    r = consumeToken(b, STRING_LITERAL);
    if (!r) r = consumeToken(b, SQ_STRING_LITERAL);
    if (!r) r = consumeToken(b, INT_LITERAL);
    if (!r) r = consumeToken(b, FLT_LITERAL);
    exit_section_(b, m, null, r);
    return r;
  }

  /* ********************************************************** */
  // simpleVal1
  //                     | IDENTIFIER_KEY
  //                     | KEY_PATH
  //                     | "true"
  //                     | "false"
  //                     | "null"
  public static boolean simpleValue(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "simpleValue")) return false;
    boolean r;
    Marker m = enter_section_(b, l, _NONE_, SIMPLE_VALUE, "<simple value>");
    r = simpleVal1(b, l + 1);
    if (!r) r = IDENTIFIER_KEY(b, l + 1);
    if (!r) r = consumeToken(b, KEY_PATH);
    if (!r) r = consumeToken(b, "true");
    if (!r) r = consumeToken(b, "false");
    if (!r) r = consumeToken(b, "null");
    exit_section_(b, l, m, r, false, null);
    return r;
  }

  /* ********************************************************** */
  // '#' IDENTIFIER  (',' IDENTIFIER)*
  public static boolean traitList(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "traitList")) return false;
    if (!nextTokenIs(b, HASH)) return false;
    boolean r;
    Marker m = enter_section_(b);
    r = consumeToken(b, HASH);
    r = r && consumeToken(b, IDENTIFIER);
    r = r && traitList_2(b, l + 1);
    exit_section_(b, m, TRAIT_LIST, r);
    return r;
  }

  // (',' IDENTIFIER)*
  private static boolean traitList_2(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "traitList_2")) return false;
    int c = current_position_(b);
    while (true) {
      if (!traitList_2_0(b, l + 1)) break;
      if (!empty_element_parsed_guard_(b, "traitList_2", c)) break;
      c = current_position_(b);
    }
    return true;
  }

  // ',' IDENTIFIER
  private static boolean traitList_2_0(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "traitList_2_0")) return false;
    boolean r;
    Marker m = enter_section_(b);
    r = consumeToken(b, COMA);
    r = r && consumeToken(b, IDENTIFIER);
    exit_section_(b, m, null, r);
    return r;
  }

  /* ********************************************************** */
  // valueOrList
  //                 | wrappedList
  //                 | map
  //                 | DYN_FIELDPATHBINDING
  //                 | localizedString
  //                 | EXPR_LITERAL
  public static boolean value(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "value")) return false;
    boolean r;
    Marker m = enter_section_(b, l, _NONE_, VALUE, "<value>");
    r = valueOrList(b, l + 1);
    if (!r) r = wrappedList(b, l + 1);
    if (!r) r = map(b, l + 1);
    if (!r) r = consumeToken(b, DYN_FIELDPATHBINDING);
    if (!r) r = localizedString(b, l + 1);
    if (!r) r = consumeToken(b, EXPR_LITERAL);
    exit_section_(b, l, m, r, false, null);
    return r;
  }

  /* ********************************************************** */
  // listValue (','  listValue)*
  public static boolean valueOrList(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "valueOrList")) return false;
    boolean r;
    Marker m = enter_section_(b, l, _NONE_, VALUE_OR_LIST, "<value or list>");
    r = listValue(b, l + 1);
    r = r && valueOrList_1(b, l + 1);
    exit_section_(b, l, m, r, false, null);
    return r;
  }

  // (','  listValue)*
  private static boolean valueOrList_1(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "valueOrList_1")) return false;
    int c = current_position_(b);
    while (true) {
      if (!valueOrList_1_0(b, l + 1)) break;
      if (!empty_element_parsed_guard_(b, "valueOrList_1", c)) break;
      c = current_position_(b);
    }
    return true;
  }

  // ','  listValue
  private static boolean valueOrList_1_0(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "valueOrList_1_0")) return false;
    boolean r;
    Marker m = enter_section_(b);
    r = consumeToken(b, COMA);
    r = r && listValue(b, l + 1);
    exit_section_(b, m, null, r);
    return r;
  }

  /* ********************************************************** */
  // '[' listValue  (',' listValue) * ']'
  public static boolean wrappedList(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "wrappedList")) return false;
    if (!nextTokenIs(b, LEFT_BRACKET)) return false;
    boolean r;
    Marker m = enter_section_(b);
    r = consumeToken(b, LEFT_BRACKET);
    r = r && listValue(b, l + 1);
    r = r && wrappedList_2(b, l + 1);
    r = r && consumeToken(b, RIGHT_BRACKET);
    exit_section_(b, m, WRAPPED_LIST, r);
    return r;
  }

  // (',' listValue) *
  private static boolean wrappedList_2(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "wrappedList_2")) return false;
    int c = current_position_(b);
    while (true) {
      if (!wrappedList_2_0(b, l + 1)) break;
      if (!empty_element_parsed_guard_(b, "wrappedList_2", c)) break;
      c = current_position_(b);
    }
    return true;
  }

  // ',' listValue
  private static boolean wrappedList_2_0(PsiBuilder b, int l) {
    if (!recursion_guard_(b, l, "wrappedList_2_0")) return false;
    boolean r;
    Marker m = enter_section_(b);
    r = consumeToken(b, COMA);
    r = r && listValue(b, l + 1);
    exit_section_(b, m, null, r);
    return r;
  }

}
