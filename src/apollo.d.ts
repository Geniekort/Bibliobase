declare module 'vue-cli-plugin-apollo/graphql-client';

declare module '*.gql' {
  import {DocumentNode} from 'graphql';

  const value: DocumentNode;
  export = value;
}
