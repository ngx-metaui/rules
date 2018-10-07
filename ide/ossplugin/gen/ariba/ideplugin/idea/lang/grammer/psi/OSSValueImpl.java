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

public class OSSValueImpl extends ASTWrapperPsiElement implements OSSValue {

  public OSSValueImpl(ASTNode node) {
    super(node);
  }

  public void accept(@NotNull OSSVisitor visitor) {
    visitor.visitValue(this);
  }

  public void accept(@NotNull PsiElementVisitor visitor) {
    if (visitor instanceof OSSVisitor) accept((OSSVisitor)visitor);
    else super.accept(visitor);
  }

  @Override
  @Nullable
  public OSSLocalizedString getLocalizedString() {
    return findChildByClass(OSSLocalizedString.class);
  }

  @Override
  @Nullable
  public OSSMap getMap() {
    return findChildByClass(OSSMap.class);
  }

  @Override
  @Nullable
  public OSSValueOrList getValueOrList() {
    return findChildByClass(OSSValueOrList.class);
  }

  @Override
  @Nullable
  public OSSWrappedList getWrappedList() {
    return findChildByClass(OSSWrappedList.class);
  }

  @Override
  @Nullable
  public PsiElement getDynFieldpathbinding() {
    return findChildByType(DYN_FIELDPATHBINDING);
  }

  @Override
  @Nullable
  public PsiElement getExprLiteral() {
    return findChildByType(EXPR_LITERAL);
  }

}
