// Import react
import React, { useLayoutEffect, useState, useEffect, useRef, useCallback } from 'react'

// Import axios to communicate with backend
import Axios from 'axios';

import { useNavigate, useSearchParams } from "react-router-dom";

// Import images
import washi_1_short from '.././assets/washi_tape/washi_1_short.png';
import washi_2_short from '.././assets/washi_tape/washi_2_short.png';
import washi_3_short from '.././assets/washi_tape/washi_3_short.png';
import washi_4_short from '.././assets/washi_tape/washi_4_short.png';
import washi_5_short from '.././assets/washi_tape/washi_5_short.png';
import washi_6_short from '.././assets/washi_tape/washi_6_short.png';
import washi_7_short from '.././assets/washi_tape/washi_7_short.png';
import washi_8_short from '.././assets/washi_tape/washi_8_short.png';
import washi_8_mid from '.././assets/washi_tape/washi_8_mid.png';
import washi_1_mid from '.././assets/washi_tape/washi_1_mid.png';
import washi_2_mid from '.././assets/washi_tape/washi_2_mid.png';
import washi_3_mid from '.././assets/washi_tape/washi_3_mid.png';
import washi_4_mid from '.././assets/washi_tape/washi_4_mid.png';
import washi_5_mid from '.././assets/washi_tape/washi_5_mid.png';
import washi_6_mid from '.././assets/washi_tape/washi_6_mid.png';
import washi_7_mid from '.././assets/washi_tape/washi_7_mid.png';
import washi_8_long from '.././assets/washi_tape/washi_8_long.png';
import washi_1_long from '.././assets/washi_tape/washi_1_long.png';
import washi_2_long from '.././assets/washi_tape/washi_2_long.png';
import washi_3_long from '.././assets/washi_tape/washi_3_long.png';
import washi_4_long from '.././assets/washi_tape/washi_4_long.png';
import washi_5_long from '.././assets/washi_tape/washi_5_long.png';
import washi_6_long from '.././assets/washi_tape/washi_6_long.png';
import washi_7_long from '.././assets/washi_tape/washi_7_long.png';
import diamond_square from '.././assets/elements/diamond_square.png';
import box1 from '.././assets/elements/box1_square.png';
import notepad_square from '.././assets/elements/notepad_square.png';
import flowers from '.././assets/elements/flowers.png';
import flower1_square from '.././assets/elements/flower1_square.png';
import arrow1_square from '.././assets/elements/arrow1_square.png';
import arrow2_square from '.././assets/elements/arrow2_square.png';
import arrow3_square from '.././assets/elements/arrow3_square.png';
import arrow4_square from '.././assets/elements/arrow4_square.png';
import leaves1_square from '.././assets/elements/leaves1_square.png';
import flower3_square from '.././assets/elements/flower3_square.png';
import circledesign from '.././assets/elements/circledesign.png';
import leaf1_square from '.././assets/elements/leaf1_square.png';
import leaf2_square from '.././assets/elements/leaf2_square.png';
import leaf3_square from '.././assets/elements/leaf3_square.png';
import leaf4_square from '.././assets/elements/leaf4_square.png';
import leaf5_square from '.././assets/elements/leaf5_square.png';
import leaf6_square from '.././assets/elements/leaf6_square.png';
import stickynote1_square from '.././assets/elements/stickynote1_square.png';
import envelope_square from '.././assets/elements/envelope_square.png';
import banner1_square from '.././assets/elements/banner1_square.png';
import pencil_square from '.././assets/elements/pencil_square.png';
import border1_square from '.././assets/elements/border1_square.png';
import ribbon1_square from '.././assets/elements/ribbon1_square.png';
import calendar_square from '.././assets/elements/calendar_square.png';
import notebook_square from '.././assets/elements/notebook_square.png';
import blank from '.././assets/templates/blank.png';
import template1 from '.././assets/templates/template1.png';
import template2 from '.././assets/templates/template2.png';
import template3 from '.././assets/templates/template3.png';
import template4 from '.././assets/templates/template4.png';

// Import roughjs for hand-drawn look to elements
import rough from 'roughjs/bundled/rough.esm.js';

// Import header
import Header from './../components/Header.js';

import saveCanvas from './../methods/saveCanvas';
import loadData from './../methods/loadData';
import _ from 'lodash';

// Import icons and material UI
import Dialog from '@mui/material/Dialog';
import ToggleButton from "@mui/material/ToggleButton";
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import { Icon } from '@iconify/react';
import SaveIcon from '@mui/icons-material/Save';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

// Import styles and components
import 
{ CanvasContainer, 
  EditorContainer, ToolBar, 
  ToolOptions, PagesGrid, SaveButtonContainer,
  PageOptions, Color1, Color2,
  Color3, Color4, Color5, Color6,
  Color7, Color8, Color9, Color10,
  Color11, Color12, Color13,
  Color14, Color15, Color16,
  Color17, Color18, Color19,
  Color20, Color21, Color22,
  Color23, Color24, Color25,
  Color26, Color27, Color28,
  Color29, Color30, ElementContainer, 
  Grid, SpreadButtonContainer,
  SpreadButtonContainerCurrent,
  CreatePageContainer, ErrorContainer,
  JournalPagesContainer } from "./../components/Styles_editor.js";
import { ThemeProvider } from '@mui/material/styles'
import theme from '.././components/Styles.js';
import './../components/Styles.css';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImagesToLoad from "./../components/ImagesToLoad.js"
import usePrompt from "./../methods/useUnsavedWarning.js"
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';


// Import global editor methods
import createNewElement from '.././methods/createNewElement.js';
import drawElement from '.././methods/drawElement.js';
import getElementAtPosition from '.././methods/getElementAtPosition.js';
import adjustElementCoordinates from '.././methods/adjustElementCoordinates.js';
import scaleCoordinates from '.././methods/scaleCoordinates.js';
import useHistory from '.././methods/useHistory.js';
import cursorForPosition from '.././methods/cursorForPosition.js';



// If selected type is line or rectangle, then coordinate adjustment is required
// after transformation
const adjustmentRequired = type => ['line', 'rectangle'].includes(type);


// Main element functional component
const Editor = () => {
  const [logInStatus, setLogInStatus] = useState("");
  const [elements, setElements, undo, redo, deleteHistory] = useHistory([]);
  const [action, setAction] = useState("none");
  const [toolType, setToolType] = useState("selection");
  const [selectedElement, setSelectedElement] = useState(null);
  const [alert, setAlert] = useState(false);
  const [expandedAccordion, setExpandedAccordion] = useState(false);
  const [isSaved, setIsSaved] = useState(true);
  const [font, setFont] = React.useState("Indie Flower");
  const [fontSize, setFontSize] = useState(24);
  const [textAreaTopEdge, setTextAreaTopEdge] = useState(null);
  const [textAreaLeftEdge, setTextAreaLeftEdge] = useState(null);
  const [isHoveringTextColor, setIsHoveringTextColor] = useState("#c4c4c4");
  const [textColorPopoverAnchor, setTextColorPopoverAnchor] = useState(null);
  const [textColor, setTextColor] = useState("black");
  const [pages, setPages] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [formValues, setFormValues] = useState("");
  const [openCreatePageDialog, setOpenCreatePageDialog] = useState(false);
  const [strokeColor, setStrokeColor] = useState("black");
  const [fillColor, setFillColor] = useState("black");
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const journal_id = searchParams.get("journal_id");
  const page_id = searchParams.get("page_id");



  const isBlocking = () => {

    if(elements){
      if(isSaved === true || elements.length === 0){
        return false;
      } else {
        return true;
      }
    }

  }

  const handleAccordionChange = panel => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : false);
  }
  
  const textAreaRef = useRef();

  const navigate = useNavigate();
  usePrompt("Leave without saving changes?", isBlocking());

  window.addEventListener('beforeUnload', event => {
    event.preventDefault();
  })

  // Upon first rendering page, check if user is logged in.
  // Redirect if not, or retrieve session details.
  useEffect(() => {

      Axios.get("http://localhost:5000/login").then((response) => {
        if (response.data.loggedIn == true){
  
          // User is logged in, redirect to dashboard
          setLogInStatus(response.data.user[0].username);

          load();


        } else {
          navigate('/login');
        }
      }).catch(error => {
        navigate('/login');
      })

  }, [])

  useLayoutEffect( () => {

    loadPages();
    loadTemplates();

  }, [logInStatus])

  useLayoutEffect( () => {

    load();

  }, [searchParams])

  
  // Called whenever there is an update to the elements array
  // Iterates through elements and draws them on the canvas
  useLayoutEffect( () => {

    setIsSaved(false);
    
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    // Clear the canvas 
    context.clearRect(0,0, canvas.width, canvas.height);

    const roughCanvas = rough.canvas(canvas);
  
    // Draw elements onto the canvas
    elements.forEach(element =>  {

      if(action === "write" && selectedElement.id === element.id) return;
      drawElement(roughCanvas, context, element, element.type);
    });

  

  }, [elements, action, selectedElement]);

  // Update element during drawing / transformation
  const updateElement = (id, x1, y1, x2, y2, toolType, options, imageType) => {

    const elementsCopy = [...elements];

    const index = elementsCopy.map(element => element.id).indexOf(id);


    if(toolType === "line" || toolType === "rectangle" || toolType === "ellipse"){

      elementsCopy[index] = createNewElement(id, x1, y1, x2, y2, toolType, options);
      
    } else if(toolType === "pen"){

      elementsCopy[index].points = [...elementsCopy[index].points, {x: x2, y: y2}];
    } else if(toolType === "text"){

      const textWidth = document
        .getElementById('canvas')
        .getContext('2d')
        .measureText(options.text).width;

      const textHeight = fontSize;

      elementsCopy[index] = {
        ...createNewElement(id, x1, y1, x1 + textWidth, y1 + textHeight, toolType, options),
        text: options.text,
        font: options.font,
        fontSize: options.fontSize,
        textColor: options.textColor
      };
    } else if (toolType === "image"){

      elementsCopy[index] = createNewElement(id, x1, y1, x2, y2, toolType, options, imageType);
    }
    setElements(elementsCopy, true);
  }

  useEffect( () => {

    const undoRedoFunction = event => {
      if((event.metaKey || event.ctrlKey) && event.key === "z"){
        undo();
      } else if ((event.shiftKey || event.ctrlKey) && event.key === "y") {
        redo();
      } 
    }

    document.addEventListener("keydown", undoRedoFunction);
    return () => {
      document.removeEventListener("keydown", undoRedoFunction); 
    }

  }, [undo, redo]);


  useEffect( () => {

    if(action === "write" && textAreaRef != null){

    // Create invisible dummy to recieve focus
    const dummy = document.createElement("input");
    dummy.setAttribute('type', 'text');
    dummy.style.position = "absolute";
    dummy.style.opacity = 0;
    dummy.style.height = 0;
    dummy.style.fontSize = "16px";

    document.body.prepend(dummy);
    dummy.focus();

    const textArea = textAreaRef.current;

    setTimeout(() => {
      textArea.focus();
      dummy.remove();

      textArea.value = selectedElement.text;

    }, 1)

    }

  }, [action]);



  // When user left clicks
  const handleMouseDown = (event) => {

    if(action === "write"){
      return;
    }
  
    // Get client coordinates and subtract the offset from the canvas position
    const canvas = document.getElementById('canvas');
    var canvasBorder = canvas.getBoundingClientRect();
    var canvasX = Math.round(event.clientX - canvasBorder.left);
    var canvasY = Math.round(event.clientY - canvasBorder.top);

    if (toolType === "selection"){

      // If client coordinates are on an element
      const element = getElementAtPosition(canvasX, canvasY, elements);
      if(element) {

        // Calculate offsets
        if(element.type === "pen"){

          // Create offsets to prevent corner of element jumping to client mouse position
          const xOffsets = element.points.map(point => canvasX - point.x);
          const yOffsets = element.points.map(point => canvasY - point.y);
          setSelectedElement({...element, xOffsets, yOffsets});

        } else if (element.type === "text") {

          setTextAreaTopEdge(element.y1 + canvasBorder.top);
          setTextAreaLeftEdge(element.x1 + canvasBorder.left);

          // Create offset to prevent corner of element jumping to client cursor position
          const offsetX = canvasX - element.x1;
          const offsetY = canvasY - element.y1;
          setSelectedElement({...element, offsetX, offsetY});
        } else {
          // Create offset to prevent corner of element jumping to client cursor position
          const offsetX = canvasX - element.x1;
          const offsetY = canvasY - element.y1;
          setSelectedElement({...element, offsetX, offsetY});
        }

        if(event.shiftKey){

          const {id, x1, y1, x2, y2, type, options} = element;

          const newElements = elements.filter(item => item.id != element.id);

          setElements(prevState => newElements);
          setSelectedElement(null);

        
        } else {

          setElements(prevState => prevState);
          if(element.position === "inside"){
            setAction("translate");
          } else {
            setAction("scale");
          }
        }
        
      }
    } else {

      // Draw new element

      const id = getNewId();

      if(toolType === "ellipse"){

        /* const min = 1;
        const max = 100000;
        const seed = min + Math.random() * (max-min) */
        const options = {fill: "red"}
        const element = createNewElement(id, canvasX, canvasY, canvasX, canvasY, toolType, options);
        setElements((prevState) => [...prevState, element]);
        setSelectedElement(element);
        setIsSaved(false);
      } else {
        const options = {textColor: textColor}
        const element = createNewElement(id, canvasX, canvasY, canvasX, canvasY, toolType, options);
        setElements((prevState) => [...prevState, element]);
        setSelectedElement(element);
        setIsSaved(false);
      }
    
      if(toolType === "text"){
        
        setTextAreaTopEdge(event.clientY);
        setTextAreaLeftEdge(event.clientX);

        setAction("write");

      } else {
        setAction("draw");
      }
    }
  }

  const handleMouseMove = (event) => {

    const canvas = document.getElementById('canvas');
    var canvasBorder = canvas.getBoundingClientRect();

    // Calculate the canvas coordinate at client cursor position
    var canvasX = Math.round(event.clientX - canvasBorder.left);
    var canvasY = Math.round(event.clientY - canvasBorder.top);

    const element = getElementAtPosition(canvasX, canvasY, elements);

    if(action != "scale" && action !="translate" && toolType === "selection"){ 
      event.target.style.cursor = element
      ? cursorForPosition(element.position)
      : "default";
    }

    if(action === "draw"){

      const a = getNewId()
      const index = a - 1;

      if(toolType === "pen"){
        event.target.style.cursor = "none"
        updateElement(index, "", "", canvasX, canvasY, toolType);

      } else {
        event.target.style.cursor = "default"
        
        const {x1, y1} = selectedElement;

        if (toolType === "ellipse"){

        updateElement(index, x1, y1, canvasX, canvasY, toolType);
        setIsSaved(false);

        } else {

        updateElement(index, x1, y1, canvasX, canvasY, toolType);
        setIsSaved(false);
        }
      }
    } else if (action === "translate"){

      event.target.style.cursor = "grabbing";
      if(selectedElement.type === "pen"){
        
        const newPoints = selectedElement.points.map((_, index) => {
          return {
            x: canvasX - selectedElement.xOffsets[index],
            y: canvasY - selectedElement.yOffsets[index]
          }
        })

        const elementsCopy = [...elements];
        elementsCopy[selectedElement.id] = {
          ...elementsCopy[selectedElement.id], 
          points: newPoints
        };
        setElements(elementsCopy, true);
        setIsSaved(false)

      } else if (selectedElement.type === "image") {

        // Get details of element to translate
        const {id, x2, y2, type, offsetX, offsetY, imageType} = selectedElement

        // Get width and height;
        const width = x2;
        const height = y2;

        const new_x1 = canvasX - offsetX;
        const new_y1 = canvasY - offsetY;

        const options = ""

        updateElement(id, new_x1, new_y1, x2, y2, type, options, imageType);
        setIsSaved(false)


      } else {
        // Get details of element to translate
        const {id, x1, x2, y1, y2, type, offsetX, offsetY} = selectedElement
        // Get width and height of element
        const width = x2 - x1;
        const height = y2 - y1;
      
        const new_x1 = canvasX - offsetX;
        const new_y1 = canvasY - offsetY;


        const options = selectedElement.type === "text" ? {
          text: selectedElement.text, 
          font: selectedElement.font, 
          fontSize: selectedElement.fontSize,
          textColor: selectedElement.textColor
        } : {};

        updateElement(id, new_x1, new_y1, new_x1 + width, new_y1 + height, type, options);
        setIsSaved(false)
        setIsSaved(false)
      }

    } else if (action === "scale"){
      
      const {id, type, position, ...coordinates} = selectedElement;
      /* const element = getElementAtPosition(canvasX, canvasY, elements); */

      const {x1, y1, x2, y2} = scaleCoordinates(canvasX, canvasY, position, coordinates, type);

      if (selectedElement.type === "image"){
        updateElement(id, x1, y1, x2, y2, type, "", selectedElement.imageType)
        setIsSaved(false)

      } else {
        updateElement(id, x1, y1, x2, y2, type);
        setIsSaved(false)
      }

    }
  }


  // When user releases left click
  const handleMouseUp = (event) => {

    if(action !== "delete"){
      if(toolType === "pen"){
        event.target.style.cursor = "default"
      };
  
      // Get client coordinate and subtract the offset from the canvas position
      const {clientX, clientY} = event;
  
      const canvas = document.getElementById('canvas');
      var canvasBorder = canvas.getBoundingClientRect();
  
      // Calculate the canvas coordinate at client cursor position
      var canvasX = Math.round(event.clientX - canvasBorder.left);
      var canvasY = Math.round(event.clientY - canvasBorder.top);

  
      if(selectedElement){
  
        if(selectedElement.type === "text" &&
        canvasX - selectedElement.offsetX === selectedElement.x1 &&
        canvasY - selectedElement.offsetY === selectedElement.y1)
        {
          setAction("write");
          return;
        }

        if(canvasX > canvasBorder.left && canvasX < canvasBorder.right && canvasY > canvasBorder.top && canvasY < canvasBorder.bottom){
          const index = elements.map(element => element.id).indexOf(selectedElement.id);
          const {id, type, options} = elements[index];
    
          if((action === "draw" || action === "scale") && adjustmentRequired(type)){
    
            const {x1, y1, x2, y2} = adjustElementCoordinates((elements[index]));
    
            updateElement(id, x1, y1, x2, y2, type, options);
            setIsSaved(false)
    
          } 

        }

        if(action === "write"){
          return; 
        } else {
           setAction("");
           /* setSelectedElement(null);  */
        }
      }
    }else{
      setAction("");
    }
  }
   

  // Handle blur event (textArea not in focus)
  const handleBlur = (event) => {

    const {id, x1, y1, type} = selectedElement;
    setAction("none");
    setSelectedElement(null);
    updateElement(id, x1, y1, null, null, type, {text: event.target.value, font: font, fontSize: fontSize, textColor: textColor});
  }

  const deletePage = (id) => {

    Axios.post("http://localhost:5000/deletePage", {
      id: id
    }).then((response) => { 
      loadPages();
      setLogInStatus(logInStatus);
    })
  }

  const save = () => {
    saveCanvas(elements, page_id)
    setAlert(true);
    setIsSaved(true);
  }

  const load = async () => {

    const loadedData = await loadData(journal_id, page_id);
    setElements(loadedData, true);

  }

  const loadPages = () => {

    Axios.post("http://localhost:5000/loadPages", {
      journal_id: journal_id
    }).then((response) => {
      if (response.data){
        setPages(response.data);

      }
    }) 
  }

  const loadTemplates = () => {

    Axios.post("http://localhost:5000/loadTemplates")
    .then((response) => {
      if (response.data){
        setTemplates(response.data);
      } else {
      }
    }) 
  }

  const handleAlertClose = (event) => {
    setAlert(false);
  }

  const getNewId = () => {

    if(elements.length === 0){
      return 0;
    } else {
      const lastElement = elements[elements.length - 1];
      const lastElementValues = Object.values(lastElement);
      const lastElementIndex = lastElementValues[0];

      return lastElementIndex + 1;

    }
  }

  const handleSelectFont = (event) => {
    setFont(event.target.value);
  };

  const handleFontSize = useCallback((event, value) => {
    setFontSize(value);
  }, []);

  const handleMouseEnterTextColor = (event) => {
    setIsHoveringTextColor("black");
  }

  const handleMouseLeaveTextColor = (event) => {
    setIsHoveringTextColor("#c4c4c4");
  }

  const handleClickTextColor = (event) => {
    setTextColorPopoverAnchor(event.target);
    
  }

  const handleCloseTextColor = (event) => {
    setTextColorPopoverAnchor(null);
  }

  const handleTextColorChange = (color) => {
    setTextColor(color);
    handleCloseTextColor();
  }

  const handleOutlineColorChange = (color) => {
    setTextColor(color);
    handleCloseTextColor();
  }

  const changeCurrentPage = (page_id) => {
    setIsSaved(true);
    deleteHistory();
    navigate("/editor?" + `journal_id=${journal_id}` + '&' + `page_id=${page_id}`);
  }

  const handleClickCreateNewPage = () => {
    setOpenCreatePageDialog(true);
  }

  const handleCloseCreatePageDialog = () => {
    setOpenCreatePageDialog(false);
  }

  // Function to handle submit on create page form
  const handleSubmit = (event) => {
    event.preventDefault();
    createNewPage(formValues);
  };

  // Function to handle user input
  const handleChange = (event) => {
    const {name, value } = event.target;
    setFormValues({...formValues, [name]: value});
  };

  // Function to handle create new page
  const createNewPage = (formValues) => {

    loadTemplates();
    console.log(templates);

    if(formValues.template === ""){
      Axios.post('http://localhost:5000/createNewPage', {
        journal_id: journal_id,
        canvas_data: null
      }).then(response => {
        if(response.data.message) {
          handleCloseCreatePageDialog();
    
          loadPages();
    
        } else {
    
        }}).catch(error => {
        console.log(error);
      })
    } else if (formValues.template != ""){
    
      const canvas_data = templates[formValues.template].canvas_data

      Axios.post('http://localhost:5000/createNewPage', {
        journal_id: journal_id,
        canvas_data: canvas_data
      }).then(response => {
        if(response.data.message) {
          handleCloseCreatePageDialog();

          loadPages();
    
        } else {
    
        }}).catch(error => {
        console.log(error);
      })

    }
  

  
  }


  const openTexColorPopover = Boolean(textColorPopoverAnchor);

  const handleDrawImage = (imageType, width, height) => {

    setToolType("selection");

    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const roughCanvas = rough.canvas(canvas);

    const toolType = "image";

    const id = getNewId();

    const centerX = 400;
    const centerY = 200;
    const options = "";
    const element = createNewElement(id, centerX, centerY, width, height, toolType, options, imageType);    
    
    setElements((prevState) => [...prevState, element]);
    setIsSaved(false)
    drawElement(roughCanvas, context, element, toolType);

  }

  return (
    <EditorContainer onPointerUp={handleMouseUp}>
      <ImagesToLoad></ImagesToLoad>
      <PageOptions style={{paddingTop: "100px"}}>
        <PagesGrid>
        {pages.map((page, i) => (
          <>
            {page_id == page.page_id &&
            <>
              <SpreadButtonContainerCurrent>
                <p style={{color: "black", fontSize: "16px", fontFamilly: "Roboto"}} onClick={() => {changeCurrentPage(page.page_id)}}> Spread {i+1} </p>
              </SpreadButtonContainerCurrent>
            </>
            
            } 
            {page_id != page.page_id &&
            <>
              <SpreadButtonContainer> 
                <p style={{color: "black", fontSize: "16px", fontFamilly: "Roboto"}} onClick={() => {changeCurrentPage(page.page_id)}}> Spread {i+1} </p>
                <button id="deletePage" onClick={() => {deletePage(page.page_id)}}> x </button>
              </SpreadButtonContainer>
            </>
            } 
          </>
        ))}
        <SpreadButtonContainer onClick={handleClickCreateNewPage}>
          <p style={{color: "black", fontSize: "50px", fontFamilly: "Roboto", marginTop: "-34px"}}> + </p>
        </SpreadButtonContainer>
        </PagesGrid>
      </PageOptions>
      <Header></Header>
      <ToolBar>
      <ThemeProvider theme={theme}>
        <ToggleButton
          style = {{height: "48px", width: "48px", borderWidth: "0px", color: "white", focusBackgroundColor: "black"}}
          value="selection"
          selected={toolType === "selection"}
          onChange={() => {
            setToolType("selection");
          }}
        >
        <Icon icon="clarity:cursor-move-line" style={{ fontSize: '20px' }} />
        </ToggleButton>
        <ToggleButton
          style = {{height: "48px", width: "48px", borderWidth: "0px", color: "white"}}
          value="text"
          selected={toolType === "text"}
          onChange={() => {
            setToolType("text");
          }}
        > 
        <Icon icon="fa6-solid:a" style={{ fontSize: '22px' }} />
        </ToggleButton>
        <ToggleButton
          style = {{height: "48px", width: "48px", borderWidth: "0px", color: "white"}}
          value="rectangle"
          selected={toolType === "rectangle"}
          onChange={() => {
            setToolType("rectangle");
          }}
        >
        <Icon icon="bx:square" style={{ fontSize: '24px' }} />
        </ToggleButton>
        <ToggleButton
          style = {{height: "48px", width: "48px", borderWidth: "0px", color: "white"}}
          value="ellipse"
          selected={toolType === "ellipse"}
          onChange={() => {
            setToolType("ellipse");
          }}
        >
        <Icon icon="akar-icons:circle" style={{ fontSize: '20px' }} />
        </ToggleButton>
        <ToggleButton
          style = {{height: "48px", width: "48px", borderWidth: "0px", color: "white"}}
          value="line"
          selected={toolType === "line"}
          onChange={() => {
            setToolType("line");
          }}
        > 
        <HorizontalRuleIcon></HorizontalRuleIcon>
        </ToggleButton>
        <ToggleButton
          style = {{height: "48px", width: "48px", borderWidth: "0px", color: "white"}}
          value="pen"
          selected={toolType === "pen"}
          onChange={() => {
            setToolType("pen");
          }}
        > 
        <Icon icon="emojione-monotone:fountain-pen" style={{ fontSize: '22px' }} />
        </ToggleButton>
        <button id="undoButton" className="undoRedo"
          onClick={undo}>
          <UndoIcon />
        </button>
        <button id="redoButton" className="undoRedo"
          onClick={redo}>
          <RedoIcon />
        </button>
      </ThemeProvider>
      </ToolBar>
      <SaveButtonContainer>
        <button id="undoButton" className="undoRedo"
          onClick={save}>
          <SaveIcon />
        </button>
      </SaveButtonContainer>
      <ToolOptions>
        <div style={{width: 1000}}>
          <Accordion expanded={expandedAccordion === 'panel1'} onChange={handleAccordionChange('panel1')}
            style={{marginTop: 0}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
            <Icon icon="fa-solid:tools" style={{ fontSize: '22px' }} />
            <Typography sx={{ width: '50%', flexShrink: 0, marginLeft: 2, color: 'black', fontFamilly: "Roboto" }}>
              Options
            </Typography>
            </AccordionSummary>
            <AccordionDetails style={{maxHeight: '310px', overflowY: 'scroll' }}>
            <ThemeProvider theme={theme}>
            {toolType === "selection" ? (    
              <p style={{fontFamily: "Roboto", color: "black"}}> Select a tool to view options </p>  
            ) : null }
            {toolType === "text" ? (
              <Box>
                <label id="select-font" style={{fontFamily: "Roboto", fontSize: "14px"}}>Font</label>
                <div style={{height: "8px"}}></div>
                <Select
                  labelId="select-font"
                  id="font-select"
                  value={font}
                  onChange={handleSelectFont}
                  style={{width: "100%", height: "40px", fontFamily: font}}
                  MenuProps={{ style: {maxHeight: 450,},}}
                >
                  <MenuItem value={"Indie Flower"} style={{fontFamily: "Indie Flower"}}>Indie Flower</MenuItem>
                  <MenuItem value={"Rubik Marker Hatch"} style={{fontFamily: "Rubik Marker Hatch"}}>Rubik Marker Hatch</MenuItem>
                  <MenuItem value={"Aboreto"} style={{fontFamily: "Aboreto"}}>Aboreto</MenuItem>
                  <MenuItem value={"Amatic SC"} style={{fontFamily: "Amatic SC"}}>Amatic SC</MenuItem>
                  <MenuItem value={"Bangers"} style={{fontFamily: "Bangers"}}>Bangers</MenuItem>
                  <MenuItem value={"Caveat"} style={{fontFamily: "Caveat"}}>Caveat</MenuItem>
                  <MenuItem value={"Cormorant Garamond"} style={{fontFamily: "Cormorant Garamond"}}>Cormorant Garamond</MenuItem>
                  <MenuItem value={"Dancing Script"} style={{fontFamily: "Dancing Script"}}>Dancing Script</MenuItem>
                  <MenuItem value={"Josefin Slab"} style={{fontFamily: "Josefin Slab"}}>Josefin Slab</MenuItem>
                  <MenuItem value={"Miltonian"} style={{fontFamily: "Miltonian"}}>Miltonian</MenuItem>
                  <MenuItem value={"Rubik Marker Hatch"} style={{fontFamily: "Rubik Marker Hatch"}}>Rubik Marker Hatch</MenuItem>
                  <MenuItem value={"Pacifico"} style={{fontFamily: "Pacifico"}}>Pacifico</MenuItem>
                  <MenuItem value={"Rouge Script"} style={{fontFamily: "Rouge Script"}}>Rouge Script</MenuItem>
                  <MenuItem value={"Shadows Into Light"} style={{fontFamily: "Shadows Into Light"}}>Shadows Into Light</MenuItem>
                  <MenuItem value={"Water Brush"} style={{fontFamily: "Water Brush"}}>Water Brush</MenuItem>
                
                </Select>
                <div style={{height: "18px"}}></div>
                <label id="select-font" style={{fontFamily: "Roboto", fontSize: "14px"}}>Size</label>
                <Slider onChange={(event, value) => handleFontSize(event, value)} 
                  defaultValue={fontSize} 
                  aria-label="Default" 
                  valueLabelDisplay="auto" 
                  style={{width: "97%"}}
                />
                <div style={{height: "8px"}}></div>
                <label id="select-text-color" style={{fontFamily: "Roboto", fontSize: "14px"}}>Colour</label><div style={{height: "10px"}}></div>
                <div style={{display: "flex"}}>
                  <div style={{
                    minWidth: "40px", 
                    height: "40px", 
                    backgroundColor: textColor,
                    borderColor: isHoveringTextColor,
                    cursor: "pointer",
                    borderRadius: "5px",
                    border: "solid #c4c4c4 1px",}}
                    onMouseEnter={handleMouseEnterTextColor}
                    onMouseLeave={handleMouseLeaveTextColor}
                    onClick={handleClickTextColor}>
                  </div>
                  <Popover
                    open={openTexColorPopover}
                    anchorEl={textColorPopoverAnchor}
                    onClose={handleCloseTextColor}
                    anchorOrigin={{vertical: "top", horizontal: "left"}}
                    PaperProps={{
                      style: { width: "256px", padding: "13px"}
                    }}
                    >
                    <div style={{display: "flex", justifyContent: "space-evenly", flexWrap: "wrap"}}>
                      <Color13 onClick={() => {handleOutlineColorChange("#c92a2a");}}/>
                      <Color14 onClick={() => {handleOutlineColorChange("#e67700");}}/>
                      <Color15 onClick={() => {handleOutlineColorChange("#ffff20");}}/>
                      <Color16 onClick={() => {handleOutlineColorChange("#2b8a3e");}}/>
                      <Color17 onClick={() => {handleOutlineColorChange("#3f48cc");}}/>
                      <Color18 onClick={() => {handleOutlineColorChange("#5f3dc4");}}/>
                      <div style={{height: "5px", width: "100%"}}></div>
                      <Color1 onClick={() => {handleOutlineColorChange("#ff5b6b");}}/>
                      <Color2 onClick={() => {handleOutlineColorChange("#ffab51");}}/>
                      <Color3 onClick={() => {handleOutlineColorChange("#ffff51");}}/>
                      <Color4 onClick={() => {handleOutlineColorChange("#4fff75");}}/>
                      <Color5 onClick={() => {handleTextColorChange("#4ebefa");}}/>
                      <Color6 onClick={() => {handleTextColorChange("#bc5efb");}}/>
                      <div style={{height: "5px", width: "100%"}}></div>
                      <Color7 onClick={() => {handleTextColorChange("#ffb3bb");}}/>
                      <Color8 onClick={() => {handleTextColorChange("#ffdfba");}}/>
                      <Color9 onClick={() => {handleTextColorChange("#ffffba");}}/>
                      <Color10 onClick={() => {handleTextColorChange("#baffc9");}}/>
                      <Color11 onClick={() => {handleTextColorChange("#bae1ff");}}/>
                      <Color12 onClick={() => {handleTextColorChange("#e1b9fd");}}/>
                      <div style={{height: "5px", width: "100%"}}></div>
                      <Color19 onClick={() => {handleTextColorChange("#7c2e0c");}}/>
                      <Color20 onClick={() => {handleTextColorChange("#9a5825");}}/>
                      <Color21 onClick={() => {handleTextColorChange("#b7cb98");}}/>
                      <Color22 onClick={() => {handleTextColorChange("#798f63");}}/>
                      <Color23 onClick={() => {handleTextColorChange("#61988e");}}/>
                      <Color24 onClick={() => {handleTextColorChange("#0b7385");}}/>
                      <div style={{height: "5px", width: "100%"}}></div>
                      <Color25 onClick={() => {handleTextColorChange("#8c5638");}}/>
                      <Color26 onClick={() => {handleTextColorChange("#cab19b");}}/>
                      <Color30 onClick={() => {handleTextColorChange("#ffffff");}}/>
                      <Color27 onClick={() => {handleTextColorChange("#c3c3c3");}}/>
                      <Color28 onClick={() => {handleTextColorChange("#7f7f7f");}}/>
                      <Color29 onClick={() => {handleTextColorChange("#000000");}}/> 
                    </div>
                  </Popover> 
                  <div style={{height: "10px"}}></div>
                </div>
              </Box>
            ) : null }
            {toolType === "rectangle" || toolType === "ellipse" ? (
              <Box>
                <label id="select-font" style={{fontFamily: "Roboto", fontSize: "14px"}}>Size</label>
                <Slider onChange={(event, value) => handleFontSize(event, value)} 
                  defaultValue={fontSize} 
                  aria-label="Default" 
                  valueLabelDisplay="auto" 
                  style={{width: "97%"}}
                />
                <div style={{height: "8px"}}></div>
                <label id="select-stroke-color" style={{fontFamily: "Roboto", fontSize: "14px"}}>Colour</label><div style={{height: "10px"}}></div>
                <div style={{display: "flex"}}>
                  <div style={{
                    minWidth: "40px", 
                    height: "40px", 
                    backgroundColor: textColor,
                    borderColor: isHoveringTextColor,
                    cursor: "pointer",
                    borderRadius: "5px",
                    border: "solid #c4c4c4 1px",}}
                    onMouseEnter={handleMouseEnterTextColor}
                    onMouseLeave={handleMouseLeaveTextColor}
                    onClick={handleClickTextColor}>
                  </div>
                  <Popover
                    open={openTexColorPopover}
                    anchorEl={textColorPopoverAnchor}
                    onClose={handleCloseTextColor}
                    anchorOrigin={{vertical: "top", horizontal: "left"}}
                    PaperProps={{
                      style: { width: "256px", padding: "13px"}
                    }}
                    >
                    <div style={{display: "flex", justifyContent: "space-evenly", flexWrap: "wrap"}}>
                      <Color13 onClick={() => {handleTextColorChange("#c92a2a");}}/>
                      <Color14 onClick={() => {handleTextColorChange("#e67700");}}/>
                      <Color15 onClick={() => {handleTextColorChange("#ffff20");}}/>
                      <Color16 onClick={() => {handleTextColorChange("#2b8a3e");}}/>
                      <Color17 onClick={() => {handleTextColorChange("#3f48cc");}}/>
                      <Color18 onClick={() => {handleTextColorChange("#5f3dc4");}}/>
                      <div style={{height: "5px", width: "100%"}}></div>
                      <Color1 onClick={() => {handleTextColorChange("#ff5b6b");}}/>
                      <Color2 onClick={() => {handleTextColorChange("#ffab51");}}/>
                      <Color3 onClick={() => {handleTextColorChange("#ffff51");}}/>
                      <Color4 onClick={() => {handleTextColorChange("#4fff75");}}/>
                      <Color5 onClick={() => {handleTextColorChange("#4ebefa");}}/>
                      <Color6 onClick={() => {handleTextColorChange("#bc5efb");}}/>
                      <div style={{height: "5px", width: "100%"}}></div>
                      <Color7 onClick={() => {handleTextColorChange("#ffb3bb");}}/>
                      <Color8 onClick={() => {handleTextColorChange("#ffdfba");}}/>
                      <Color9 onClick={() => {handleTextColorChange("#ffffba");}}/>
                      <Color10 onClick={() => {handleTextColorChange("#baffc9");}}/>
                      <Color11 onClick={() => {handleTextColorChange("#bae1ff");}}/>
                      <Color12 onClick={() => {handleTextColorChange("#e1b9fd");}}/>
                      <div style={{height: "5px", width: "100%"}}></div>
                      <Color19 onClick={() => {handleTextColorChange("#7c2e0c");}}/>
                      <Color20 onClick={() => {handleTextColorChange("#9a5825");}}/>
                      <Color21 onClick={() => {handleTextColorChange("#b7cb98");}}/>
                      <Color22 onClick={() => {handleTextColorChange("#798f63");}}/>
                      <Color23 onClick={() => {handleTextColorChange("#61988e");}}/>
                      <Color24 onClick={() => {handleTextColorChange("#0b7385");}}/>
                      <div style={{height: "5px", width: "100%"}}></div>
                      <Color25 onClick={() => {handleTextColorChange("#8c5638");}}/>
                      <Color26 onClick={() => {handleTextColorChange("#cab19b");}}/>
                      <Color30 onClick={() => {handleTextColorChange("#ffffff");}}/>
                      <Color27 onClick={() => {handleTextColorChange("#c3c3c3");}}/>
                      <Color28 onClick={() => {handleTextColorChange("#7f7f7f");}}/>
                      <Color29 onClick={() => {handleTextColorChange("#000000");}}/> 
                    </div>
                  </Popover> 
                  <div style={{height: "10px"}}></div>
                </div>
              </Box>
            ) : null }
            </ThemeProvider>

            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expandedAccordion === 'panel2'} onChange={handleAccordionChange('panel2')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
            <Icon icon="fa-solid:tape" style={{ fontSize: '22px' }} />
            <Typography sx={{ width: '50%', flexShrink: 0, marginLeft: 1.2, color: 'black' }}>
              Tape
            </Typography>
            </AccordionSummary>
            <AccordionDetails style={{maxHeight: '310px', overflowY: 'scroll' }}>
          
            <Grid>
              <ElementContainer onClick={() => handleDrawImage("washi_8_short", 153, 67)}>
                <img style={{height: '100%', width: '100%'}} src={(washi_8_short)}></img>
              </ElementContainer>
              <ElementContainer onClick={() => handleDrawImage("washi_1_short", 153, 67)}>
                <img style={{height: '100%', width: '100%'}} src={(washi_1_short)}></img>
              </ElementContainer>
              <ElementContainer onClick={() => handleDrawImage("washi_2_short", 153, 67)}>
                <img style={{height: '100%', width: '100%'}} src={(washi_2_short)}></img>
              </ElementContainer>
              <ElementContainer onClick={() => handleDrawImage("washi_3_short", 153, 67)}>
                <img style={{height: '100%', width: '100%'}} src={(washi_3_short)}></img>
              </ElementContainer>
              <ElementContainer onClick={() => handleDrawImage("washi_4_short", 153, 67)}>
                <img style={{height: '100%', width: '100%'}} src={(washi_4_short)}></img>
              </ElementContainer>
              <ElementContainer onClick={() => handleDrawImage("washi_5_short", 153, 67)}>
                <img style={{height: '100%', width: '100%'}} src={(washi_5_short)}></img>
              </ElementContainer>
              <ElementContainer onClick={() => handleDrawImage("washi_6_short", 153, 67)}>
                <img style={{height: '100%', width: '100%'}} src={(washi_6_short)}></img>
              </ElementContainer>
              <ElementContainer onClick={() => handleDrawImage("washi_7_short", 153, 67)}>
                <img style={{height: '100%', width: '100%'}} src={(washi_7_short)}></img>
              </ElementContainer>
              <ElementContainer onClick={() => handleDrawImage("washi_8_mid", 403, 69)}>
                <img style={{height: '100%', width: '100%'}} src={(washi_8_mid)}></img>
              </ElementContainer>
              <ElementContainer onClick={() => handleDrawImage("washi_1_mid", 403, 69)}>
                <img style={{height: '100%', width: '100%'}} src={(washi_1_mid)}></img>
              </ElementContainer>
              <ElementContainer onClick={() => handleDrawImage("washi_2_mid", 403, 69)}>
                <img style={{height: '100%', width: '100%'}} src={(washi_2_mid)}></img>
              </ElementContainer>
              <ElementContainer onClick={() => handleDrawImage("washi_3_mid", 403, 69)}>
                <img style={{height: '100%', width: '100%'}} src={(washi_3_mid)}></img>
              </ElementContainer>
              <ElementContainer onClick={() => handleDrawImage("washi_4_mid", 403, 69)}>
                <img style={{height: '100%', width: '100%'}} src={(washi_4_mid)}></img>
              </ElementContainer>
              <ElementContainer onClick={() => handleDrawImage("washi_5_mid", 403, 69)}>
                <img style={{height: '100%', width: '100%'}} src={(washi_5_mid)}></img>
              </ElementContainer>
              <ElementContainer onClick={() => handleDrawImage("washi_6_mid", 403, 69)}> 
                <img style={{height: '100%', width: '100%'}} src={(washi_6_mid)}></img>
              </ElementContainer>
              <ElementContainer onClick={() => handleDrawImage("washi_7_mid", 403, 69)}>
                <img style={{height: '100%', width: '100%'}} src={(washi_7_mid)}></img>
              </ElementContainer>
              <ElementContainer onClick={() => handleDrawImage("washi_8_long", 65, 747)}>
                <img style={{height: '100%', width: '100%'}} src={(washi_8_long)}></img>
              </ElementContainer>
              <ElementContainer onClick={() => handleDrawImage("washi_1_long", 65, 747)}>
                <img style={{height: '100%', width: '100%'}} src={(washi_1_long)}></img>
              </ElementContainer>
              <ElementContainer onClick={() => handleDrawImage("washi_2_long", 65, 747)}>
                <img style={{height: '100%', width: '100%'}} src={(washi_2_long)}></img>
              </ElementContainer>
              <ElementContainer onClick={() => handleDrawImage("washi_3_long", 65, 747)}>
                <img style={{height: '100%', width: '100%'}} src={(washi_3_long)}></img>
              </ElementContainer>
              <ElementContainer onClick={() => handleDrawImage("washi_4_long", 65, 747)}>
                <img style={{height: '100%', width: '100%'}} src={(washi_4_long)}></img>
              </ElementContainer>
              <ElementContainer onClick={() => handleDrawImage("washi_5_long", 65, 747)}>
                <img style={{height: '100%', width: '100%'}} src={(washi_5_long)}></img>
              </ElementContainer>
              <ElementContainer onClick={() => handleDrawImage("washi_6_long", 65, 747)}>
                <img style={{height: '100%', width: '100%'}} src={(washi_6_long)}></img>
              </ElementContainer>
              <ElementContainer onClick={() => handleDrawImage("washi_7_long", 65, 747)}>
                <img style={{height: '100%', width: '100%'}} src={(washi_7_long)}></img>
              </ElementContainer>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expandedAccordion === 'panel3'} onChange={handleAccordionChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Icon icon="mdi:sticker" style={{ fontSize: '22px' }} />
          <Typography sx={{ width: '50%', flexShrink: 0, marginLeft: 2, color: 'black' }}>
            Stickers
          </Typography>
          
        </AccordionSummary>
        <AccordionDetails style={{maxHeight: '310px', overflowY: 'scroll' }}>
          <Grid>
            <ElementContainer onClick={() => handleDrawImage("leaf1", 73, 93)}>
              <img style={{height: '100%', width: '100%'}} src={(leaf1_square)}></img>
            </ElementContainer>
            <ElementContainer onClick={() => handleDrawImage("leaf2", 60, 89)}>
              <img style={{height: '100%', width: '100%'}} src={(leaf2_square)}></img>
            </ElementContainer>
            <ElementContainer onClick={() => handleDrawImage("leaf3", 39, 72)}>
              <img style={{height: '100%', width: '100%'}} src={(leaf3_square)}></img>
            </ElementContainer>
            <ElementContainer onClick={() => handleDrawImage("leaf4", 56, 77)}>
              <img style={{height: '100%', width: '100%'}} src={(leaf4_square)}></img>
            </ElementContainer>
            <ElementContainer onClick={() => handleDrawImage("leaf5", 40, 46)}>
              <img style={{height: '100%', width: '100%'}} src={(leaf5_square)}></img>
            </ElementContainer>
            <ElementContainer onClick={() => handleDrawImage("leaf6", 48, 55)}>
              <img style={{height: '100%', width: '100%'}} src={(leaf6_square)}></img>
            </ElementContainer>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expandedAccordion === 'panel4'} onChange={handleAccordionChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Icon icon="mdi:dots-horizontal-circle" style={{ fontSize: '22px' }} />
          <Typography sx={{ width: '50%', flexShrink: 0, marginLeft: 2, color: 'black' }}>
            Doodles
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{maxHeight: '310px', overflowY: 'scroll' }}>
        <Grid>
            <ElementContainer onClick={() => handleDrawImage("flowers", 147, 220)}>
              <img style={{height: '90%', width: '60%'}} src={(flowers)}></img>
            </ElementContainer>
            <ElementContainer onClick={() => handleDrawImage("leaves1", 165, 98)}>
              <img style={{height: '100%', width: '100%'}} src={(leaves1_square)}></img>
            </ElementContainer>
            <ElementContainer onClick={() => handleDrawImage("flower3", 346, 444)}>
              <img style={{height: '100%', width: '100%'}} src={(flower3_square)}></img>
            </ElementContainer>
            <ElementContainer onClick={() => handleDrawImage("flower1", 166, 156)}>
              <img style={{height: '100%', width: '100%'}} src={(flower1_square)}></img>
            </ElementContainer>
            <ElementContainer onClick={() => handleDrawImage("circledesign", 400, 400)}>
              <img style={{height: '100%', width: '100%'}} src={(circledesign)}></img>
            </ElementContainer>
            <ElementContainer onClick={() => handleDrawImage("box1", 159, 184)}>
              <img style={{height: '100%', width: '100%'}} src={(box1)}></img>
            </ElementContainer>
            <ElementContainer onClick={() => handleDrawImage("notepad", 166, 137)}>
              <img style={{height: '100%', width: '100%'}} src={(notepad_square)}></img>
            </ElementContainer>
            <ElementContainer onClick={() => handleDrawImage("stickynote1", 239, 298)}>
              <img style={{height: '100%', width: '100%'}} src={(stickynote1_square)}></img>
            </ElementContainer>
            <ElementContainer onClick={() => handleDrawImage("border1", 374, 356)}>
              <img style={{height: '100%', width: '100%'}} src={(border1_square)}></img>
            </ElementContainer>
            <ElementContainer onClick={() => handleDrawImage("calendar", 278, 240)}>
              <img style={{height: '100%', width: '100%'}} src={(calendar_square)}></img>
            </ElementContainer>
            <ElementContainer onClick={() => handleDrawImage("notebook", 282, 244)}>
              <img style={{height: '100%', width: '100%'}} src={(notebook_square)}></img>
            </ElementContainer>
            <ElementContainer onClick={() => handleDrawImage("ribbon1", 464, 106)}>
              <img style={{height: '100%', width: '100%'}} src={(ribbon1_square)}></img>
            </ElementContainer>
            <ElementContainer onClick={() => handleDrawImage("arrow1", 204, 24)}>
              <img style={{height: '100%', width: '100%'}} src={(arrow1_square)}></img>
            </ElementContainer>
            <ElementContainer onClick={() => handleDrawImage("arrow2", 204, 24)}>
              <img style={{height: '100%', width: '100%'}} src={(arrow2_square)}></img>
            </ElementContainer>
            <ElementContainer onClick={() => handleDrawImage("arrow3", 123, 58)}>
              <img style={{height: '100%', width: '100%'}} src={(arrow3_square)}></img>
            </ElementContainer>
            <ElementContainer onClick={() => handleDrawImage("arrow4", 123, 58)}>
              <img style={{height: '100%', width: '100%'}} src={(arrow4_square)}></img>
            </ElementContainer>
            <ElementContainer onClick={() => handleDrawImage("diamond", 102, 98)}>
              <img style={{height: '100%', width: '100%'}} src={(diamond_square)}></img>
            </ElementContainer>
            <ElementContainer onClick={() => handleDrawImage("envelope", 139, 95)}>
              <img style={{height: '100%', width: '100%'}} src={(envelope_square)}></img>
            </ElementContainer>
            <ElementContainer onClick={() => handleDrawImage("banner1", 101, 110)}>
              <img style={{height: '100%', width: '100%'}} src={(banner1_square)}></img>
            </ElementContainer>
            <ElementContainer onClick={() => handleDrawImage("pencil", 179, 110)}>
              <img style={{height: '100%', width: '100%'}} src={(pencil_square)}></img>
            </ElementContainer>
          </Grid>
        </AccordionDetails>
      </Accordion>
      </div>
      </ToolOptions>
      <CanvasContainer>
        <div style={{position: "absolute"}}>
        <canvas id="canvas" width="1038" height="698"
          /* onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp} */
          onPointerDown={handleMouseDown}
          onPointerUp={handleMouseUp}
          onPointerMove={handleMouseMove}
          style = {{touchAction: "none", marginTop: 0, marginLeft: 0}}
        >
        </canvas>
        </div>
        </CanvasContainer>
        {action === "write" ? (      
          <textarea 
          ref={textAreaRef}
          onBlur={handleBlur}
          id="TextArea"
          style = {{
            position : "absolute",
          /*   top: selectedElement.y1 - 3,
            left: selectedElement.x1, */
            top: textAreaTopEdge - 7,
            left: textAreaLeftEdge,
            fontSize: fontSize,
            fontFamily: font,
            color: textColor,
            margin: 0,
            padding: 0,
            border: 0,
            outline: 0,
            resize: "none",
            overflow: "hidden",
            whitespace: "pre",
            background: "transparent",
         }}
          />
        ) : null }
        <Snackbar open={alert} 
          autoHideDuration={1500} 
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
            Saved changes
          </Alert>
        </Snackbar>
        <Dialog onClose={handleCloseCreatePageDialog} open={openCreatePageDialog} style={{padding: "0px"}}>
          <CreatePageContainer>
            <h2 style={{fontFamily: "Roboto", fontSize: "18px"}}> New page </h2>
            <form onSubmit={handleSubmit}>
              <ThemeProvider theme={theme}>
                <br></br>
                <div style={{display: "flex", textAlign: "left", marginLeft: "30px"}}>
                  <label style={{fontFamily: 'Roboto', marginBottom: "10px"}}>
                    Choose page template
                  </label>
                </div>
                <JournalPagesContainer style={{padding: "10px"}}>
                  <Grid style={{display: "flex", justifyContent: "space-evenly"}}>
                  <input onClick={handleChange} type="radio" id="blank" name="template" class="input_hidden" value="0"/>
                  <label for="blank" style={{borderWidth: "1px", borderColor: "black"}}>
                      <img style={{height: '135px', width: '200x', borderRadius: "5px", cursor: "pointer", outline: "solid 1px #c4c4c4"}} src={(blank)}></img>
                  </label>
                  <input onClick={handleChange} type="radio" id="template1" name="template" class="input_hidden" value="5"/>
                  <label for="template1" style={{borderWidth: "1px", borderColor: "black"}}>
                      <img style={{height: '135px', width: '200x', borderRadius: "5px", cursor: "pointer", outline: "solid 1px #c4c4c4"}} src={(template1)}></img>
                  </label>
                  <input onClick={handleChange} type="radio" id="template2" name="template" class="input_hidden" value="1"/>
                  <label for="template2" style={{borderWidth: "1px", borderColor: "black"}}>
                      <img style={{height: '135px', width: '200x', borderRadius: "5px", cursor: "pointer", outline: "solid 1px #c4c4c4"}} src={(template2)}></img>
                  </label>
                  <input onClick={handleChange} type="radio" id="template3" name="template" class="input_hidden" value="2"/>
                  <label for="template3" style={{borderWidth: "1px", borderColor: "black"}}>
                      <img style={{height: '135px', width: '200x', borderRadius: "5px", cursor: "pointer", outline: "solid 1px #c4c4c4"}} src={(template3)}></img>
                  </label>
                  <input onClick={handleChange} type="radio" id="template4" name="template" class="input_hidden" value="4"/>
                  <label for="template4" style={{borderWidth: "1px", borderColor: "black"}}>
                      <img style={{height: '135px', width: '200x', borderRadius: "5px", cursor: "pointer", outline: "solid 1px #c4c4c4"}} src={(template4)}></img>
                  </label>
                  </Grid>
                </JournalPagesContainer>
                <button id="formButton_create" style={{marginTop: "10px"}}>Create</button>
            </ThemeProvider>
          </form>
        </CreatePageContainer>
      </Dialog>
    </EditorContainer>
  )
}
  
export default Editor