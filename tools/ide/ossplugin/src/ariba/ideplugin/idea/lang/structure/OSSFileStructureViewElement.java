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
package ariba.ideplugin.idea.lang.structure;

import ariba.ideplugin.idea.lang.grammer.psi.OSSFile;
import ariba.ideplugin.idea.lang.grammer.psi.OSSRule;
import java.util.ArrayList;
import java.util.Collection;
import javax.swing.*;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import com.intellij.ide.structureView.StructureViewTreeElement;
import com.intellij.ide.structureView.impl.common.PsiTreeElementBase;
import com.intellij.navigation.ItemPresentation;
import com.intellij.psi.util.PsiTreeUtil;

public class OSSFileStructureViewElement extends PsiTreeElementBase<OSSFile>
{

    public OSSFileStructureViewElement (OSSFile ossFile)
    {
        super(ossFile);
    }

    @NotNull
    @Override
    public Collection<StructureViewTreeElement> getChildrenBase ()
    {
        Collection<OSSRule> rules = PsiTreeUtil.findChildrenOfType(getElement(), OSSRule.class);
        Collection<StructureViewTreeElement> elements = new
                ArrayList<StructureViewTreeElement>(rules.size());

        for (OSSRule rule : rules) {
            elements.add(new OSSRuleStructureViewElement(rule));
        }
        return elements;
    }

    @Override
    public ItemPresentation getPresentation ()
    {
        return new ItemPresentation()
        {
            public String getPresentableText ()
            {
                return OSSFileStructureViewElement.this.getPresentableText();
            }

            public String getLocationString ()
            {
                return null;
            }

            public Icon getIcon (boolean open)
            {
                return getElement().getIcon(0);
            }
        };
    }

    @Nullable
    @Override
    public String getPresentableText ()
    {
        return getElement().getName();
    }
}
