'use client';

import { LoaderOrError } from './LoaderOrError';

export const LoaderFallback = () => (
  <LoaderOrError loading={true} error={null} />
);