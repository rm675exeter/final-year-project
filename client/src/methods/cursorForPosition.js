// Method to determine cursor style when using selection tool
const cursorForPosition = position => {

  // If cursor is positioned on any corners, switch cursor to resize
  // Otherwise, switch to "move"

  if(position === "top-left" ||
    position === "bottom-right" ||
    position === "start" ||
    position === "end"){
      return "nwse-resize";
    } else if (position === "top-right" ||
    position === "bottom-left"){
      return "nesw-resize";
    } else {
      return "move";
    }
}

export default cursorForPosition;
