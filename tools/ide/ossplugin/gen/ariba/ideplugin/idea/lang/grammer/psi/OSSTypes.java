// This is a generated file. Not intended for manual editing.
package ariba.ideplugin.idea.lang.grammer.psi;

import com.intellij.psi.tree.IElementType;
import com.intellij.psi.PsiElement;
import com.intellij.lang.ASTNode;

public interface OSSTypes {

  IElementType KEY = new OSSElementType("KEY");
  IElementType LOCALIZED_STRING = new OSSElementType("LOCALIZED_STRING");
  IElementType MAP = new OSSElementType("MAP");
  IElementType PRECEDENCE_CHAIN = new OSSElementType("PRECEDENCE_CHAIN");
  IElementType RULE = new OSSElementType("RULE");
  IElementType RULE_BODY = new OSSElementType("RULE_BODY");
  IElementType RULE_BODY_KEY_VALUE = new OSSElementType("RULE_BODY_KEY_VALUE");
  IElementType SELECTOR = new OSSElementType("SELECTOR");
  IElementType SELECTOR_DEF = new OSSElementType("SELECTOR_DEF");
  IElementType SELECTOR_VALUE = new OSSElementType("SELECTOR_VALUE");
  IElementType SIMPLE_VALUE = new OSSElementType("SIMPLE_VALUE");
  IElementType TRAIT_LIST = new OSSElementType("TRAIT_LIST");
  IElementType VALUE = new OSSElementType("VALUE");
  IElementType VALUE_OR_LIST = new OSSElementType("VALUE_OR_LIST");
  IElementType WRAPPED_LIST = new OSSElementType("WRAPPED_LIST");

  IElementType AT = new OSSTokenType("@");
  IElementType BLOCK_COMMENT = new OSSTokenType("BLOCK_COMMENT");
  IElementType COLON = new OSSTokenType(":");
  IElementType COMA = new OSSTokenType(",");
  IElementType DOT = new OSSTokenType(".");
  IElementType DYN_FIELDPATHBINDING = new OSSTokenType("DYN_FIELDPATHBINDING");
  IElementType EXCL_MARK = new OSSTokenType("!");
  IElementType EXPR_LITERAL = new OSSTokenType("EXPR_LITERAL");
  IElementType FLT_LITERAL = new OSSTokenType("FLT_LITERAL");
  IElementType HASH = new OSSTokenType("#");
  IElementType IDENTIFIER = new OSSTokenType("IDENTIFIER");
  IElementType INT_LITERAL = new OSSTokenType("INT_LITERAL");
  IElementType KEY_PATH = new OSSTokenType("KEY_PATH");
  IElementType KW_ACTION = new OSSTokenType("action");
  IElementType KW_ACTIONRESULTS = new OSSTokenType("actionResults");
  IElementType KW_AFTER = new OSSTokenType("after");
  IElementType KW_BEFORE = new OSSTokenType("before");
  IElementType KW_BINDINGS = new OSSTokenType("bindings");
  IElementType KW_CLASS = new OSSTokenType("class");
  IElementType KW_COMPONENT = new OSSTokenType("component");
  IElementType KW_DISPLAYGROUP = new OSSTokenType("displayGroup");
  IElementType KW_DISPLAYKEY = new OSSTokenType("displayKey");
  IElementType KW_FIELD = new OSSTokenType("field");
  IElementType KW_HOMEPAGE = new OSSTokenType("homePage");
  IElementType KW_LABEL = new OSSTokenType("label");
  IElementType KW_LAYOUT = new OSSTokenType("layout");
  IElementType KW_MODULE = new OSSTokenType("module");
  IElementType KW_MODULE_TRAIT = new OSSTokenType("module_trait");
  IElementType KW_NEEDSFORM = new OSSTokenType("needsForm");
  IElementType KW_OBJECT = new OSSTokenType("object");
  IElementType KW_OPERATION = new OSSTokenType("operation");
  IElementType KW_PAGEBINDINGS = new OSSTokenType("pageBindings");
  IElementType KW_PAGENAME = new OSSTokenType("pageName");
  IElementType KW_PORTLETWRAPPER = new OSSTokenType("portletWrapper");
  IElementType KW_SEARCHOPERATION = new OSSTokenType("searchOperation");
  IElementType KW_TEXTSEARCHSUPPORTED = new OSSTokenType("textSearchSupported");
  IElementType KW_TRAIT = new OSSTokenType("trait");
  IElementType KW_USETEXTINDEX = new OSSTokenType("useTextIndex");
  IElementType KW_VALUEREDIRECTOR = new OSSTokenType("valueRedirector");
  IElementType KW_VISIBLE = new OSSTokenType("visible");
  IElementType KW_WRAPPERBINDINGS = new OSSTokenType("wrapperBindings");
  IElementType KW_WRAPPERCOMPONENT = new OSSTokenType("wrapperComponent");
  IElementType KW_ZBOTTOM = new OSSTokenType("zBottom");
  IElementType KW_ZLEFT = new OSSTokenType("zLeft");
  IElementType KW_ZNONE = new OSSTokenType("zNone");
  IElementType KW_ZRIGHT = new OSSTokenType("zRight");
  IElementType KW_ZTOP = new OSSTokenType("zTop");
  IElementType LEFT_BRACE = new OSSTokenType("{");
  IElementType LEFT_BRACKET = new OSSTokenType("[");
  IElementType LEFT_PARENTH = new OSSTokenType("(");
  IElementType LINE_COMMENT = new OSSTokenType("LINE_COMMENT");
  IElementType LOCALIZATION_KEY = new OSSTokenType("LOCALIZATION_KEY");
  IElementType NEGATE = new OSSTokenType("~");
  IElementType NEXT = new OSSTokenType("=>");
  IElementType OP_EQ = new OSSTokenType("=");
  IElementType RIGHT_BRACE = new OSSTokenType("}");
  IElementType RIGHT_BRACKET = new OSSTokenType("]");
  IElementType RIGHT_PARENTH = new OSSTokenType(")");
  IElementType SEMI = new OSSTokenType(";");
  IElementType SQ_STRING_LITERAL = new OSSTokenType("SQ_STRING_LITERAL");
  IElementType STAR = new OSSTokenType("*");
  IElementType STRING_LITERAL = new OSSTokenType("STRING_LITERAL");

  class Factory {
    public static PsiElement createElement(ASTNode node) {
      IElementType type = node.getElementType();
       if (type == KEY) {
        return new OSSKeyImpl(node);
      }
      else if (type == LOCALIZED_STRING) {
        return new OSSLocalizedStringImpl(node);
      }
      else if (type == MAP) {
        return new OSSMapImpl(node);
      }
      else if (type == PRECEDENCE_CHAIN) {
        return new OSSPrecedenceChainImpl(node);
      }
      else if (type == RULE) {
        return new OSSRuleImpl(node);
      }
      else if (type == RULE_BODY) {
        return new OSSRuleBodyImpl(node);
      }
      else if (type == RULE_BODY_KEY_VALUE) {
        return new OSSRuleBodyKeyValueImpl(node);
      }
      else if (type == SELECTOR) {
        return new OSSSelectorImpl(node);
      }
      else if (type == SELECTOR_DEF) {
        return new OSSSelectorDefImpl(node);
      }
      else if (type == SELECTOR_VALUE) {
        return new OSSSelectorValueImpl(node);
      }
      else if (type == SIMPLE_VALUE) {
        return new OSSSimpleValueImpl(node);
      }
      else if (type == TRAIT_LIST) {
        return new OSSTraitListImpl(node);
      }
      else if (type == VALUE) {
        return new OSSValueImpl(node);
      }
      else if (type == VALUE_OR_LIST) {
        return new OSSValueOrListImpl(node);
      }
      else if (type == WRAPPED_LIST) {
        return new OSSWrappedListImpl(node);
      }
      throw new AssertionError("Unknown element type: " + type);
    }
  }
}
