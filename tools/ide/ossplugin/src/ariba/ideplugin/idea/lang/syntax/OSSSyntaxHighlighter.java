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
package ariba.ideplugin.idea.lang.syntax;

import ariba.ideplugin.idea.lang.OSSParserDefinition;
import ariba.ideplugin.idea.lang.grammer.OSSLexer;
import ariba.ideplugin.idea.lang.grammer.psi.OSSTypes;
import java.util.HashMap;
import java.util.Map;
import org.jetbrains.annotations.NotNull;
import com.intellij.lexer.Lexer;
import com.intellij.openapi.editor.DefaultLanguageHighlighterColors;
import com.intellij.openapi.editor.HighlighterColors;
import com.intellij.openapi.editor.SyntaxHighlighterColors;
import com.intellij.openapi.editor.colors.TextAttributesKey;
import com.intellij.openapi.fileTypes.SyntaxHighlighterBase;
import com.intellij.psi.tree.IElementType;
import static ariba.ideplugin.idea.lang.grammer.psi.OSSTypes.AT;
import static ariba.ideplugin.idea.lang.grammer.psi.OSSTypes.COMA;
import static ariba.ideplugin.idea.lang.grammer.psi.OSSTypes.DOT;
import static ariba.ideplugin.idea.lang.grammer.psi.OSSTypes.DYN_FIELDPATHBINDING;
import static ariba.ideplugin.idea.lang.grammer.psi.OSSTypes.EXPR_LITERAL;
import static ariba.ideplugin.idea.lang.grammer.psi.OSSTypes.FLT_LITERAL;
import static ariba.ideplugin.idea.lang.grammer.psi.OSSTypes.HASH;
import static ariba.ideplugin.idea.lang.grammer.psi.OSSTypes.INT_LITERAL;
import static ariba.ideplugin.idea.lang.grammer.psi.OSSTypes.KEY_PATH;
import static ariba.ideplugin.idea.lang.grammer.psi.OSSTypes.LOCALIZATION_KEY;
import static ariba.ideplugin.idea.lang.grammer.psi.OSSTypes.LOCALIZED_STRING;
import static ariba.ideplugin.idea.lang.grammer.psi.OSSTypes.SEMI;
import static ariba.ideplugin.idea.lang.grammer.psi.OSSTypes.SIMPLE_VALUE;
import static ariba.ideplugin.idea.lang.grammer.psi.OSSTypes.SQ_STRING_LITERAL;
import static ariba.ideplugin.idea.lang.grammer.psi.OSSTypes.STRING_LITERAL;
import static com.intellij.openapi.editor.DefaultLanguageHighlighterColors.BLOCK_COMMENT;
import static com.intellij.openapi.editor.DefaultLanguageHighlighterColors.KEYWORD;
import static com.intellij.openapi.editor.DefaultLanguageHighlighterColors.LINE_COMMENT;

public class OSSSyntaxHighlighter extends SyntaxHighlighterBase
{
    private static final Map<IElementType, TextAttributesKey> keys1;
    private static final Map<IElementType, TextAttributesKey> keys2;

    static {
        keys1 = new HashMap<IElementType, TextAttributesKey>();
        keys2 = new HashMap<IElementType, TextAttributesKey>();

        fillMap(keys1, OSSParserDefinition.KEYWORD_BIT_SET, KEYWORD);

        keys1.put(STRING_LITERAL, DefaultLanguageHighlighterColors.STRING);
        keys1.put(SQ_STRING_LITERAL, DefaultLanguageHighlighterColors.STRING);
        keys1.put(LOCALIZED_STRING, DefaultLanguageHighlighterColors.STRING);
        keys1.put(INT_LITERAL, DefaultLanguageHighlighterColors.NUMBER);
        keys1.put(FLT_LITERAL, DefaultLanguageHighlighterColors.NUMBER);
        keys1.put(EXPR_LITERAL, DefaultLanguageHighlighterColors.OPERATION_SIGN);
        keys1.put(DYN_FIELDPATHBINDING, DefaultLanguageHighlighterColors.OPERATION_SIGN);
        keys1.put(KEY_PATH, DefaultLanguageHighlighterColors.OPERATION_SIGN);

        keys1.put(OSSTypes.BLOCK_COMMENT, BLOCK_COMMENT);
        keys1.put(OSSTypes.LINE_COMMENT, LINE_COMMENT);
        keys1.put(AT, KEYWORD);

        keys1.put(OSSTypes.LEFT_PARENTH, DefaultLanguageHighlighterColors.PARENTHESES);
        keys1.put(OSSTypes.RIGHT_PARENTH, DefaultLanguageHighlighterColors.PARENTHESES);

        keys1.put(OSSTypes.LEFT_BRACE, DefaultLanguageHighlighterColors.BRACES);
        keys1.put(OSSTypes.RIGHT_BRACE, DefaultLanguageHighlighterColors.BRACES);

        keys1.put(OSSTypes.LEFT_BRACKET, DefaultLanguageHighlighterColors.BRACES);

        keys1.put(OSSTypes.RIGHT_BRACKET, DefaultLanguageHighlighterColors.BRACES);
        keys1.put(com.intellij.psi.TokenType.BAD_CHARACTER,
                HighlighterColors.BAD_CHARACTER);

        keys1.put(LOCALIZATION_KEY, DefaultLanguageHighlighterColors.KEYWORD);
        keys1.put(HASH, DefaultLanguageHighlighterColors.CLASS_NAME);

        keys1.put(COMA, DefaultLanguageHighlighterColors.COMMA);
        keys1.put(DOT, DefaultLanguageHighlighterColors.DOT);
        keys1.put(SEMI, DefaultLanguageHighlighterColors.SEMICOLON);
        keys1.put(SIMPLE_VALUE, DefaultLanguageHighlighterColors.KEYWORD);

    }

    @NotNull
    @Override
    public Lexer getHighlightingLexer ()
    {
        return new OSSLexer();
    }

    @NotNull
    @Override
    public TextAttributesKey[] getTokenHighlights (IElementType tokenType)
    {
        return pack(keys1.get(tokenType), keys2.get(tokenType));
    }
}
