import { NextPage } from 'next';

import { EmptyLayout } from '../layouts/EmptyLayout';
import { MainLayout } from '../layouts/MainLayout';

export type PageWithMainLayoutType = NextPage & { layout: typeof MainLayout | typeof EmptyLayout };
