import CategorySvg from '@/assets/icons/boxicons/bx-category.svg';
import {
  ContainerNav,
  IconAndTextContainer,
  SubcategoryContainer,
  CategoryIconWrapper as IconWrapper,
  StyledLink,
} from './styled';
import { SubcategoryNavProps } from './types';

export const SubcategoryNav = ({ category, subcategories }: SubcategoryNavProps) => {
  return (
    <ContainerNav aria-label={`Subcategory navigation for category: ${category.title}`}>
      <ul>
        {subcategories.map((subcategory, index) => (
          <li key={index}>
            <SubcategoryContainer>
              <StyledLink href={subcategory.url}>
                <IconAndTextContainer>
                  <IconWrapper>
                    <CategorySvg />
                  </IconWrapper>
                  <span>{subcategory.title}</span>
                </IconAndTextContainer>
              </StyledLink>
            </SubcategoryContainer>
          </li>
        ))}
      </ul>
    </ContainerNav>
  );
};
