// Base SVG
var xmlns = "http://www.w3.org/2000/svg";
let wrapper = document.getElementsByClassName('wrapper')[0];
var boxWidth = wrapper.offsetWidth;
var boxHeight = wrapper.offsetHeight;
var svgElem = document.createElementNS(xmlns, "svg");
svgElem.setAttributeNS(null, "viewBox", "0 0 " + boxWidth + " " + boxHeight);
svgElem.setAttributeNS(null, "width", boxWidth);
svgElem.setAttributeNS(null, "height", boxHeight);
svgElem.style.display = "block";
$(wrapper).append(svgElem);



var zeroBlock;
if (localStorage.getItem('Graphs')) zeroBlock = Application.firstBlock = Application.unload();
else zeroBlock = Application.firstBlock = new Block(null, 0, {x: 100, y: 200});
