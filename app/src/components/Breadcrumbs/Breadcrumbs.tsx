import { ListItem } from 'schema-dts';
import { BreadcrumbsProps } from './types';
import { BreadcrumbsContainerNav, StyledLink, ChevronIconWrapper } from './styled';
import ChevronRightSvg from '@/assets/icons/boxicons/bxs-chevron-right.svg';
import { ListItemItem } from '@/types/schema-dts';

export const Breadcrumbs = ({ breadcrumbList }: BreadcrumbsProps) => {
  const listItems = breadcrumbList.itemListElement as ListItem[];
  return (
    <BreadcrumbsContainerNav aria-label="Breadcrumb">
      {listItems.map((listItem, index) => {
        const item = listItem.item as ListItemItem;
        const id = item['@id']!;
        const name = item['name']!;
        return (
          <>
            {index !== 0 && (
              <ChevronIconWrapper>
                <ChevronRightSvg />
              </ChevronIconWrapper>
            )}
            <StyledLink key={index} href={id} $active={index === listItems.length - 1}>
              {name}
            </StyledLink>
          </>
        );
      })}
    </BreadcrumbsContainerNav>
  );
};
