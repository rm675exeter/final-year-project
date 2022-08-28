// Import perfect-freehand for pen tool
import getStroke from 'perfect-freehand';

import getSvgPathFromStroke from '.././methods/getSvgPathFromStroke.js';

import flowers from '.././assets/elements/flowers.png';
import diamond from '.././assets/elements/diamond.png';
import box1 from '.././assets/elements/box1.png';
import notepad from '.././assets/elements/notepad.png';
import flower1 from '.././assets/elements/flower1.png';
import arrow1 from '.././assets/elements/arrow1.png';
import arrow2 from '.././assets/elements/arrow2.png';
import arrow3 from '.././assets/elements/arrow3.png';
import arrow4 from '.././assets/elements/arrow4.png';
import leaves1 from '.././assets/elements/leaves1.png';
import flower3 from '.././assets/elements/flower3.png';
import circledesign from '.././assets/elements/circledesign.png';
import leaf1 from '.././assets/elements/leaf1.png';
import leaf2 from '.././assets/elements/leaf2.png';
import leaf3 from '.././assets/elements/leaf3.png';
import leaf4 from '.././assets/elements/leaf4.png';
import leaf5 from '.././assets/elements/leaf5.png';
import leaf6 from '.././assets/elements/leaf6.png';
import stickynote1 from '.././assets/elements/stickynote1.png';
import envelope from '.././assets/elements/envelope.png';
import banner1 from '.././assets/elements/banner1.png';
import pencil from '.././assets/elements/pencil.png';
import border1 from '.././assets/elements/border1.png';
import ribbon1 from '.././assets/elements/ribbon1.png';
import calendar from '.././assets/elements/calendar.png';
import notebook from '.././assets/elements/notebook.png';




import w1l from '.././assets/washi_tape/w1l.png';
import w2l from '.././assets/washi_tape/w2l.png';
import w3l from '.././assets/washi_tape/w3l.png';
import w4l from '.././assets/washi_tape/w4l.png';
import w5l from '.././assets/washi_tape/w5l.png';
import w6l from '.././assets/washi_tape/w6l.png';
import w7l from '.././assets/washi_tape/w7l.png';
import w8l from '.././assets/washi_tape/w8l.png';
import w1s from '.././assets/washi_tape/w1s.png';
import w2s from '.././assets/washi_tape/w2s.png';
import w3s from '.././assets/washi_tape/w3s.png';
import w4s from '.././assets/washi_tape/w4s.png';
import w5s from '.././assets/washi_tape/w5s.png';
import w6s from '.././assets/washi_tape/w6s.png';
import w7s from '.././assets/washi_tape/w7s.png';
import w8s from '.././assets/washi_tape/w8s.png';
import w1m from '.././assets/washi_tape/w1m.png';
import w2m from '.././assets/washi_tape/w2m.png';
import w3m from '.././assets/washi_tape/w3m.png';
import w4m from '.././assets/washi_tape/w4m.png';
import w5m from '.././assets/washi_tape/w5m.png';
import w6m from '.././assets/washi_tape/w6m.png';
import w7m from '.././assets/washi_tape/w7m.png';
import w8m from '.././assets/washi_tape/w8m.png';


const imageSrcs = {};

imageSrcs['notebook'] = notebook;
imageSrcs['calendar'] = calendar;
imageSrcs['ribbon1'] = ribbon1;
imageSrcs['border1'] = border1;
imageSrcs['banner1'] = banner1;
imageSrcs['pencil'] = pencil;
imageSrcs['envelope'] = envelope;
imageSrcs['circledesign'] = circledesign;
imageSrcs['stickynote1'] = stickynote1;
imageSrcs['leaf1'] = leaf1;
imageSrcs['leaf2'] = leaf2;
imageSrcs['leaf3'] = leaf3;
imageSrcs['leaf4'] = leaf4;
imageSrcs['leaf5'] = leaf5;
imageSrcs['leaf6'] = leaf6;
imageSrcs['leaves1'] = leaves1;
imageSrcs['flower3'] = flower3;
imageSrcs['flowers'] = flowers;
imageSrcs['flower1'] = flower1;
imageSrcs['diamond'] = diamond;
imageSrcs['box1'] = box1;
imageSrcs['notepad'] = notepad;
imageSrcs['arrow1'] = arrow1;
imageSrcs['arrow2'] = arrow2;
imageSrcs['arrow3'] = arrow3;
imageSrcs['arrow4'] = arrow4;
imageSrcs['washi_1_long'] = w1l;
imageSrcs['washi_2_long'] = w2l;
imageSrcs['washi_3_long'] = w3l;
imageSrcs['washi_4_long'] = w4l;
imageSrcs['washi_5_long'] = w5l;
imageSrcs['washi_6_long'] = w6l;
imageSrcs['washi_7_long'] = w7l;
imageSrcs['washi_8_long'] = w8l;
imageSrcs['washi_1_short'] = w1s;
imageSrcs['washi_2_short'] = w2s;
imageSrcs['washi_3_short'] = w3s;
imageSrcs['washi_4_short'] = w4s;
imageSrcs['washi_5_short'] = w5s;
imageSrcs['washi_6_short'] = w6s;
imageSrcs['washi_7_short'] = w7s;
imageSrcs['washi_8_short'] = w8s;
imageSrcs['washi_1_mid'] = w1m;
imageSrcs['washi_2_mid'] = w2m;
imageSrcs['washi_3_mid'] = w3m;
imageSrcs['washi_4_mid'] = w4m;
imageSrcs['washi_5_mid'] = w5m;
imageSrcs['washi_6_mid'] = w6m;
imageSrcs['washi_7_mid'] = w7m;
imageSrcs['washi_8_mid'] = w8m;




// Method to draw element onto canvas
const drawElement = (roughCanvas, context, element, toolType) => {

  const type = toolType;

  if(type === "line" || type === "rectangle" || type === "ellipse"){

    roughCanvas.draw(element.roughElement)
    
  } else if (type === "pen"){

    const stroke = getSvgPathFromStroke(getStroke(element.points, {
      size: 5,
    }));
    context.fill(new Path2D(stroke));
  } else if (type === "text"){
    context.fillStyle = element.textColor;
    context.textBaseline = "top";
    context.font = element.fontSize + "px "+ element.font;
    context.fillText(element.text, element.x1, element.y1);
  } else if (type === "image"){
    
    const canvasImage = new Image();
    canvasImage.src = imageSrcs[element.imageType]
    const {x1, y1, x2, y2} = element;

    context.drawImage(canvasImage, x1, y1, x2, y2);

    /* requestAnimationFrame(drawElement);
 */
  }
}

export default drawElement;

