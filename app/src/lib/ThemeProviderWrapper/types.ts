import type { ThemeMode } from "@/types/theme";

export interface ThemeProviderWrapperProps {
    children: React.ReactNode,
    themeMode: ThemeMode,
};