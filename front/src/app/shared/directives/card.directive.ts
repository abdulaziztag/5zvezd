import {AfterViewInit, ContentChild, Directive, HostBinding, TemplateRef} from "@angular/core";

@Directive(
  {
    selector: 'card-directive, [cardDirective]'
  }
)
export class CardDirective implements AfterViewInit {
  @ContentChild(TemplateRef, {read: TemplateRef}) public template: TemplateRef<HTMLElement>;

  ngAfterViewInit() {
    console.log('[CardDirective]', this.template);
  }
}
