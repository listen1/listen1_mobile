import styled from 'styled-components';

// notice: react native flex vs css flex is DIFFERENT for flex-grow,
// flex-shrink default value
// refer to:
// https://github.com/styled-components/styled-components/issues/465
export const Flex = styled.View`
  flex: 1 0;
`;
export const RowFlex = styled.View`
  flex: 1 0;
  flex-direction: row;
`;
export const ColumnFlex = styled.View`
  flex: 1 0;
  flex-direction: column;
`;
export const ThemeFlex = styled(Flex)`
  background-color: ${props => props.theme.backgroundColor};
`;
