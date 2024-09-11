import { SidebarContainer, CustomFieldsContainer } from './styled';
import { SidebarProps } from './types';

export const Sidebar = ({ customFields }: SidebarProps) => (
  <SidebarContainer>
    {customFields && customFields.length > 0 && (
      <>
        <h5>Other details</h5>
        <CustomFieldsContainer>
          {customFields?.map((customField, index) => (
            <span key={index}>
              <strong>{customField.key}: </strong>
              {customField.value}
            </span>
          ))}
        </CustomFieldsContainer>
      </>
    )}
  </SidebarContainer>
);
