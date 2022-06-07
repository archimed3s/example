import { Box, Heading } from '@chakra-ui/react';
import { FormattedMessage, defineMessages } from 'react-intl';

import { ContactForm } from '@pages/../modules/ContactForm/ContactForm';

const messages = defineMessages({
  title: {
    id: 'ContactUs.title',
    defaultMessage: 'Contact Us',
  },
});

export const ContactUs = () => {
  return (
    <Box my={4} width="full">
      <Heading fontWeight={500} color="white" mb={{ base: 3, md: 8 }}>
        <FormattedMessage {...messages.title} />
      </Heading>

      <ContactForm />
    </Box>
  );
};

export default ContactUs;
