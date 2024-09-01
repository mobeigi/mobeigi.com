import { cookies } from 'next/headers';
import type { Metadata } from 'next';
import './globals.css';
import { Roboto } from 'next/font/google';
import { BASE_URL, SITE_TITLE } from '@/constants/app';
import HeaderContent from '@/components/HeaderContent';
import FooterContent from '@/components/FooterContent';
import GlobalStyle from '@/styles/GlobalStyle';
import StyledComponentsRegistry from '@/lib/registry';
import ThemeProviderWrapper from '@/lib/ThemeProviderWrapper';
import { PrefersColorScheme } from '@/types/theme';
import { THEME_COOKIE_NAME } from '@/constants/cookies';
import { Body, ScrollableContent, Footer, Header, Main, MainContents } from './styled';
import { UserPreferencesProvider } from '@/context/userPreferencesContext';
import { parseThemeCookieValue } from '@/utils/theme';
import { DEFAULT_THEME_MODE, FALLBACK_PREFERS_COLOR_SCHEME } from '@/constants/theme';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: `%s - ${SITE_TITLE}`,
    default: `${SITE_TITLE}`,
  },
  description:
    "Hi, I'm Mo! Welcome to my online portfolio. Dive into my programming blog and reach out if you're up for a chat.",
  alternates: {
    canonical: './',
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const cookieStore = cookies();
  const themeCookie = cookieStore.get(THEME_COOKIE_NAME);

  let initialThemeMode = DEFAULT_THEME_MODE;
  let initialPrefersColorScheme: PrefersColorScheme | undefined = FALLBACK_PREFERS_COLOR_SCHEME;

  if (themeCookie?.value) {
    let parsedThemeCookieValue;
    try {
      parsedThemeCookieValue = parseThemeCookieValue(themeCookie.value);
      initialThemeMode = parsedThemeCookieValue.themeMode;
      initialPrefersColorScheme = parsedThemeCookieValue.prefersColorScheme;
    } catch (error) {
      console.warn(`Parsing theme cookie value failed. themeCookie: ${themeCookie.value}`);
    }
  }

  return (
    <html lang="en">
      <Body className={roboto.className}>
        <StyledComponentsRegistry>
          <UserPreferencesProvider
            initialThemeMode={initialThemeMode}
            initialPrefersColorScheme={initialPrefersColorScheme}
          >
            <ThemeProviderWrapper>
              <GlobalStyle />
              <Header id="header">
                <HeaderContent />
              </Header>

              <ScrollableContent>
                <Main id="main">
                  <MainContents>{children}</MainContents>
                </Main>
                <Footer id="footer">
                  <FooterContent />
                </Footer>
              </ScrollableContent>
            </ThemeProviderWrapper>
          </UserPreferencesProvider>
        </StyledComponentsRegistry>
      </Body>
    </html>
  );
};

export default RootLayout;
