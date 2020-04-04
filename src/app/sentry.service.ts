import { ErrorHandler, Injectable } from '@angular/core';

import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: 'https://43265f7a7a77445ca059561138fe5f48@sentry.io/5188490',
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error) {
    const eventId = Sentry.captureException(error.originalError || error);
    Sentry.showReportDialog({ eventId });
  }
}
