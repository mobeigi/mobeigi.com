import type { GlobalConfig } from 'payload';

export const Resume: GlobalConfig = {
  slug: 'resume',
  fields: [
    {
      name: 'resumeFile',
      type: 'upload',
      relationTo: 'private-files',
      required: true,
      label: 'Resume File',
    },
    {
      name: 'passwords',
      type: 'array',
      label: 'Unlock Passwords',
      fields: [
        {
          name: 'password',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
};
