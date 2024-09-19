import { Html, Body, Heading, Text, Link, Section } from '@react-email/components';
import { render } from '@react-email/render';
import { HeaderSection } from './common/HeaderSection';
import { format as formatDate } from 'date-fns';

interface NewCommentEmailProps {
  postTitle: string;
  commentUrl: string;
  displayName: string;
  author: string;
  email: string;
  ipAddress: string;
  createdAt: Date;
  commentTextContent: string;
}

export const NewCommentEmail = ({
  postTitle,
  commentUrl,
  displayName,
  author,
  email,
  ipAddress,
  createdAt,
  commentTextContent,
}: NewCommentEmailProps) => {
  const createdAtDateString = formatDate(createdAt, "d MMMM yyyy 'at' hh:mm a");

  return (
    <Html>
      <Body>
        <HeaderSection />
        <Section>
          <Heading as="h2">New comment on blog post</Heading>
          <Text>
            {postTitle}
            <br />
            <Link href={commentUrl}>{commentUrl}</Link>
          </Text>
        </Section>
        <Section>
          <Heading as="h2">Comment Details</Heading>
          <Text>
            <span>
              <strong>Display Name:</strong> {displayName}
            </span>
            <br />
            <span>
              <strong>Author:</strong> {author}
            </span>
            <br />
            <span>
              <strong>Email:</strong> {email}
            </span>
            <br />
            <span>
              <strong>IP Address:</strong> {ipAddress}
            </span>
            <br />
            <span>
              <strong>Created at:</strong> {createdAtDateString}
            </span>
          </Text>
        </Section>
        <Section>
          <Heading as="h2">Comment</Heading>
          <Text>{commentTextContent}</Text>
        </Section>
      </Body>
    </Html>
  );
};

export const newCommentEmailHtml = async (props: NewCommentEmailProps): Promise<string> => {
  const component = <NewCommentEmail {...props} />;
  return render(component);
};
