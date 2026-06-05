export type SwaggerSpec = {
  paths: Record<
    string,
    Record<
      string,
      {
        summary?: string;
        description?: string;
        tags?: string[];
        parameters?: Array<{
          name: string;
          in: 'query' | 'path' | 'header';
          required?: boolean;
          schema?: { type?: string };
        }>;
      }
    >
  >;
};
