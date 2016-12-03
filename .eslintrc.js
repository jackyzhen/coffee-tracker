module.exports = {
  "extends": "airbnb",
  "rules": {
    "eol-last": 0,
    "max-len": 0,
    "new-cap": 1,
    "no-shadow": 0,
    "no-unused-expressions": 0,
    "no-param-reassign": [2, {
      "props": false
    }],
    "import/no-unresolved": [2, {
      "ignore": [".\/styles$"]
    }],
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
    "arrow-body-style": 0,
    "linebreak-style": 0,
    "react/jsx-filename-extension": 0,


    "graphql/template-strings": ['error', {
      // Import default settings for your GraphQL client. Supported values:
      // 'apollo', 'relay', 'lokka'
      env: 'apollo',

      // Import your schema JSON here
      schemaJson: require('./src/graphql/introspectionSchema.json'),

      // OR provide absolute path to your schema JSON
      // schemaJsonFilepath: path.resolve(__dirname, './schema.json'),

      // tagName is gql by default
    }]
  },
  "globals": {
    // Mocha
    "describe": true,
    "it": true,
    "window": true,
    "document": true,
    "fetch": true,
    "event": true
  },
  "plugins": [
    "graphql"
  ]
}