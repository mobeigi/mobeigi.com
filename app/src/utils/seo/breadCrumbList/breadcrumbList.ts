import { BreadcrumbList, WithContext, ListItem } from 'schema-dts';
import { listItem } from '../listItem/listItem';
import { AppendItemProps } from './types';

export const breadcrumbList = (listItems: ListItem[]): WithContext<BreadcrumbList> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: listItems,
  };
};

export const appendItem = ({ breadcrumbList: bcl, id, name }: AppendItemProps) => {
  const listItems = bcl.itemListElement as ListItem[];
  const lastListItem = listItems.at(-1);
  const lastPosition = Number(lastListItem?.position ?? 0);

  listItems.push(
    listItem({
      position: lastPosition + 1,
      item: {
        '@id': id,
        name: name,
      },
    }),
  );
};
