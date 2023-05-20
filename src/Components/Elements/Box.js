const { default: styled } = require('@emotion/styled');

export const Box = styled.div`
  width: ${({ width }) => width};
  margin-top: ${({ mt }) => mt};
  margin-right: ${({ mr }) => mr};
  margin-bottom: ${({ mb }) => mb};
  margin-left: ${({ ml }) => ml};
  padding-top: ${({ pt }) => pt};
  padding-right: ${({ pr }) => pr};
  padding-bottom: ${({ pb }) => pb};
  padding-left: ${({ pl }) => pl};
  color: ${({ color, theme }) => theme.colors[color] || 'inherit'};
  background-color: ${({ bg, theme }) => theme.colors[bg] || 'transparent'};
  display: block;
`;
