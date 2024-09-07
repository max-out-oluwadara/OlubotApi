declare module 'swagger-jsdoc' {
  interface Options {
    definition: {
      openapi: string;
      info: {
        title: string;
        version: string;
        description: string;
      };
      servers: Array<{
        url: string;
      }>;
    };
    apis: string[];
  }
  function swaggerJsdoc(options: Options): unknown;
  export = swaggerJsdoc;
}
