import { type CodeBlock as CodeBlockType } from '@/payload-types';
import hljs from 'highlight.js';

export const CodeBlock = ({ language, code }: CodeBlockType) => {
  const auto = language === 'auto';
  const highlightOptions = {
    language,
  };

  // Apply server-side syntax highlighting with Highlight.js
  const highlightResult = auto ? hljs.highlightAuto(code) : hljs.highlight(code, highlightOptions);
  const hljsClasses = ['hljs', highlightResult.language].filter(Boolean);

  // Return the highlighted code block
  return (
    <pre>
      <code className={hljsClasses.join(' ')} dangerouslySetInnerHTML={{ __html: highlightResult.value }} />
    </pre>
  );
};
