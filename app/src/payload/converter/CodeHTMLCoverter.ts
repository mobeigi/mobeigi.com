import { HTMLConverter, type SerializedBlockNode } from '@payloadcms/richtext-lexical';

type CodeBlockNode = SerializedBlockNode & {
  code: string;
  language?: string;
};

const CodeBlockHTMLConverter: HTMLConverter<CodeBlockNode> = {
  converter: ({ node }) => {
    const fields = node.fields;
    const code = fields.code;
    const language = fields.language;

    return `<pre><code class="language-${language}">${code}</code></pre>`;
  },
  nodeTypes: ['block'],
};

export default CodeBlockHTMLConverter;
