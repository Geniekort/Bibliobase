declare module 'vue-cli-plugin-apollo/graphql-client';
declare module 'lodash';
declare module 'vue-moment';

declare module '*.gql' {
  import {DocumentNode} from 'graphql';

  const value: DocumentNode;
  export = value;
}
