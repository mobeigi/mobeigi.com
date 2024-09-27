import 'styled-components';
import { DefaultThemeOverride } from '@/types/theme';

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-object-type */
  export interface DefaultTheme extends DefaultThemeOverride {}
}
