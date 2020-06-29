import styled from 'styled-components';
import COLOURS from '../../constants/Colors';

export const StyledFooter = styled.footer`
    padding: 30px 0 30px;
    text-align: center;
    font-size: 0.75em;
    position: absolute;
    left: 0;
    bottom:0;
    width: 100%;
    height: 85px; /* Height of the footer */
    color: ${COLOURS.grey};

    a {
        color: ${COLOURS.grey};
        margin: 0 10px;
    }
`;

export default { StyledFooter };
