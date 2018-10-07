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
import com.intellij.ide.structureView.StructureViewModel;
import com.intellij.ide.structureView.StructureViewModelBase;
import com.intellij.ide.structureView.StructureViewTreeElement;
import com.intellij.psi.PsiFile;

public class OSSStructureViewModel extends StructureViewModelBase implements
        StructureViewModel.ElementInfoProvider
{

    public OSSStructureViewModel (PsiFile psiFile)
    {
        super(psiFile, new OSSFileStructureViewElement((OSSFile)psiFile));
    }

    @Override
    public boolean isAlwaysShowsPlus (StructureViewTreeElement element)
    {
        return true;
    }

    @Override
    public boolean isAlwaysLeaf (StructureViewTreeElement element)
    {
        return element instanceof OSSFile;
    }
}