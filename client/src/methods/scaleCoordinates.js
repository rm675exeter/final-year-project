import { elementAcceptingRef } from "@mui/utils";

// Method to scale the selected corner
const scaleCoordinates = (canvasX, canvasY, position, coordinates, type) => {

  const {x1, y1, x2, y2} = coordinates;

  if(type != "image"){
    if (position === "top-left" || position === "start"){
  
      // Change top-left / start point on element to client coordinates
      return {x1: canvasX, y1: canvasY, x2, y2};
  
    } else if (position === "top-right"){
  
      // Change top-right point on element to client coordinates
      return {x1, y1: canvasY, x2: canvasX, y2};
    } else if (position === "bottom-left"){
  
      // Change bottom-left point on element to client coordinates
      return {x1: canvasX, y1, x2, y2: canvasY};
  
    } else if (position === "bottom-right" || position === "end"){
  
      // Change bottom-right point on element to client coordinates
      return {x1, y1, x2: canvasX, y2: canvasY};
    } else {
      return null;
    }
  } else {
    if (position === "top-left"){
  
    // Change top-left / start point on element to client coordinates
    // Adjust width and height

    const new_width = x2 + (x1 - canvasX);
    const new_height = y2 + (y1 - canvasY);

    if(canvasX < (x1 + x2) && canvasY < (y1 + y2)){
      return {x1: canvasX, y1: canvasY, x2: new_width, y2: new_height};
    }

  } else if (position === "top-right"){
    
    const new_width = canvasX - x1;
    const new_height = y2 + (y1 - canvasY);

    if(canvasX > x1 && canvasY < (y1 + y2)){
      return {x1: x1, y1: canvasY, x2: new_width, y2: new_height};
    } else {
      return;
    }
    
  } else if (position === "bottom-left"){

    const new_width = (x2 + x1) - canvasX;
    const new_height = (canvasY - y1)

    if(canvasX < (x1 + x2) && canvasY > y1){
      return {x1: canvasX, y1: y1, x2: new_width, y2: new_height};
    } else {
      return;
    }

  } else if (position === "bottom-right"){

    const new_width = canvasX - x1;
    const new_height = canvasY - y1;

    if(canvasX > x1 && canvasY > y1){
      return {x1: x1, y1: y1, x2: new_width, y2: new_height};
    } else {
      return;
    }

  }
 }
}
  
export default scaleCoordinates;