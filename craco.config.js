module.exports = {
  eslint: null,
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      return {
        ...webpackConfig,
        entry: {
          main: [
            env === 'development' && require.resolve('react-dev-utils/webpackHotDevClient'),
            paths.appIndexJs,
          ].filter(Boolean),
          extension: './src/extension.ts',
          content: './src/content.ts',
        },
        output: {
          ...webpackConfig.output,
          filename: 'static/js/[name].js',
          chunkFilename: 'static/js/[name].js',
        },
        optimization: {
          ...webpackConfig.optimization,
          runtimeChunk: false,
        },
      };
    },
  },
};
