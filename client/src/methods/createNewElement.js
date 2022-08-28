// Import roughjs for hand-drawn look to elements
import rough from 'roughjs/bundled/rough.esm.js';

// Initiate generator to create elements
const generator = rough.generator();


// Function for creating new elements
const createNewElement = (id, x1, y1, x2, y2, toolType, options, image) => {

  const type = toolType;
  const imageType = image;


  if(type === "line"){
    // Generate line
    const roughElement = generator.line(x1, y1, x2, y2, options);
    return { id, x1, y1, x2, y2, type, roughElement, options };
  } else if(type === "rectangle"){
    // Generate rectangle
    const roughElement = generator.rectangle(x1, y1, x2-x1, y2-y1, options);
    return { id, x1, y1, x2, y2, type, roughElement, options };
  } else if(type === "ellipse"){
    // Generate ellipse

    // Horizontal radius equal to half the difference between the 
    // width and the centre x coordinate

    const radiusX = ((x2 - x1)/2);

    // Vertical radius equal to half the difference between the 
    // height and the centre y coordinate
    const radiusY = ((y2 - y1)/2);

    // Generate ellipse with centre points such that the ellipse is
    // drawn from the cursor position
    const roughElement = generator.ellipse(x1 + radiusX, y1 + radiusY, x2-x1, y2-y1, options);
    return { id, x1, y1, x2, y2, type, roughElement, options };
    
  } else if(type === "selection"){

  } else if(type === "pen"){
    
    return {id, type, points: [{x: x1, y: y1}], options};
  } else if(type === "text"){

    console.log(options.textColor);
    return{id, type, x1, y1, x2, y2, options, text: ""};

  } else if(type === "image"){

    const options = ""

    return{id, x1, y1, x2, y2, type, options, imageType}

  }
}

export default createNewElement;