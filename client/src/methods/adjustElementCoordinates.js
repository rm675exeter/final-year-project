
// Method for adjusting element coordinates
// Ensures that the top left corner is always x1, y1 
// and bottom right corner is always x2, y2
const adjustElementCoordinates = element => {
  const {type, x1, y1, x2, y2} = element;

  if(type === "rectangle"){

    // Find minimum and maximum x and y values
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);

    return {x1: minX, y1: minY, x2: maxX, y2: maxY};
  } else if (type === "line"){

    // If x1 < x2 or line is drawn vertically with y1 < y2
    if(x1 < x2 || (x1 === x2 && y1 < y2)) {

      // No adjustment needed
      return {x1, y1, x2, y2}
    } else {
    
      // Switch (x1, y1) and (x2, y2)
      return {x1: x2, y1: y2, x2: x1, y2: y1};
    }
  }
}

export default adjustElementCoordinates;