import { Button, Flex, FlexProps } from '@chakra-ui/react';
import { Dispatch, FC, SetStateAction, SyntheticEvent } from 'react';

export type Tag = {
  id: string;
  name: string;
  icon?: JSX.Element;
  isActive: boolean;
};

type CheckboxButtonsProps = FlexProps & {
  tags: Tag[];
  setTags: Dispatch<SetStateAction<Tag[]>>;
};

export const CheckboxButtons: FC<CheckboxButtonsProps> = ({ tags, setTags, ...flexProps }) => {
  const toggleTag = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const { id } = (e.target as HTMLButtonElement).dataset;

    setTags((prevState) => prevState.map((tag) => (tag.id === id ? { ...tag, isActive: !tag.isActive } : tag)));
  };

  return (
    <Flex flexWrap="wrap" gridGap={3} {...flexProps}>
      {tags.map(({ id, name, icon, isActive }) => {
        const { type: Icon, props: iconProps } = icon || {};

        return (
          <Button
            key={id}
            variant="tag"
            data-id={id}
            isActive={isActive}
            onClick={toggleTag}
            leftIcon={icon && <Icon {...iconProps} color={isActive ? 'primary.60' : 'gray.60'} />}
            sx={{
              '& > *': {
                pointerEvents: 'none',
              },
            }}
          >
            {name}
          </Button>
        );
      })}
    </Flex>
  );
};
