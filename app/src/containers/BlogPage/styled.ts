import styled from 'styled-components';

export const BlogPageSection = styled.section`
  width: 100%;
`;

export const BlogSummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;

  & h2 {
    /* Make h2 visually look like h3 so it fits better */
    font-size: 1.75em;
  }
`;
