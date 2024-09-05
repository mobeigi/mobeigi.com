import type { Block } from 'payload';

export const Embed: Block = {
  slug: 'embed',
  interfaceName: 'EmbedBlock',
  fields: [
    {
      name: 'url',
      type: 'text',
      required: true,
      label: 'Embed URL',
      validate: (value) => {
        if (!value || !value.match(/^(https?:\/\/)?([a-zA-Z0-9.-]+)(\/[^\s]*)?$/)) {
          return 'Please enter a valid URL';
        }
        return true;
      },
    },
    {
      name: 'title',
      type: 'text',
      required: false,
      label: 'Title',
    },
    {
      name: 'width',
      type: 'number',
      required: false,
      label: 'Width',
    },
    {
      name: 'height',
      type: 'number',
      required: false,
      label: 'Height',
    },
  ],
};

export default Embed;
