import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import { Search, ArrowRight, ArrowLeft } from 'angular-feather/icons';

const icons = {
  Search,
  ArrowRight,
  ArrowLeft
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule]
})
export class IconsModule {}
