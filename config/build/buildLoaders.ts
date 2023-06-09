import type webpack from 'webpack';

import { buildBabelLoader } from './loaders/buildBabelLoader';
import { buildCSSLoader } from './loaders/buildCSSLoader';
import { buildImageLoader } from './loaders/buildImageLoader';
import { buildSvgrLoader } from './loaders/buildSvgrLoader';
import { buildTypeScriptLoader } from './loaders/buildTypeScriptLoader';
import { type BuildOptions } from './types/config';

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
  return [
    buildSvgrLoader(),
    buildImageLoader(),
    buildCSSLoader(isDev),
    buildBabelLoader(isDev),
    buildTypeScriptLoader()
  ];
}
