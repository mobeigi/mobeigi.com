import { extractHeadings } from './extractHeadings';
import { ReactElement } from 'react';

describe('extractHeadings', () => {
  it('extracts headings from a single heading element', () => {
    const node: ReactElement = <h1>Title 1</h1>;
    const result = extractHeadings(node);

    expect(result).toEqual([
      {
        text: 'Title 1',
        level: 1,
        children: [],
      },
    ]);
  });

  it('extracts headings from multiple heading elements', () => {
    const node: ReactElement = (
      <>
        <h1>Title 1</h1>
        <h2>Subtitle 1</h2>
      </>
    );
    const result = extractHeadings(node);

    expect(result).toEqual([
      {
        text: 'Title 1',
        level: 1,
        children: [
          {
            text: 'Subtitle 1',
            level: 2,
            children: [],
          },
        ],
      },
    ]);
  });

  it('handles nested headings correctly', () => {
    const node: ReactElement = (
      <div>
        <div>
          <h1>Title 1</h1>
          <div>
            <h2>Subtitle 1</h2>
            <div>
              <div>
                <h3>Sub-subtitle 1</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    const result = extractHeadings(node);

    expect(result).toEqual([
      {
        text: 'Title 1',
        level: 1,
        children: [
          {
            text: 'Subtitle 1',
            level: 2,
            children: [
              {
                text: 'Sub-subtitle 1',
                level: 3,
                children: [],
              },
            ],
          },
        ],
      },
    ]);
  });

  it('handles hierarchy changes correctly', () => {
    const node: ReactElement = (
      <div>
        <h1>Title 1</h1>
        <h2>Subtitle 1</h2>
        <h3>Sub-subtitle 1</h3>
        <h4>Sub-sub-subtitle 1</h4>
        <h5>Sub-sub-sub-subtitle 1</h5>
        <h6>Sub-sub-sub-sub-subtitle 1</h6>
        <h1>Title 2</h1>
        <h2>Subtitle 2</h2>
        <h3>Sub-subtitle 2</h3>
        <h4>Sub-sub-subtitle 2</h4>
        <h5>Sub-sub-sub-subtitle 2</h5>
        <h6>Sub-sub-sub-sub-subtitle 2</h6>
        <h1>Title 3</h1>
        <h2>Subtitle 3</h2>
        <h3>Sub-subtitle 3</h3>
        <h4>Sub-sub-subtitle 3</h4>
        <h5>Sub-sub-sub-subtitle 3</h5>
        <h6>Sub-sub-sub-sub-subtitle 3</h6>
      </div>
    );
    const result = extractHeadings(node);

    expect(result).toEqual([
      {
        text: 'Title 1',
        level: 1,
        children: [
          {
            text: 'Subtitle 1',
            level: 2,
            children: [
              {
                text: 'Sub-subtitle 1',
                level: 3,
                children: [
                  {
                    text: 'Sub-sub-subtitle 1',
                    level: 4,
                    children: [
                      {
                        text: 'Sub-sub-sub-subtitle 1',
                        level: 5,
                        children: [
                          {
                            text: 'Sub-sub-sub-sub-subtitle 1',
                            level: 6,
                            children: [],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        text: 'Title 2',
        level: 1,
        children: [
          {
            text: 'Subtitle 2',
            level: 2,
            children: [
              {
                text: 'Sub-subtitle 2',
                level: 3,
                children: [
                  {
                    text: 'Sub-sub-subtitle 2',
                    level: 4,
                    children: [
                      {
                        text: 'Sub-sub-sub-subtitle 2',
                        level: 5,
                        children: [
                          {
                            text: 'Sub-sub-sub-sub-subtitle 2',
                            level: 6,
                            children: [],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        text: 'Title 3',
        level: 1,
        children: [
          {
            text: 'Subtitle 3',
            level: 2,
            children: [
              {
                text: 'Sub-subtitle 3',
                level: 3,
                children: [
                  {
                    text: 'Sub-sub-subtitle 3',
                    level: 4,
                    children: [
                      {
                        text: 'Sub-sub-sub-subtitle 3',
                        level: 5,
                        children: [
                          {
                            text: 'Sub-sub-sub-sub-subtitle 3',
                            level: 6,
                            children: [],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ]);
  });

  it('handles missing heading text by using "Untitled"', () => {
    // eslint-disable-next-line jsx-a11y/heading-has-content
    const node: ReactElement = <h1></h1>;
    const result = extractHeadings(node);

    expect(result).toEqual([
      {
        text: 'Untitled',
        level: 1,
        children: [],
      },
    ]);
  });

  it('ignores non-heading elements', () => {
    const node: ReactElement = (
      <div>
        <p>
          This is a paragraph with <strong>strong</strong> text!
        </p>
        <span>This is a span</span>
        <h1>Title 1</h1>
        <p>
          This is a paragraph with <strong>strong</strong> text!
        </p>
        <span>This is a span</span>
      </div>
    );
    const result = extractHeadings(node);

    expect(result).toEqual([
      {
        text: 'Title 1',
        level: 1,
        children: [],
      },
    ]);
  });

  it('returns an empty array for no headings', () => {
    const node: ReactElement = (
      <main>
        <section>
          <p>This is a paragraph</p>
          <p>It is quite a good paragraph to be fair.</p>
        </section>
      </main>
    );
    const result = extractHeadings(node);

    expect(result).toEqual([]);
  });
});
