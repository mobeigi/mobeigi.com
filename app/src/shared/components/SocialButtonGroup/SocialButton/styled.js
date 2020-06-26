import styled from 'styled-components';
import COLOURS from '../../../constants/Colors';

export const StyledSocialButton = styled.div`
    display: inline-block;
    color: ${COLOURS.grey};
    &:hover {
        color: ${COLOURS.white};
    }
`;

export default { StyledSocialButton };
