import { ListItem } from 'schema-dts';

export const listItem = (props: Partial<ListItem>): ListItem => {
  return {
    '@type': 'ListItem',
    ...props,
  };
};

export const getLastItemId = (listItems: ListItem[]): string | null => {
  const lastListItem = listItems.at(-1);
  const lastItem = lastListItem?.item! as { '@id'?: string }; // TODO: Use a better type here
  return lastItem['@id'] || null;
};
