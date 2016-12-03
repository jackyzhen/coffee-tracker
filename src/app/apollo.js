import ApolloClient, { createNetworkInterface, addTypename, toIdValue } from 'apollo-client';

 // appollo client setup
export default (() => {
  const networkInterface = createNetworkInterface({ uri: '/graphql' }); // url
  // this adds an auth header to every graphql request
  networkInterface.use([{
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};  // Create the header object if needed.
      }
      // get the authentication token from local storage if it exists
      req.options.headers.authorization = 'Basic Y29mZmVldHJhY2tlcjpTdXBlclNlY3JldFBhc3N3b3Jk';
      next();
    },
  }]);

  const dataIdFromObject = (result) => {
    // eslint-disable-next-line
    if (result.id && result.__typename) {
      // eslint-disable-next-line
      let id = result.__typename + result.id;
      // console.log('id: ', id);
      return id;
    }

    // Make sure to return null if this object doesn't have an ID
    return null;
  };

  const client = new ApolloClient({
    networkInterface,
    // this tells apollo to resolve from cache the same items even if from different query paths (people vs person)
    customResolvers: {
      Query: {
        person: (_, args) => toIdValue(dataIdFromObject({ __typename: 'personType', id: args.id })),
      },
    },
    // adds the __typename field to every query, so we can use it to better resolve cache
    queryTransformer: addTypename,
    // this helps apollo client normalize/dedup same objects
    dataIdFromObject,
  });

  return client;
})();