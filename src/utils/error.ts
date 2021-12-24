import * as Sentry from '@sentry/node';

export function captureException(error: any) {
  Sentry.captureException(error);
}
