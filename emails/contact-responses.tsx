import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';

const baseUrl = 'https://tushgaurav.com'

type ContactResponseEmailProps = {
  name: string;
  email: string;
  category: string;
  message: string;
  submittedAt?: string | Date;
};

const formatDate = (submittedAt?: string | Date) => {
  if (!submittedAt) return undefined;

  const value =
    submittedAt instanceof Date ? submittedAt : new Date(submittedAt);

  if (Number.isNaN(value.getTime())) {
    return undefined;
  }

  try {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(value);
  } catch (error) {
    return value.toUTCString();
  }
};

const formatCategory = (category: string) => {
  if (!category) return '—';

  return category
    .split('-')
    .join(' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const ContactResponseEmail = ({
  name,
  email,
  category,
  message,
  submittedAt,
}: ContactResponseEmailProps) => {
  const previewName = name || 'your contact form';
  const formattedDate = formatDate(submittedAt);
  const formattedCategory = formatCategory(category);

  return (
    <Html>
      <Head />
      <Preview>New contact form response from {previewName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Img
              src={`${baseUrl}/tushar-sign.png`}
              width="100"
              height="21"
              alt="Tushar Gaurav"
            />
            <Hr style={hr} />
            <Text style={heading}>yo, got your message 👋</Text>
            <Text style={paragraph}>
              Thanks for sliding into my contact form! Your message just landed in my inbox and I wanted to shoot you a quick confirmation.
            </Text>
            <Section style={summarySection}>
              {formattedDate && (
                <Text style={summaryMeta}>Submitted {formattedDate}</Text>
              )}
              <table style={summaryTable} cellPadding="0" cellSpacing="0">
                <tbody>
                  <tr>
                    <td style={summaryLabel}>Name</td>
                    <td style={summaryValue}>{name || '—'}</td>
                  </tr>
                  <tr>
                    <td style={summaryLabel}>Email</td>
                    <td style={summaryValue}>{email || '—'}</td>
                  </tr>
                  <tr>
                    <td style={summaryLabel}>Category</td>
                    <td style={summaryValue}>{formattedCategory}</td>
                  </tr>
                </tbody>
              </table>
            </Section>
            <Section style={messageSection}>
              <Text style={summaryMeta}>Message</Text>
              <Text style={messageBody}>{message || '—'}</Text>
            </Section>
            <Hr style={hr} />
            <Text style={footer}>
              This landed in your inbox because you asked for a copy when you submitted the form.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactResponseEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const box = {
  padding: '0 48px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const paragraph = {
  color: '#525f7f',

  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
};

const button = {
  backgroundColor: '#656ee8',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  padding: '10px',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
};

const heading = {
  color: '#1a1f36',
  fontSize: '22px',
  lineHeight: '28px',
  fontWeight: 600,
  marginBottom: '12px',
  textAlign: 'left' as const,
};

const summarySection = {
  backgroundColor: '#f6f9fc',
  borderRadius: '8px',
  padding: '16px 20px',
  marginTop: '24px',
};

const summaryMeta = {
  color: '#6b7a99',
  fontSize: '14px',
  lineHeight: '20px',
  marginBottom: '12px',
  textAlign: 'left' as const,
};

const summaryTable = {
  width: '100%',
};

const summaryLabel = {
  color: '#1a1f36',
  fontSize: '15px',
  fontWeight: 600,
  padding: '8px 12px 8px 0',
  verticalAlign: 'top' as const,
};

const summaryValue = {
  color: '#525f7f',
  fontSize: '15px',
  lineHeight: '22px',
  padding: '8px 0',
};

const messageSection = {
  marginTop: '24px',
};

const messageBody = {
  backgroundColor: '#f6f9fc',
  borderRadius: '8px',
  color: '#1a1f36',
  fontSize: '15px',
  lineHeight: '22px',
  padding: '16px 20px',
  whiteSpace: 'pre-wrap' as const,
};

const actionsSection = {
  marginTop: '24px',
};
