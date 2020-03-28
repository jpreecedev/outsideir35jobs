import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeroComponent } from './hero/hero.component';
import { IconsModule } from './icons/icons.module';
import { LatestPostsComponent } from './latest-posts/latest-posts.component';
import { FooterComponent } from './footer/footer.component';
import { LandingComponent } from './landing/landing.component';
import { JobsComponent } from './jobs/jobs.component';
import { PostAJobComponent } from './post-a-job/post-a-job.component';
import { JobComponent } from './job/job.component';
import { PlacesComponent } from './places/places.component';
import { JobEditorComponent } from './job-editor/job-editor.component';
import { ThankYouComponent } from './thank-you/thank-you.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeroComponent,
    LatestPostsComponent,
    FooterComponent,
    LandingComponent,
    JobsComponent,
    PostAJobComponent,
    JobComponent,
    PlacesComponent,
    JobEditorComponent,
    ThankYouComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsModule,
    AngularMultiSelectModule,
    FormsModule,
    CKEditorModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
