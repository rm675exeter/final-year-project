// Method to check if client coordinates are close to corners of element
const checkNearPoint = (x, y, x1, y1, corner, type) => {

  if(type != "image"){   
    // Check if client x, y coordinates are close to corner
    return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? corner : null;

  } else {
    return Math.abs(x - x1) < 15 && Math.abs(y - y1) < 15 ? corner : null;
  }


}

  
const checkOnLine = (x1, y1, x2, y2, x, y, type) => {

  // Calculation for working out distance
  const distance = (a, b) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

  // Start of line
  const a = {x: x1, y: y1};

  // End of line
  const b = {x: x2, y: y2};

  // Client coordinates
  const c = {x, y};

  // Calculate the distance from the client coordinates to the start 
  // and end of the line
  const clientDistanceFromStart = distance(a, c);
  const clientDistanceFromEnd = distance(b, c);

  // Calculate total line length
  const lineLength = distance(a,b);

  // Calculate offset
  const offset = (lineLength - (clientDistanceFromStart + clientDistanceFromEnd));

  if (type === "line"){

    // If offset is less than 1, client coordinates are on the line
    return Math.abs(offset) < 1 ? "inside" : null;

  } else if (type === "pen"){
    
    // If offset is less than 5, client coordinates are on the line
    return Math.abs(offset) < 5 ? "inside" : null;

  }

}
  
// Method to check if x and y values are within an element or at a corner
const positionWithinElement = (x, y, element) => {
  const {type, x1, x2, y1, y2} = element;
  
  if(type === "rectangle") {

    // Check if client coordinate are near corner or within element
    const topLeft = checkNearPoint(x, y, x1, y1, "top-left");
    const topRight = checkNearPoint(x, y, x2, y1, "top-right");
    const bottomLeft = checkNearPoint(x, y, x1, y2, "bottom-left");
    const bottomRight = checkNearPoint(x, y, x2, y2, "bottom-right");
    const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;

    return topLeft || topRight || bottomLeft || bottomRight || inside;

  } else if(type === "line"){
    
    // Check if client coordinates are on the line
    const onLine = checkOnLine(x1, y1, x2, y2, x, y, type);

    // Check if client coordinates are close to either end
    const start = checkNearPoint(x, y, x1, y1, "start");
    const end = checkNearPoint(x, y, x2, y2, "end");

    return start || end || onLine;

  } else if(type === "ellipse"){


   /*  const leftEdge = (x1 - x2);
    const rightEdge = (x1 + x2);
    const topEdge = (y1 - y2);
    const bottomEdge = (y1 + y2);

    const inside = x >= leftEdge && x <= rightEdge && y >= topEdge && y <= bottomEdge ? "inside" : null; */

    const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;

/*     const centerX = x1 + (x2/2);
    const centerY = y1 + (y2/2);
    const a = (x2 - x1) / 2
    const b = (y2 - y2) / 2

    const result = (parseInt(Math.pow((x - centerX), 2)) / parseInt(Math.pow(a, 2)))
    + (parseInt(Math.pow((y - centerY), 2)) / parseInt(Math.pow(b, 2))); */

   /*  if(result === 1 || result < 1){
      return "inside";
    } else {
      return null;
    }
  */

  return inside;
  
  } else if(type === "pen"){

    const betweenAnyPoint = element.points.some((point, index) => {

      const nextPoint = element.points[index + 1];
      
      if (!nextPoint){
        return false;
      }

      return checkOnLine(point.x, point.y, nextPoint.x, nextPoint.y, x, y, type) != null;
    })

    const onPenStroke = betweenAnyPoint ? "inside" : null;

    return onPenStroke;
  } else if (type === "text"){

    return x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;

  } else if (type === "image"){

    const rightSide = x1 + x2;
    const bottom = y1 + y2;


    // Check if client coordinate are near corner or within element
    const topLeft = checkNearPoint(x, y, x1, y1, "top-left", type);
    const topRight = checkNearPoint(x, y, rightSide, y1, "top-right", type);
    const bottomLeft = checkNearPoint(x, y, x1, bottom, "bottom-left", type);
    const bottomRight = checkNearPoint(x, y, rightSide, bottom, "bottom-right", type);

    const inside = x >= x1 && x <= (x1 + x2) && y >= y1 && y <= (y1 + y2) ? "inside" : null;

    return inside || topLeft || topRight || bottomLeft || bottomRight

  }

};

// Method for getting element position on click 
const getElementAtPosition = (x, y, elements) => {

  // Iterates through each element and checks if client coordinates are within element
  return elements
  .map(element => ({...element, position: positionWithinElement(x, y, element)}))
  .find(element => element.position !== null);

};

export default getElementAtPosition;