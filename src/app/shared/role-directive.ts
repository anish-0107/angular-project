import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRoleDirective]',
})
export class RoleDirective {

  private hasView = false;

  @Input() set appRole(allowedRole: string) {
    // Get the role directly from localStorage
    const userRole = localStorage.getItem('Role');     

    if (userRole === allowedRole && !this.hasView) {
      // Create the element if roles match
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (userRole !== allowedRole && this.hasView) {
      // Clear the element if they don't match
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit() {}

}
