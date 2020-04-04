import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { environment } from '../environments/environment';

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
import { ThankYouComponent } from './thank-you/thank-you.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { LatestPostsPipe } from './latest-posts.pipe';
import { SentryErrorHandler } from './sentry.service';

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
    ThankYouComponent,
    SignInComponent,
    LatestPostsPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsModule,
    AngularMultiSelectModule,
    FormsModule,
    CKEditorModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: ErrorHandler, useClass: SentryErrorHandler }],
})
export class AppModule {}
