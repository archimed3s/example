import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

import { EmptyLayout } from '../layouts/EmptyLayout';

const ApiDoc = ({ spec }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <SwaggerUI spec={spec} />;
};

ApiDoc.layout = EmptyLayout;

export const getServerSideProps: GetServerSideProps = async () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      notFound: true,
    };
  }

  const spec = createSwaggerSpec({
    title: 'BrandApp Swagger',
    version: '0.1.0',
  });
  return {
    props: {
      spec,
    },
  };
};

export default ApiDoc;
