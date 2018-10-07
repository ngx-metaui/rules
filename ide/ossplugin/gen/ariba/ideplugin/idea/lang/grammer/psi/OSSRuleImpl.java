// This is a generated file. Not intended for manual editing.
package ariba.ideplugin.idea.lang.grammer.psi;

import java.util.List;
import org.jetbrains.annotations.*;
import com.intellij.lang.ASTNode;
import com.intellij.psi.PsiElement;
import com.intellij.psi.PsiElementVisitor;
import com.intellij.psi.util.PsiTreeUtil;
import static ariba.ideplugin.idea.lang.grammer.psi.OSSTypes.*;
import com.intellij.extapi.psi.ASTWrapperPsiElement;

public class OSSRuleImpl extends ASTWrapperPsiElement implements OSSRule {

  public OSSRuleImpl(ASTNode node) {
    super(node);
  }

  public void accept(@NotNull OSSVisitor visitor) {
    visitor.visitRule(this);
  }

  public void accept(@NotNull PsiElementVisitor visitor) {
    if (visitor instanceof OSSVisitor) accept((OSSVisitor)visitor);
    else super.accept(visitor);
  }

  @Override
  @Nullable
  public OSSRuleBody getRuleBody() {
    return findChildByClass(OSSRuleBody.class);
  }

  @Override
  @NotNull
  public List<OSSSelector> getSelectorList() {
    return PsiTreeUtil.getChildrenOfTypeAsList(this, OSSSelector.class);
  }

  @Override
  @Nullable
  public OSSTraitList getTraitList() {
    return findChildByClass(OSSTraitList.class);
  }

}
