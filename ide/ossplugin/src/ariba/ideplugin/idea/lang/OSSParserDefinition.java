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

import ariba.ideplugin.idea.lang.grammer.OSSLexer;
import ariba.ideplugin.idea.lang.grammer.OSSParser;
import ariba.ideplugin.idea.lang.grammer.psi.OSSFile;
import ariba.ideplugin.idea.lang.grammer.psi.OSSTypes;
import org.jetbrains.annotations.NotNull;
import com.intellij.lang.Language;
import com.intellij.lang.LanguageUtil;
import com.intellij.lang.ParserDefinition;
import com.intellij.lang.PsiParser;
import com.intellij.lexer.Lexer;
import com.intellij.openapi.project.Project;
import com.intellij.psi.FileViewProvider;
import com.intellij.psi.PsiElement;
import com.intellij.psi.PsiFile;
import com.intellij.psi.TokenType;
import com.intellij.psi.tree.IFileElementType;
import com.intellij.psi.tree.TokenSet;

import static ariba.ideplugin.idea.lang.grammer.psi.OSSTypes.*;

public class OSSParserDefinition implements ParserDefinition
{
    public static final TokenSet WHITE_SPACES = TokenSet.create(TokenType.WHITE_SPACE);
    public static final IFileElementType FILE = new IFileElementType(Language
            .<OSSLanguage>findInstance(OSSLanguage.class));
    public static final TokenSet KEYWORD_BIT_SET = TokenSet.create(
            KW_ACTION,
            KW_ACTIONRESULTS,
            KW_AFTER,
            KW_BEFORE,
            KW_BINDINGS,
            KW_CLASS,
            KW_COMPONENT,
            KW_DISPLAYGROUP,
            KW_DISPLAYKEY,
            KW_FIELD,
            KW_HOMEPAGE,
            KW_LABEL,
            KW_LAYOUT,
            KW_MODULE,
            KW_MODULE_TRAIT,
            KW_NEEDSFORM,
            KW_OBJECT,
            KW_OPERATION,
            KW_PAGEBINDINGS,
            KW_PAGENAME,
            KW_PORTLETWRAPPER,
            KW_SEARCHOPERATION,
            KW_TEXTSEARCHSUPPORTED,
            KW_TRAIT,
            KW_USETEXTINDEX,
            KW_VALUEREDIRECTOR,
            KW_VISIBLE,
            KW_WRAPPERBINDINGS,
            KW_WRAPPERCOMPONENT,
            KW_ZLEFT,
            KW_ZTOP,
            KW_ZBOTTOM,
            KW_ZNONE,
            KW_ZRIGHT
    );
    public static final TokenSet COMMENT_BIT_SET = TokenSet.create(
            LINE_COMMENT,
            BLOCK_COMMENT
    );
    public static final TokenSet LITERALS = TokenSet.create(
            FLT_LITERAL,
            EXPR_LITERAL,
            INT_LITERAL,
            FLT_LITERAL,
            STRING_LITERAL,
            SQ_STRING_LITERAL
    );

    @NotNull
    @Override
    public Lexer createLexer (Project project)
    {
        return new OSSLexer();
    }

    @NotNull
    public TokenSet getWhitespaceTokens ()
    {
        return WHITE_SPACES;
    }

    @NotNull
    public TokenSet getCommentTokens ()
    {
        return COMMENT_BIT_SET;
    }

    @NotNull
    public TokenSet getStringLiteralElements ()
    {
        return LITERALS;
    }

    @NotNull
    public PsiParser createParser (final Project project)
    {
        return new OSSParser();
    }

    @Override
    public IFileElementType getFileNodeType ()
    {
        return FILE;
    }

    public PsiFile createFile (FileViewProvider viewProvider)
    {
        return new OSSFile(viewProvider);
    }

    @NotNull
    @Override
    public PsiElement createElement (com.intellij.lang.ASTNode node)
    {
        return OSSTypes.Factory.createElement(node);
    }

    @Override
    public SpaceRequirements spaceExistanceTypeBetweenTokens (com.intellij.lang.ASTNode
                                                                          left,
                                                              com.intellij.lang.ASTNode
                                                                      right)
    {
        final Lexer lexer = createLexer(left.getPsi().getProject());
        return LanguageUtil.canStickTokensTogetherByLexer(left, right, lexer);
    }
}
