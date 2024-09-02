import type { Block } from 'payload';

export const Code: Block = {
  slug: 'code',
  interfaceName: 'CodeBlock',
  fields: [
    {
      name: 'language',
      type: 'select',
      defaultValue: 'plaintext',
      required: true,
      options: [
        {
          label: 'Typescript',
          value: 'typescript',
        },
        {
          label: 'Javascript',
          value: 'javascript',
        },
        {
          label: 'CSS',
          value: 'css',
        },
        {
          label: 'Python',
          value: 'python',
        },
        {
          label: 'Java',
          value: 'java',
        },
        {
          label: 'Kotlin',
          value: 'kotlin',
        },
        {
          label: 'Bash',
          value: 'bash',
        },
        {
          label: 'Plain Text',
          value: 'plaintext',
        },
        {
          label: 'XML / HTML',
          value: 'xml',
        },
        {
          label: 'JSON',
          value: 'json',
        },
        {
          label: 'SQL',
          value: 'sql',
        },
        {
          label: 'PHP',
          value: 'php',
        },
        {
          label: 'C',
          value: 'c',
        },
        {
          label: 'C++',
          value: 'cpp',
        },
        {
          label: 'YAML',
          value: 'yaml',
        },
        {
          label: 'Markdown',
          value: 'markdown',
        },
        {
          label: 'INI',
          value: 'ini',
        },
        {
          label: 'Shell',
          value: 'shell',
        },
      ],
    },
    {
      name: 'code',
      type: 'code',
      label: false,
      required: true,
    },
  ],
};
