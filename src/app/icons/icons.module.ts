import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import { Search, ArrowRight } from 'angular-feather/icons';

const icons = {
  Search,
  ArrowRight
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule]
})
export class IconsModule {}
