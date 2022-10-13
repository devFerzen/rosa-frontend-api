module.exports = {
  client: {
    service: {
      name: 'my-app',
      // URL to the GraphQL API
      url: '/graphql', //'http://localhost:3080/graphql',
    },
    // Files processed by the extension
    includes: [
      'src/**/*.vue',
      'src/**/*.js',
    ],
  },
}