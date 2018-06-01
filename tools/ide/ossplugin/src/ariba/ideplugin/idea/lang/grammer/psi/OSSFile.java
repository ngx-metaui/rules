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
package ariba.ideplugin.idea.lang.grammer.psi;

import ariba.ideplugin.idea.lang.OSSFileType;
import ariba.ideplugin.idea.lang.OSSLanguage;
import javax.swing.*;
import org.jetbrains.annotations.NotNull;
import com.intellij.extapi.psi.PsiFileBase;
import com.intellij.openapi.fileTypes.FileType;
import com.intellij.psi.FileViewProvider;

public class OSSFile extends PsiFileBase
{
    public OSSFile (@NotNull FileViewProvider viewProvider)
    {
        super(viewProvider, OSSLanguage.INSTANCE);
    }

    @NotNull
    @Override
    public FileType getFileType ()
    {
        return OSSFileType.INSTANCE;
    }

    @Override
    public String toString ()
    {
        return "OSS File";
    }

    @Override
    public Icon getIcon (int flags)
    {
        return super.getIcon(flags);
    }
}