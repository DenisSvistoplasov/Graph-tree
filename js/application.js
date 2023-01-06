var Application = {
    firstBlock: null,
    struct(block){
        let structure1 = {
            id: block.id || 0,
            offset: block.offset,
            text: block.inner.innerText,
            subsequent: []
        };
        block.subsequent.forEach(a => structure1.subsequent.push(Application.struct(a)));
        return structure1;
    },
    save(){
        let structure1 = Application.struct(this.firstBlock);
        
        let string = JSON.stringify(structure1);
        localStorage.setItem('Graphs', string);
    },
    unload(){
        let storage = JSON.parse(localStorage.getItem('Graphs'));
        return this.load(storage);
    },
    load(block, previous=null){
        let currentBlock = new Block(previous, block.id, block.offset);
        currentBlock.inner.innerText = block.text;
        block.subsequent.forEach(a => this.load(a, currentBlock));
        return currentBlock;
    }
}


Application.save = Application.save.bind(Application);
Application.unload = Application.unload.bind(Application);
Application.load = Application.load.bind(Application);