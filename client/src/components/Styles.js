// Import StyledComponents to allow css in JS
import styled from 'styled-components';

// Import banner
import banner from '.././assets/banner.png';

// Import Router for button styling
import {Link} from 'react-router-dom';

// Import logos
import large_logo from '.././assets/logo_large.png';
import small_logo from '.././assets/logo_small.png';
import header_logo from '.././assets/header_logo.png';

// Theme for material UI components
import { createTheme } from '@mui/material/styles';

export const colors = {
  primary: "#1f2223",
  secondary: "#d1504e;"
}

export const device = {
  laptop: `(max-width: 1490px)`,
  laptopL: `(max-width: 1800px)`
}

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary
    },
    secondary: {
      main: colors.secondary
    }
  }

});


export default theme

export const StyledContainer = styled.div`
  margin: 0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BannerContainer = styled.div`
  height: 442px;
  width: 100vw;
  align-items: center;
  background: url(${banner});
  z-index: 2;
  margin-top: 300px;
  position: absolute;
  background-repeat: repeat-x;
  background-position: center;
`;

export const PageContainer = styled.div`
  margin: 0px;
  padding: 0px;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: white;
`;

export const FormContainer = styled.div`
  background-color: white;
  width: 550px;
  height: 800px;
  box-shadow: 0px 0px 50px 10px rgba(1,21,46,0.1);
  z-index: 9;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  margin-top: 100px;
  flex-wrap: wrap;
`;

export const LargeLogo = styled.div`
  background: url(${large_logo});
  width: 300px;
  height: 300px;
  margin-top: 20px;
`;

export const ButtonContainer = styled.div`
  padding: 0px;
  margin-left: 100px;
  margin-right: 100px;
  display: flex;
`;

export const TextLink = styled(Link)`
  margin-left: 5px;
  font-family: 'calibri';
  margin-top: -10px;
  font-size: 18px;
  color: #d1504e;
  font-weight: bold;
  text-decoration: none;
  &:hover {
      cursor: pointer;
      text-decoration: underline;
  }
`;

export const TextLinkLogin = styled(TextLink)`
  margin-top: 80px;
  position: absolute;
  margin-left: 175px;
`;

export const BottomBanner = styled.div`
  height: 60vh;
  width: 100vw;
  z-index: 1;
  background-color: #1f2223;
  bottom: 0;
  position: absolute;
`;

export const FieldContainer = styled.div`
  display: flex;
  height: 300px;
  flex-direction: column;
  justify-content: space-evenly;
  margin-top: -100px;
`;

export const FieldContainerLogin = styled.div`
  display: flex;
  height: 300px;
  flex-direction: column;
  justify-content: space-evenly;
  margin-top: -30px;
`;

export const TitleContainer = styled.div`
  display: flex;
  width: 400px;
  margin-top: -80px;
  justify-content: center;
`;

export const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -70px;
  justify-content: center;
`;

export const FormContainerLogin = styled.div`
  background-color: white;
  width: 550px;
  height: 620px;
  box-shadow: 0px 0px 50px 10px rgba(1,21,46,0.1);
  z-index: 9;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  margin-top: 200px;
  flex-wrap: wrap;
`;

export const HeaderBar = styled.div`
  height: 110px;
  width: 100vw;
  position: absolute;
`;

export const SmallLogo = styled.div`
  background: url(${small_logo});
  width: 153px;
  height: 64px;
  margin-top: 30px;
  margin-left: 30px;
  &:hover {
      cursor: pointer;
  }
`;

export const HeaderLogo = styled.div`
  background: url(${header_logo});
  width: 101px;
  height: 49px;
  margin-top: 10px;
  margin-left: 20px;
  &:hover {
    cursor: pointer;
  }
`;

export const HeaderBarDark = styled(HeaderBar)`
  background-color: #1f2223;
  height: 70px;
  width: 100vw;
  position: absolute;
  box-shadow: 0 8px 6px -6px rgba(20,20,20,0.5);
  display: flex;
  justify-content: space-between;
`;


export const HeaderContainer = styled.div`
  margin: 0px;
  padding: 0px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
`;

export const DashboardButtonContainer = styled.div`
  margin: 0px;
  padding: 0px;
  min-width: 120px;
  height: 50px;
  right: 0;
  margin-right: 20px;S
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

export const ProfileContainer = styled.div`
  margin: 0px;
  padding: 0px;
  padding-top: 100px;
  padding-left: 45px;
  left: 0;
  top: 0;
  width: 300px;
  height: 100%;
  position: fixed;
  background-color: #1f2223;
`

export const BackgroundContainer = styled.div`
  width: 100vw;
  height: 700px;
  background-color: #f0f4f7;
  position: absolute;
  left: 0;
  padding: 0px;
  margin: 0px;

  @media ${device.laptop}{
    height: 560px;
  }
`

export const TitleContentDivider = styled.div`
  width: 100vw;
  height: 7px;
  top: 265px;
  margin: 0px;
  left: 400px;
  position: fixed;
  background-color: #eaeaea;

  @media ${device.laptop}{
    top: 220px;
  }
`

export const StyledBar = styled.div`
  width: 80vw;
  height: 1px;
  background-color: #b6c1cd;
  position: absolute;
  margin: 0px;
  left: 0px;
  right: 0px;
  padding: 0px;
  top: 380px;

  @media ${device.laptop}{
    top: 300px;
  }
`

export const CreateJournalContainer = styled.div`

  padding: 20px;
  width: 600px;
  height: 690px;
  background-color: white;
  flex-wrap: wrap;
  text-align: center;
  justify-content: center;
  
  @media ${device.laptop}{
    width: 430px;
  }

`

export const JournalCoversContainer = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  border-radius: 5px;
  border: solid 1px #c4c4c4;
  width: 502px;
  height: 280px;
  left: 0;
  right: 0;
  margin: auto;

  @media ${device.laptop}{
    width: 349px;
  }

`

export const Grid = styled.div`
  margin-left: -10px;
  margin-right: -10px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  
`

export const JournalCoverSpace = styled.div`
  width: 100%;
  height: 5px;

  @media ${device.laptop}{
    display: none;
  }

`;

export const HiddenContainer = styled.div`
  width: 110px;
  height: 110px;
  display: none;

  @media ${device.laptop}{
    display: initial;
  }

`

export const ErrorContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-left: 25px;

  @media ${device.laptop}{
    margin-left: 20px;
  }

`

export const WhiteBackgroundContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 90px;
  padding-top: 140px;
  width: 100vw;
  top: 0;
  left: 0;
  position: fixed;
  background: white;
`

export const GreyBackgroundContainer = styled.div`
  display: flex;
  justify-content: center;
  bottom: 0;
  left: 0;
  background: #f0f4f7;;
  width: 100vw;
  height: 100vh;
  position: static;
  overflow: scroll;

`

export const JournalGridContainer = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: flex-start;
  width: 1020px;
  margin-top: 320px;
  height: 100%;
  flex-wrap: wrap;

  @media (max-width: 1020px){
    width: 680px;
  }

  @media (max-width: 680px){
    width: 300px;
  }

`

export const JournalContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  height: 575px;
  width: 300px;
  margin: 20px;
  background: white;
  text-align: center;
  border-radius: 5px;
  display: auto;
  box-shadow: 0px 0px 50px 10px rgba(1,21,46,0.1);

  &:hover {
    cursor: pointer;
    transition: 0.2s;

  }


`