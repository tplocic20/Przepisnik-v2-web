import {ComponentFactoryResolver, Injectable, ViewContainerRef} from '@angular/core';

@Injectable()
export class ModalService {

  constructor(private factoryResolver: ComponentFactoryResolver) { }

  showModal(viewContainerRef: ViewContainerRef, modal: any, config: any) {
    const factory = this.factoryResolver.resolveComponentFactory(modal);
    const component = factory.create(viewContainerRef.parentInjector);
    if (!config.backdrop)
      config.backdrop = true;
    if (!config.ignoreBackdropClick)
      config.ignoreBackdropClick = true;
    (component.instance as any).config = config;
    viewContainerRef.insert(component.hostView);
  }

}
