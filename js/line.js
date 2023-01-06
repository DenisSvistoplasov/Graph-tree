class Line{
    constructor(point1, point2, idLeft, idRight){
        var xmlns = "http://www.w3.org/2000/svg";
        var element = this.element = document.createElementNS(xmlns, "line");
        element.setAttributeNS(null, 'x1', point1.x);
        element.setAttributeNS(null, 'y1', point1.y);
        element.setAttributeNS(null, 'x2', point2.x);
        element.setAttributeNS(null, 'y2', point2.y);
        element.setAttributeNS(null, 'stroke', 'black');
        $('svg').append(element);
        this.blocksIDs = {
            left: idLeft,
            right: idRight
        };
    }

    change(point1=null, point2=null){
        if (point1){
            this.element.setAttributeNS(null, 'x1', point1.x);
            this.element.setAttributeNS(null, 'y1', point1.y);
        }
        if (point2){
            this.element.setAttributeNS(null, 'x2', point2.x);
            this.element.setAttributeNS(null, 'y2', point2.y);
        }
    }
}