/**
 *
 * @license
 * Copyright 2017 SAP Ariba
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
package ariba.ideplugin.idea.lang;

import ariba.ideplugin.idea.lang.grammer.psi.OSSRule;
import ariba.ideplugin.idea.lang.grammer.psi.OSSSelector;
import com.intellij.lang.ASTNode;
import com.intellij.lang.folding.FoldingBuilderEx;
import com.intellij.lang.folding.FoldingDescriptor;
import com.intellij.openapi.editor.Document;
import com.intellij.openapi.editor.FoldingGroup;
import com.intellij.openapi.util.TextRange;
import com.intellij.psi.PsiElement;
import com.intellij.psi.util.PsiTreeUtil;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * Created by fkolar on .
 *
 * @version 1.0
 * @author: Frantisek Kolar
 * @since: 10/28/16
 */
public class OSSFoldingBuilder extends FoldingBuilderEx
{
    @NotNull
    @Override
    public FoldingDescriptor[] buildFoldRegions (@NotNull PsiElement root, @NotNull Document document, boolean b)
    {

        FoldingGroup group = FoldingGroup.newGroup("Oss Rule");

        List<FoldingDescriptor> descriptors = new ArrayList<FoldingDescriptor>();
        Collection<OSSRule> ossRules = PsiTreeUtil.findChildrenOfType(root, OSSRule.class);

        for (final OSSRule rule : ossRules) {
            String ruleText = rule.getText();
            if (ruleText.length() == 0 || rule.getSelectorList().size() == 0 || rule.getRuleBody() == null ||
                    rule.getRuleBody().getText().length() == 0) {
                continue;
            }

            OSSSelector selector = rule.getSelectorList().get(0);
            String text = selector.getText();

            descriptors.add(new FoldingDescriptor(rule.getNode(),
                    new TextRange(rule.getTextRange().getStartOffset() + ruleText.indexOf("{") +1, rule.getTextRange().getEndOffset() - 1)));
        }
        return descriptors.toArray(new FoldingDescriptor[descriptors.size()]);
    }

    @Nullable
    @Override
    public String getPlaceholderText (@NotNull ASTNode astNode)
    {
        return "...";
    }

    @Override
    public boolean isCollapsedByDefault (@NotNull ASTNode astNode)
    {
        return false;
    }
}
