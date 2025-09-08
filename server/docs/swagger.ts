import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { Express } from 'express';
import path from 'path';

export default function setupSwagger(app: Express) {
  const swaggerPath = path.join(__dirname, './openapi.yaml');
  const baseSpec = YAML.load(swaggerPath);

  const options: swaggerJsdoc.Options = {
    definition: baseSpec,
    apis: ['../src/routes/*.ts', '../src/controllers/*.ts'],
  };

  const specs = swaggerJsdoc(options);

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
  app.get('/docs-json', (req, res) => {
    res.json(specs);
  });
}