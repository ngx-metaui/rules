// This is a generated file. Not intended for manual editing.
package ariba.ideplugin.idea.lang.grammer.psi;

import java.util.List;
import org.jetbrains.annotations.*;
import com.intellij.psi.PsiElement;

public interface OSSRuleBody extends PsiElement {

  @NotNull
  List<OSSPrecedenceChain> getPrecedenceChainList();

  @NotNull
  List<OSSRule> getRuleList();

  @NotNull
  List<OSSRuleBodyKeyValue> getRuleBodyKeyValueList();

}
