const plugins = [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ["./src/"],
        alias: {
          "~": "./",
          "@api": "./api",
          "@assets": "./assets",
          "@redux": "./redux",
          "@chat": "./chat",
          "@common": "./common",
          "@components": "./common/components",
          "@utils": "./utils",
        }
      }
    ]
  ];