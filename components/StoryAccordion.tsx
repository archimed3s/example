import { AccordionIcon, Box, Text } from '@chakra-ui/react';
import { StoryblokRichtext } from 'storyblok-rich-text-react-renderer';

import { Accordion } from '@components/Accordion/Accordion';
import { AccordionButton } from '@components/Accordion/AccordionButton';
import { AccordionItem } from '@components/Accordion/AccordionItem';
import { AccordionPanel } from '@components/Accordion/AccordionPanel';
import { StoryMarkup } from '@components/StoryMarkup';

type StoryAccordionBlock = {
  title: string;
  content: StoryblokRichtext;
};
type StoryAccordionProps = {
  heading?: string;
  blocks: StoryAccordionBlock[];
};

export const StoryAccordion = ({ heading, blocks }: StoryAccordionProps) => {
  return (
    <>
      {heading && (
        <Text fontSize="l1" color="white" paddingY="2rem">
          {heading}
        </Text>
      )}
      <Accordion allowToggle width="full">
        {blocks.map((block) => (
          <AccordionItem key={block.title}>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {block.title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <StoryMarkup data={block.content} />
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};
