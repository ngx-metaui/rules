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

public class OSSPrecedenceChainImpl extends ASTWrapperPsiElement implements OSSPrecedenceChain {

  public OSSPrecedenceChainImpl(ASTNode node) {
    super(node);
  }

  public void accept(@NotNull OSSVisitor visitor) {
    visitor.visitPrecedenceChain(this);
  }

  public void accept(@NotNull PsiElementVisitor visitor) {
    if (visitor instanceof OSSVisitor) accept((OSSVisitor)visitor);
    else super.accept(visitor);
  }

  @Override
  @NotNull
  public List<OSSTraitList> getTraitListList() {
    return PsiTreeUtil.getChildrenOfTypeAsList(this, OSSTraitList.class);
  }

}
