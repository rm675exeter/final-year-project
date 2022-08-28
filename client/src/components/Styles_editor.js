// Import StyledComponents to allow css in JS
import styled from 'styled-components';

import background from '.././assets/canvas_background.png';


export const device = {
  laptop: `(max-width: 1490px)`,
  laptopL: `(max-width: 1800px)`
}

export const CanvasContainer = styled.div`
  width: 1040px;
  height: 700px;
  background: url(${background});
  background-size: 100% 100%;
  background-position: left 5px top;
  box-shadow: 0px 0px 50px 10px rgba(20,20,20,0.1);
  border-radius: 5px;
  margin: auto;
  position: absolute;
  margin-top: 180px;
  top: 0;
  bottom: 0;
  left: 0vw;
  right: 0vw;
  overflow: hidden;
  border-style: solid;
  border-width: 1px;
  resize: auto;
  border-color: #616161;

  @media ${device.laptop}{
    width: 832px;
    height: 560px;
  }
`;

export const EditorContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #e8e8e8;
  border-radius: 5px;
`;

export const PageDivider = styled.div`
  width: 1px;
  height: 100%;
  border-radius: 5px;
  background-color: #cccccc;
  position: absolute;
  margin-left: 518px;
  margin-top: -704px;
  box-shadow: 0px 0px 50px 10px rgba(20,20,20,0.2);
`;

export const ToolBar = styled.div`
  width: 440px;
  height: 60px;
  background-color: #1f2223;
  box-shadow: 0px 0px 50px 10px rgba(20,20,20,0.1);
  border-radius: 5px;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 40px;
  margin-top: 95px;
  display: flex;
  justify-content: space-evenly;
  padding-top: 6px;
`;

export const SaveButtonContainer = styled.div`
  width: 60px;
  height: 60px;
  background-color: #1f2223;
  border-radius: 5px;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 500px;
  z-index: 1;
  right: 0;
  margin-top: 95px;
  display: flex;
  justify-content: space-evenly;
  padding-top: 6px;
`;

export const ToolOptions = styled.div`
  width: 290px;
  height: 500px;
  background: none;
  border-radius: 5px;
  margin: auto;
  position: absolute;
  z-index: 20;
  top: 85px;
  bottom: 0;
  right: 0;
  margin-right: 60px;
  margin-top: 90px;
  display: flex;
  justify-content: space-evenly;
  padding-top: 6px;

  @media ${device.laptopL}{
    width: 200px;
    margin-right: 20px;
  }

  @media ${device.laptop}{
    width: 150px;
    margin-right: 20px;
  }
`;

export const PageOptions = styled.div`
  width: 15vw;
  height: 900px;
  background-color: #2f3536;
  box-shadow: 0px 0px 50px 10px rgba(20,20,20,0.1);
  position: absolute;
  z-index: 0;
  bottom: 0;
  overflow-y: scroll-y;
  left: 0;
  display: flex;
  justify-content: space-evenly;
  padding-top: 6px;

  @media ${device.laptop}{
    width: 170px;
  }

`;

export const ElementContainer = styled.button`
  width: 125px;
  height: 125px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: none;
  backgroundPosition: center,
  backgroundSize: 100% 100%,
  background: #e9ebeb;
  backgroundBlendMode: 'multiply'

  @media ${device.laptopL}{
    width: 80px;
    height: 80px;
  }

  &:hover {
    cursor: pointer;
    background: #dee0e0;

  &:active {
    cursor: pointer;
    background: white;
    
  }
`;

export const Grid = styled.div`
  margin-left: -10px;
  margin-right: -10px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  
`;

export const PagesGrid = styled.div`
  display: flex;
  margin-left: -5px;
  height: 80%;
  margin-top: 50px;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;

  @media ${device.laptopL}{
    margin-top: 200px;
  }

`

export const ThumbnailContainer = styled.div`
  width: 229px;
  height: 154px;
  background: white;
  border-radius: 3px;
  margin-bottom: 30px;

  @media ${device.laptop}{
    width: 133px;
    height: 90px;
    margin-bottom: 15px;
  }

`

const ColorBox = styled.div`
  width: 33px;
  height: 33px;
  border-radius: 5px;
  border: solid;
  border-width: 1px;
  border-color: #c4c4c4;

  &:hover {
    cursor: pointer;
    border-color: white;

  &:active {
    background: white;

`

export const Color1 = styled(ColorBox)`
  background-color: #ff5b6b;
`
export const Color2 = styled(ColorBox)`
  background-color: #ffab51;
`
export const Color3 = styled(ColorBox)`
  background-color: #ffff51;
`
export const Color4 = styled(ColorBox)`
  background-color: #4fff75;
`
export const Color5 = styled(ColorBox)`
  background-color: #4ebefa;
`
export const Color6 = styled(ColorBox)`
  background-color: #bc5efb;
`
export const Color7 = styled(ColorBox)`
  background-color: #ffb3bb;
`
export const Color8 = styled(ColorBox)`
  background-color: #ffdfba;
`
export const Color9 = styled(ColorBox)`
  background-color: #ffffba;
`
export const Color10 = styled(ColorBox)`
  background-color: #baffc9;
`
export const Color11 = styled(ColorBox)`
  background-color: #bae1ff;
`
export const Color12 = styled(ColorBox)`
  background-color: #e1b9fd;
`
export const Color13 = styled(ColorBox)`
  background-color: #c92a2a;
`
export const Color14 = styled(ColorBox)`
  background-color: #e67700;
`
export const Color15 = styled(ColorBox)`
  background-color: #ffff20;
`
export const Color16 = styled(ColorBox)`
  background-color: #2b8a3e;
`
export const Color17 = styled(ColorBox)`
  background-color: #3f48cc;
`
export const Color18 = styled(ColorBox)`
  background-color: #5f3dc4;
`
export const Color19 = styled(ColorBox)`
  background-color: #7c2e0c;
`
export const Color20 = styled(ColorBox)`
  background-color: #9a5825;
`
export const Color21 = styled(ColorBox)`
  background-color: #b7cb98;
`
export const Color22 = styled(ColorBox)`
  background-color: #798f63;
`
export const Color23 = styled(ColorBox)`
  background-color: #61988e;
`
export const Color24 = styled(ColorBox)`
  background-color: #0b7385;
`
export const Color25 = styled(ColorBox)`
  background-color: #8c5638;
`
export const Color26 = styled(ColorBox)`
  background-color: #cab19b;
`
export const Color27 = styled(ColorBox)`
  background-color: #c3c3c3;
`
export const Color28 = styled(ColorBox)`
  background-color: #7f7f7f;
`
export const Color29 = styled(ColorBox)`
  background-color: #000000;
`
export const Color30 = styled(ColorBox)`
  background-color: #ffffff;
`

export const SpreadButtonContainer = styled.div`
  height: 60px;
  width: 200px;
  background-color: #c3c3c3;
  border-radius: 5px;
  margin-top: 20px;
  transition: 0.1s;
  padding: 20px;
  padding-top: 30px;
  text-align: center;


  @media ${device.laptop}{
    width: 130px;
  }

  &:hover {
    cursor: pointer;
    background: #e9e9e9;

`

export const SpreadButtonContainerCurrent = styled.div`
  height: 60px;
  width: 200px;
  background-color: #7f7f7f;
  border-radius: 5px;
  margin-top: 20px;
  transition: 0.1s;
  padding: 20px;
  padding-top: 30px;
  display: flex;
  text-align: center;
  justify-content: center;

  @media ${device.laptop}{
    width: 130px;
  }

`

export const CreatePageContainer = styled.div`

  padding: 20px;
  width: 600px;
  height: 460px;
  background-color: white;
  flex-wrap: wrap;
  text-align: center;
  justify-content: center;
  
  @media ${device.laptop}{
    width: 430px;
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

export const JournalPagesContainer = styled.div`
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