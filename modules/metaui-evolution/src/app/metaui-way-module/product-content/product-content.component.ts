import {Component} from '@angular/core';


@Component({
    selector: 'product-content',
    template: `<h3>This is my Custom Product Page</h3>

    <p>
        This page has only simple H3 and paragraphs that has only some coppied text from
        news server.
    </p>


    <p>
        Whereas this seems to be promising, this approach suffers from drawbacks and isn’t the
        recommended one by the Angular team. The main drawback is that it prevents us from
        using offline compile to precompile component templates. Using a custom decorator
        for components also prevents external tools from detecting that they are actually
        components.
        In this article, we will describe another approach based on the component composition
        based on components and attribute directives. We will deal with the way to implement
        it, its advantages and limitations.
    </p>

    `
})
export class ProductContentComponent
{

}
