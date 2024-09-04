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

    const auto = fields.language === 'auto';

    const language = fields.language || 'plaintext';
    const highlightOptions = {
      language,
    };

    // TODO: Commonise this so it can be used elsewhere outside of Payload too
    // Apply server-side syntax highlighting with Highlight.js
    const highlightResult = auto ? hljs.highlightAuto(code) : hljs.highlight(code, highlightOptions);
    const hljsClasses = ['hljs', highlightResult.language].filter(Boolean);

    // Return the highlighted code block
    return `<pre><code class="${hljsClasses.join(' ')}">${highlightResult.value}</code></pre>`;
  },
  nodeTypes: ['block', 'inlineBlock'],
};

export default CodeBlockHTMLConverter;
