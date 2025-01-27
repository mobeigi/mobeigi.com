import { Html, Body, Heading, Text, Link, Section } from '@react-email/components';
import { render } from '@react-email/render';
import { HeaderSection } from './common/HeaderSection';
import { format as formatDate } from 'date-fns';

interface NewCommentEmailProps {
  postTitle: string;
  commentUrl: string;
  displayName: string;
  email: string;
  ipAddress: string;
  createdAt: Date;
  commentTextContent: string;
}

export const NewCommentEmail = ({
  postTitle,
  commentUrl,
  displayName,
  email,
  ipAddress,
  createdAt,
  commentTextContent,
}: NewCommentEmailProps) => {
  // TODO: Use timezone library to include server timezone
  const createdAtDateString = formatDate(createdAt, "d MMMM yyyy 'at' hh:mm a '(Sydney, Australia time)'");

  return (
    <Html>
      <Body>
        <HeaderSection />
        <Section>
          <Heading as="h2">New comment on blog post:</Heading>
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
              <strong>Email:</strong> {email}
            </span>
            <br />
            <span>
              <strong>IP Address:</strong> {ipAddress}
            </span>
            <br />
            <span>
              <strong>Comment URL:</strong> {commentUrl}
            </span>
            <br />
            <span>
              <strong>Created at:</strong> {createdAtDateString}
            </span>
          </Text>
        </Section>
        <Section>
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
