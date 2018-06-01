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

public class OSSRuleBodyImpl extends ASTWrapperPsiElement implements OSSRuleBody {

  public OSSRuleBodyImpl(ASTNode node) {
    super(node);
  }

  public void accept(@NotNull OSSVisitor visitor) {
    visitor.visitRuleBody(this);
  }

  public void accept(@NotNull PsiElementVisitor visitor) {
    if (visitor instanceof OSSVisitor) accept((OSSVisitor)visitor);
    else super.accept(visitor);
  }

  @Override
  @NotNull
  public List<OSSPrecedenceChain> getPrecedenceChainList() {
    return PsiTreeUtil.getChildrenOfTypeAsList(this, OSSPrecedenceChain.class);
  }

  @Override
  @NotNull
  public List<OSSRule> getRuleList() {
    return PsiTreeUtil.getChildrenOfTypeAsList(this, OSSRule.class);
  }

  @Override
  @NotNull
  public List<OSSRuleBodyKeyValue> getRuleBodyKeyValueList() {
    return PsiTreeUtil.getChildrenOfTypeAsList(this, OSSRuleBodyKeyValue.class);
  }

}
