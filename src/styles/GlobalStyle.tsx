import {createGlobalStyle} from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset};
    Text{
        color:red;
    }
`;

export default GlobalStyle;
