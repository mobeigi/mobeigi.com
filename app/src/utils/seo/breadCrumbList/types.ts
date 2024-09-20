import { WithContext, BreadcrumbList } from 'schema-dts';

export interface AppendItemProps {
  breadcrumbList: WithContext<BreadcrumbList>;
  id: string;
  name: string;
}
