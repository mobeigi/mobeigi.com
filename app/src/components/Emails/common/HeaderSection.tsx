import { BASE_URL, SITE_TITLE } from '@/constants/app';
import { Column, Heading, Hr, Img, Row, Section } from '@react-email/components';

const HEADER_IMAGE_SRC = `${BASE_URL}/images/avatar/ai-mo.png`;

export const HeaderSection = () => (
  <Section align="center">
    <Row>
      <Column align="center">
        <Img src={HEADER_IMAGE_SRC} width={100} height={100} />
        <Heading as="h1">{SITE_TITLE}</Heading>
        <Hr />
      </Column>
    </Row>
  </Section>
);
