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

import ariba.ideplugin.idea.lang.grammer.psi.OSSPrecedenceChain;
import javax.swing.*;
import org.jetbrains.annotations.Nullable;
import com.intellij.ide.structureView.StructureViewTreeElement;
import com.intellij.ide.util.treeView.smartTree.TreeElement;
import com.intellij.navigation.ItemPresentation;
import com.intellij.navigation.NavigationItem;

public class OSSPrecedenceChainStructureViewElement implements
        StructureViewTreeElement, ItemPresentation
{
    private final OSSPrecedenceChain myRule;

    public OSSPrecedenceChainStructureViewElement (final OSSPrecedenceChain rule)
    {
        this.myRule = rule;
    }

    @Override
    public OSSPrecedenceChain getValue ()
    {
        return myRule;
    }

    @Override
    public void navigate (boolean requestFocus)
    {
        if (myRule instanceof NavigationItem) {
            ((NavigationItem)myRule).navigate(requestFocus);
        }
    }

    @Override
    public boolean canNavigate ()
    {
        return myRule instanceof NavigationItem &&
                ((NavigationItem)myRule).canNavigate();
    }

    @Override
    public boolean canNavigateToSource ()
    {
        return myRule instanceof NavigationItem &&
                ((NavigationItem)myRule).canNavigateToSource();
    }

    @Nullable
    @Override
    public String getLocationString ()
    {
        return myRule.getText();
    }

    @Nullable
    @Override
    public Icon getIcon (boolean unused)
    {
        return myRule.getIcon(0);
    }

    @Nullable
    @Override
    public String getPresentableText ()
    {
        return "PrecedenceChain";
    }

    @Override
    public ItemPresentation getPresentation ()
    {
        return this;
    }

    @Override
    public TreeElement[] getChildren ()
    {
        return EMPTY_ARRAY;
    }

}