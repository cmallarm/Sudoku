class Sudoku {
    constructor() {
        this.string = "52...6.........7.13...........4..8..6......5...........418.........3..2...87.....";
        this.array = new Array();
        this.clicked=null;

        var line = new Array();
        for (var i = 0; i < 81; i++) {
            var char = this.string.charAt(i);
            var number;

            //Get number
            if(char=="."){number=0;}
            else {number=parseInt(char);}

            if(line.length==9){ //Add new line
                this.array.push(line);
                line = new Array();
            }
            
            //Add number to line
            line.push(number);
        }
        this.array.push(line);

        //Add listener for keyboard
        document.addEventListener("keydown", function(event) {
            var n = event.key;
            if(sudoku.clicked!=null){
                if(isNaN(n) && (n=="Backspace" || n=="Delete")){
                    sudoku.deleteNumber();
                }else if (!isNaN(n)){
                    sudoku.addNumber(parseInt(n));
                }
            }
        }); 
    }

    print() {
        var boxes = document.body.children;

        //Print numbers
        for (var i = 0; i < this.array.length; i++) {
            for (var j = 0; j < this.array[i].length; j++) {
                var number = this.array[i][j];
                if(number!=0){
                    boxes[(i*9)+j].innerHTML=number;
                    boxes[(i*9)+j].style.color = "black";
                }
            }
        }
        //Add listeners
        for (var i = 0; i < boxes.length; i++) {
            var box = boxes[i];
            if(box.innerHTML==""){
                box.addEventListener("click", function() {
                    Array.from(boxes).forEach(b => {
                        b.style.backgroundColor = "white";
                    });                    
                    this.style.backgroundColor = "lightgrey";
                    sudoku.clicked=this;
                });
            }
        }
    }

    addNumber(number){       

        if(this.checkNumber(number)){
            //Add number to array
            this.clicked.innerHTML=number;
            this.updateArray();

            //Is the game won ?
            this.checkWin();
        }
        
    }

    deleteNumber(){
        this.clicked.innerHTML="";
        this.updateArray();
    }

    updateArray(){
        var boxes = document.body.children;

        for (var i = 0; i < this.array.length; i++) {
            for (var j = 0; j < this.array[i].length; j++) {
                var value = 0;

                if(boxes[(i*9)+j].innerHTML!=""){value=parseInt(boxes[(i*9)+j].innerHTML);}
                this.array[i][j]=value;
            }
        }   
    }

    checkWin(){
        for (var i = 0; i < this.array.length; i++) {
            if(this.array[i].includes(0)){
                return false;
            }
        }

        alert("You won ! Congratulations =)"); 

        //Remove listeners
        var boxes = document.body.children;         
        Array.from(boxes).forEach(b => {
            b.style.backgroundColor = "white";
            document.body.replaceChild(b.cloneNode(true), b);
        });     
        this.clicked=null;

        return true;
    }

    checkNumber(number){
        var boxes = document.body.children;
        var boxIndex = Array.from(boxes).indexOf(this.clicked);
        var column = boxIndex-9*Math.floor(boxIndex/9);
        var line = Math.floor(boxIndex/9);

        var placeable= true;

        //Check new number is different from old one
        if(number==this.array[line][column]){
            return true;
        }

        //Check line
        if(this.array[line].includes(number)){
            alert("Position fail : \nThis number is already present on this line.");
            placeable=false;
        }
        //Check column
        for (var i = 0; i < this.array.length; i++) {
            if(this.array[i][column]==number){
                alert("Position fail : \nThis number is already present in this column.");
                placeable=false;
            }
        } 
        //Check square
        line = Math.floor(line/3) * 3;
        column =  Math.floor(column/3) * 3;
        for (var i = line; i < line+3; i++) {
            for (var j = column; j < column+3; j++) {
                if(this.array[i][j]==number){
                    alert("Position fail : \nThis number is already present in this square.");
                    return false;
                }              
            } 
        } 

        return placeable;
    }

}

let sudoku = new Sudoku();