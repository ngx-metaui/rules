import {PipeTransform, Pipe} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({name: 'highlightText'})
export class HighlightPipe implements PipeTransform
{
    constructor (public sanitizer: DomSanitizer)
    {
    }

    transform (text: string, search: string): SafeHtml
    {
        if (search && text) {
            let pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
                '\\$&');
            pattern = pattern.split(' ').filter((t) =>
            {
                return t.length > 0;
            }).join('|');
            const regex = new RegExp(pattern, 'gi');
            let changed = text.replace(regex, (match) =>
                `<span class="u-text-highlight">${match}</span>`);
            return this.sanitizer.bypassSecurityTrustHtml(changed);

        } else {
            return text;
        }
    }
}
