// This is a generated file. Not intended for manual editing.
package ariba.ideplugin.idea.lang.grammer.psi;

import java.util.List;
import org.jetbrains.annotations.*;
import com.intellij.psi.PsiElement;

public interface OSSRule extends PsiElement {

  @Nullable
  OSSRuleBody getRuleBody();

  @NotNull
  List<OSSSelector> getSelectorList();

  @Nullable
  OSSTraitList getTraitList();

}
