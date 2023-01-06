class Block{
    constructor(previous=null, id=0, offset={x: 100, y: 200}){
        const instance = this;
        this.lines = {
            left: null,
            right: []
        };
        this.previous = previous;
        this.id = id;
        this.subsequent = [];
        this.offset =  {x:offset.x, y:offset.y};
        const element = this.element = document.createElement('div');
        element.classList.add('block');
        element.id = 'block-'+id;
        element.setAttribute('draggable', 'true');
        $(element).css('left', this.offset.x+'px');
        $(element).css('top', this.offset.y+'px');
        this.remove = this.remove.bind(this);
        
        // Inner
        const inner = this.inner = document.createElement('div');
        inner.classList.add('inner');

        // Plus
        const plus = this.plus = document.createElement('div');
        plus.classList.add('plus');
        $(plus).on('click', function(){
            new Block(instance, Block.counter, {x: instance.offset.x+instance.element.offsetWidth+40, y: instance.offset.y});
            Application.save();
        });

        //Delete
        const deleteButton = this.deleteButton = document.createElement('div');
        deleteButton.classList.add('deleteButton');
        $(deleteButton).on('click', instance.remove);

        //Appending
        $(element).append(inner);
        $(element).append(plus);
        $(element).append(deleteButton);
        $('.wrapper').append(instance.element);
        Block.counter++;


        // Line
        if (previous){
            let point1 = getMiddles(previous.element).right,
                point2 = getMiddles(instance.element).left,
                line = new Line(point1, point2);
            previous.lines.right.push(line);
            instance.lines.left = line;
            previous.subsequent.push(instance);
        }


        element.addEventListener('dragstart', function (event) {
            instance.mouseOffset = {
                x: event.clientX - instance.offset.x,
                y: event.clientY - instance.offset.y
            };
        });
        element.addEventListener('dragend', function (event) {
            //Position
            instance.offset.x = event.clientX - instance.mouseOffset.x;
            instance.offset.y = event.clientY - instance.mouseOffset.y;
            $(element).css('left', (instance.offset.x)+'px');
            $(element).css('top', (instance.offset.y)+'px');
            //Lines
            instance.lines.left && instance.lines.left.change(null, getMiddles(instance.element).left);
            instance.lines.right.forEach(line => {
                line.change(getMiddles(instance.element).right, null);
            });
            Application.save();
        });
        element.addEventListener('dblclick', function (event) {
            inner.setAttribute('contenteditable', 'true');
            element.removeAttribute('draggable');
            inner.focus();
        });
        inner.addEventListener('blur', function (event) {
            inner.removeAttribute('contenteditable');
            element.setAttribute('draggable', 'true');
            inner.innerText = inner.innerText.trim();
            Application.save();
        });
        inner.addEventListener('keydown', function(e){ setTimeout(Application.save, 10); });
    }
    
    remove(){
        if (this.previous){
            this.element.remove();
            this.lines.left.element.remove();
            this.previous.subsequent = deleteFromArray(this.previous.subsequent, this);
            this.previous.lines.right = deleteFromArray(this.previous.lines.right, this.lines.left);
            this.subsequent.forEach(sub => {
                this.previous.subsequent.push(sub);
                sub.previous = this.previous;
            });
            this.lines.right.forEach(line => {
                this.previous.lines.right.push(line);
                line.change(getMiddles(this.previous.element).right);
            });
            Application.save();
        }
    } 
}
Block.counter = Block.counter || 0;


function getMiddles(element) {
    let height = element.offsetHeight,
        width = element.offsetWidth,
        left = element.offsetLeft,
        top = element.offsetTop;
    let answer = {
        left: {
            x: left,
            y: top + height/2
        },
        right: {
            x: left + width,
            y: top + height/2
        }
    };
    return answer;
}

function deleteFromArray(array, el){
    let newArray = [];
    array.forEach(a => {
        if (a!==el) newArray.push(a);
    });
    return newArray;
}

