import { chain, isLeft } from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import * as t from 'io-ts';
import { StoryblokRichtextContent } from 'storyblok-rich-text-react-renderer';

// https://github.com/gcanti/io-ts/issues/216
export const fromEnum = <T extends string, TEnumValue extends string | number>(
  enumName: string,
  theEnum: { [key in T]: TEnumValue },
): t.Type<TEnumValue> => {
  const isEnumValue = (input: unknown): input is TEnumValue => Object.values(theEnum).includes(input);

  return new t.Type<TEnumValue>(
    enumName,
    isEnumValue,
    (input, context) => (isEnumValue(input) ? t.success(input) : t.failure(input, context)),
    t.identity,
  );
};

export const numberString = new t.Type(
  'numberString',
  t.number.is,
  (value, context) => t.number.validate(Number(value), context),
  t.number.encode,
);

export const stringLength = (length: number) =>
  new t.Type(
    `stringLength(${length})`,
    (value: unknown): value is string => t.string.is(value) && value.length === length,
    (value, context) =>
      pipe(
        t.string.validate(value, context),
        chain((str) => (str.length === length ? t.success(str) : t.failure(str, context, 'Incorrect length'))),
      ),
    t.string.encode,
  );

export const urlArray = new t.Type(
  'urlArray',
  (value): value is unknown[] => !!value && (Array.isArray(value) || String(value).indexOf(',') === -1),
  (value, context) => {
    if (!value) {
      return t.failure(value, context, 'Empty value');
    }
    if (!Array.isArray(value) && String(value).indexOf(',') === -1) {
      return t.UnknownArray.validate([value], context);
    }
    return t.UnknownArray.validate(value, context);
  },
  String,
);

export const dateTime = new t.Type(
  'DateTime',
  (value): value is Date => !Number.isNaN(Date.parse(String(value))),
  (value, context) => {
    if (!value) {
      return t.failure(value, context, 'Empty value');
    }
    const result = Date.parse(String(value));
    if (Number.isNaN(result)) {
      return t.failure(value, context, "Value can't be parsed");
    }
    return t.success(new Date(result));
  },
  String,
);

export const stringArray = t.array(t.string);

export const storyblokImage = t.strict({
  id: t.union([t.string, t.number]),
  filename: t.string,
  alt: t.union([t.string, t.null]),
  title: t.union([t.string, t.null]),
});

type StoryblokRichtextContentType =
  | 'heading'
  | 'code_block'
  | 'paragraph'
  | 'blockquote'
  | 'ordered_list'
  | 'bullet_list'
  | 'list_item'
  | 'horizontal_rule'
  | 'hard_break'
  | 'image'
  | 'blok'
  | 'text';

interface StoryblokRichtextContentC extends Omit<StoryblokRichtextContent, 'type' | 'content'> {
  type: StoryblokRichtextContentType;
  text?: string;
  content?: StoryblokRichtextContentC[];
}

const storyblokContent: t.Type<StoryblokRichtextContentC> = t.recursion('StoryblokRichtextContent', () =>
  t.union([
    t.intersection([
      t.type({
        type: t.union([
          t.literal('heading'),
          t.literal('code_block'),
          t.literal('blockquote'),
          t.literal('ordered_list'),
          t.literal('bullet_list'),
          t.literal('list_item'),
          t.literal('horizontal_rule'),
          t.literal('hard_break'),
          t.literal('image'),
          t.literal('blok'),
          t.literal('paragraph'),
        ]),
      }),
      t.partial({
        content: t.array(storyblokContent),
      }),
    ]),
    t.intersection([
      t.type({
        type: t.literal('text'),
      }),
      t.partial({
        text: t.string,
      }),
    ]),
  ]),
);
export const storyblokRichText = t.type({
  type: t.literal('doc'),
  content: t.array(storyblokContent),
});

export const decode = <T, I = T>(codec: t.Type<T, I>, input: unknown): T | undefined => {
  const result = codec.decode(input);
  return isLeft(result) ? undefined : result.right;
};
