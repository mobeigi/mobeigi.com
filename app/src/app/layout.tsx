import { cookies } from 'next/headers';
import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import { BASE_URL, SITE_TITLE } from "@/constants/app";
import Nav from "@/components/Nav";
import FooterContent from "@/components/FooterContent";
import GlobalStyle from "@/styles/GlobalStyle";
import StyledComponentsRegistry from "@/lib/registry";
import ThemeProviderWrapper from "@/lib/ThemeProviderWrapper";
import { ThemeMode } from "@/types/theme";
import { THEME_COOKIE_NAME } from '@/constants/cookies';
import { Body, Footer, Header, Main } from './styled';

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"],});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: `%s - ${SITE_TITLE}`,
    default: `${SITE_TITLE}`
  },
  description: "Hi, I'm Mo! Welcome to my online portfolio. Dive into my programming blog and reach out if you're up for a chat.",
  alternates: {
    canonical: './',
  }
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const cookieStore = cookies();
  const themeCookie = cookieStore.get(THEME_COOKIE_NAME);

  const currentThemeMode: ThemeMode = 
    themeCookie?.value === ThemeMode.Dark ? ThemeMode.Dark :
    themeCookie?.value === ThemeMode.Light ? ThemeMode.Light :
    ThemeMode.Dark; // Fallback

  return (
    <html lang="en">
      <Body className={roboto.className}>
      <StyledComponentsRegistry>
        <ThemeProviderWrapper themeMode={currentThemeMode}>
          <GlobalStyle />
          <Header>
            <Nav />
          </Header>
          <Main>
            {children}
          </Main>
          <Footer>
            <FooterContent />
          </Footer>
        </ThemeProviderWrapper>
      </StyledComponentsRegistry>
      </Body>
    </html>
  );
}

export default RootLayout;
