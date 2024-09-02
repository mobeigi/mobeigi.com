'use client';

import styled from 'styled-components';

export const ProjectBoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 25em;
  height: 20em;
`;

export const ProjectBoxContents = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 25em;
  height: 20em;
  overflow: hidden;

  border-radius: 3%;
  color: ${({ theme }) => theme.colors.container.text.base};
  background-color: ${({ theme }) => theme.colors.container.background};
  border: 0.1em solid ${({ theme }) => theme.colors.container.accent};

  /* Animations */
  font-size: 1em;
  transition: font-size 0.07s linear;

  &:hover {
    font-size: 1.02em;
    box-shadow: rgba(0, 0, 0, 0.17) 0.2em 0.2em 0.4em;
  }
`;

export const ImageWrapper = styled.div`
  display: block;
  position: relative;
  width: auto;
  min-height: 60%;
  height: 60%;

  img {
    width: auto;
    height: 100%;
    object-fit: cover;
  }
`;

export const Details = styled.div`
  display: flex;
  min-height: 40%;
  height: 40%;
  padding: 0.5em;
  flex-direction: column;
  gap: 0.2em;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5em;

  a {
    display: flex;
  }
`;

export const Title = styled.span`
  font-weight: bold;
`;

export const Icons = styled.span`
  display: flex;
`;

export const UrlWrapper = styled.span`
  display: block;
  height: 1em;
`;

export const UrlContainer = styled.span`
  display: flex;
  align-items: center;
  gap: 0.2em;
`;

export const InactiveUrl = styled.span`
  color: ${({ theme }) => theme.colors.status.disabled.base};
`;

export const Divider = styled.hr`
  width: 100%;
  border-color: ${({ theme }) => theme.colors.container.accent};
`;

export const Description = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
