import { ListItemItem } from '@/types/schema-dts';
import { ListItem } from 'schema-dts';

export const listItem = (props: Partial<ListItem>): ListItem => {
  return {
    '@type': 'ListItem',
    ...props,
  };
};

export const getLastItemId = (listItems: ListItem[]): string | null => {
  const lastListItem = listItems.at(-1);
  if (lastListItem?.item === undefined) {
    return null;
  }
  const lastItem = lastListItem.item as ListItemItem;
  return lastItem['@id'] || null;
};
