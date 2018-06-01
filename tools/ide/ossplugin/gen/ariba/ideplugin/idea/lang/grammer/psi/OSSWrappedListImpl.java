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

public class OSSWrappedListImpl extends ASTWrapperPsiElement implements OSSWrappedList {

  public OSSWrappedListImpl(ASTNode node) {
    super(node);
  }

  public void accept(@NotNull OSSVisitor visitor) {
    visitor.visitWrappedList(this);
  }

  public void accept(@NotNull PsiElementVisitor visitor) {
    if (visitor instanceof OSSVisitor) accept((OSSVisitor)visitor);
    else super.accept(visitor);
  }

  @Override
  @NotNull
  public List<OSSLocalizedString> getLocalizedStringList() {
    return PsiTreeUtil.getChildrenOfTypeAsList(this, OSSLocalizedString.class);
  }

  @Override
  @NotNull
  public List<OSSMap> getMapList() {
    return PsiTreeUtil.getChildrenOfTypeAsList(this, OSSMap.class);
  }

  @Override
  @NotNull
  public List<OSSSimpleValue> getSimpleValueList() {
    return PsiTreeUtil.getChildrenOfTypeAsList(this, OSSSimpleValue.class);
  }

  @Override
  @NotNull
  public List<OSSWrappedList> getWrappedListList() {
    return PsiTreeUtil.getChildrenOfTypeAsList(this, OSSWrappedList.class);
  }

}
