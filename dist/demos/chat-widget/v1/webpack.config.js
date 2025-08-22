const path = require('path');
const commonConfig = require('../webpack.common.js');

module.exports = (env, argv) => {
  const config = commonConfig(env, argv);
  
  return {
    ...config,
    entry: './src/ChatWidget.js',
    output: {
      ...config.output,
      path: path.resolve(__dirname, 'dist'),
      library: {
        ...config.output.library,
        name: 'ChatWidget.v1',
      },
      filename: 'chat-widget.js',
    },
    module: {
      ...config.module,
      rules: [
        ...(config.module?.rules || []),
        // Add any v1 specific rules here
      ],
    },
  };
};
