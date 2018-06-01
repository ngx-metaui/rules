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

public class OSSSelectorImpl extends ASTWrapperPsiElement implements OSSSelector {

  public OSSSelectorImpl(ASTNode node) {
    super(node);
  }

  public void accept(@NotNull OSSVisitor visitor) {
    visitor.visitSelector(this);
  }

  public void accept(@NotNull PsiElementVisitor visitor) {
    if (visitor instanceof OSSVisitor) accept((OSSVisitor)visitor);
    else super.accept(visitor);
  }

  @Override
  @Nullable
  public OSSSelectorDef getSelectorDef() {
    return findChildByClass(OSSSelectorDef.class);
  }

  @Override
  @Nullable
  public PsiElement getIdentifier() {
    return findChildByType(IDENTIFIER);
  }

}
