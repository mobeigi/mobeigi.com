import { HTMLConverter, type SerializedBlockNode } from '@payloadcms/richtext-lexical';
import hljs from 'highlight.js';

type CodeBlockNode = SerializedBlockNode & {
  code: string;
  language?: string;
};

// TODO: This seems to process all blocks, not just code, should handle that
const CodeBlockHTMLConverter: HTMLConverter<CodeBlockNode> = {
  converter: ({ node }) => {
    const fields = node.fields;
    const code = fields.code;
    const language = fields.language || 'plaintext';

    // TODO: Commonise this so it can be used elsewhere outside of Payload too
    // Apply server-side syntax highlighting with Highlight.js
    const highlightedCode = hljs.highlight(language, code).value;

    // Return the highlighted code block
    return `<pre><code class="language-${language} hljs">${highlightedCode}</code></pre>`;
  },
  nodeTypes: ['block'],
};

export default CodeBlockHTMLConverter;
