import { Html, Body, Heading, Text, Link, Section } from '@react-email/components';
import { render } from '@react-email/render';
import { HeaderSection } from './common/HeaderSection';
import { format as formatDate } from 'date-fns';

interface NewReplyToCommentEmailProps {
  postTitle: string;
  commentUrl: string;
  replyCommentDisplayName: string;
  replyCommentUrl: string;
  replyCommentCreatedAt: Date;
  replyCommentTextContent: string;
}

export const NewReplyToCommentEmail = ({
  postTitle,
  commentUrl,
  replyCommentDisplayName,
  replyCommentUrl,
  replyCommentCreatedAt,
  replyCommentTextContent,
}: NewReplyToCommentEmailProps) => {
  // TODO: Use timezone library to include server timezone
  const replyCommentCreatedAtDateString = formatDate(
    replyCommentCreatedAt,
    "d MMMM yyyy 'at' hh:mm a '(Sydney, Australia time)'",
  );

  return (
    <Html>
      <Body>
        <HeaderSection />
        <Section>
          <Heading as="h2">New reply to your comment on:</Heading>
          <Text>
            {postTitle}
            <br />
            <Link href={commentUrl}>{commentUrl}</Link>
          </Text>
        </Section>
        <Section>
          <Heading as="h2">Comment Reply Details</Heading>
          <Text>
            <span>
              <strong>Display Name:</strong> {replyCommentDisplayName}
            </span>
            <br />
            <span>
              <strong>Comment URL:</strong> {replyCommentUrl}
            </span>
            <br />
            <span>
              <strong>Created at:</strong> {replyCommentCreatedAtDateString}
            </span>
          </Text>
        </Section>
        <Section>
          <Text>{replyCommentTextContent}</Text>
        </Section>
      </Body>
    </Html>
  );
};

export const newReplyToCommentEmailHtml = async (props: NewReplyToCommentEmailProps): Promise<string> => {
  const component = <NewReplyToCommentEmail {...props} />;
  return render(component);
};
