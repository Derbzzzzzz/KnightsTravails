// Basic Queue to implement BFS (some fxns unused)
class Queue {
    constructor() {
      this.elements = {};
      this.head = 0;
      this.tail = 0;
    }
    enqueue(element) {
      this.elements[this.tail] = element;
      this.tail++;
    }
    dequeue() {
      const item = this.elements[this.head];
      delete this.elements[this.head];
      this.head++;
      return item;
    }
    peek() {
      return this.elements[this.head];
    }
    get length() {
      return this.tail - this.head;
    }
    get isEmpty() {
      return this.length === 0;
    }
}

function checkCoord(coord){
    return coord[0] >= 0 && coord[0] < 8 && coord[1] >= 0 && coord[1] < 8;
}


class Node{
    constructor(loc, parent = null){
        this.loc = loc
        this.parent = parent
        this.children = []
    }

    // populates children member of Node with up to 8 new nodes.
    getChildren(){
        let x = this.loc[0]
        let y = this.loc[1]

        let arr = []

        arr.push([x - 2, y - 1])
        arr.push([x - 2, y + 1])
        arr.push([x + 2, y - 1])
        arr.push([x + 2, y + 1])
        arr.push([x - 1, y - 2])
        arr.push([x - 1, y + 2])
        arr.push([x + 1, y - 2])
        arr.push([x + 1, y + 2])
        
        // Filters out invalid coordinates
        arr = arr.filter(coord => checkCoord(coord))

        // Coordinates changed into nodes
        this.children = arr.map(arr => new Node(arr, this)) 
    }

    // Checks Children nodes to see if target was found
    checkChildren(target){

        // Checks if two arrays are equal (order matters)
        function arrEqual(a, b){
            for (let i = 0; i < a.length; i++) {
                if(a[i] !== b[i]) return false;
            }
            return true;
        }

        let arr = this.children

        // For Loop returns if one child is equal to target
        for(let i = 0; i < arr.length; i++){
            let element = arr[i].loc

            if(arrEqual(element, target)){
                return true
            }
        }

        return false
    }

    // Geneates Path back to start
    generatePath(end){
        let node = this
        let path = [end, node.loc]

        // Pushes parent locations until there are no more parents
        while(node.parent !== null){
            node = node.parent
            path.push(node.loc)
        }

        // Reverse Path to have path in the right order
        return path.reverse()

    }
}


// Primary Function, returns quickest path between two squares on board
function quickestPath(start, end){

    // Checks to see if start and end coords are valid
    if(!checkCoord(start) || !checkCoord(end)){
        return false
    }

    // Initializing BFS queue with starting Node.
    let startNode = new Node(start)
    startNode.getChildren()
    let q = new Queue()
    q.enqueue(startNode)

    // Loop until end coord found
    while(1){
        let node = q.dequeue()
        node.getChildren()

        // End function if end is found among children
        if(node.checkChildren(end)){
            return node.generatePath(end)
        }

        // Enqueue children
        node.children.forEach(element => {
            q.enqueue(element)
        });
    }

    // I need to see if end is contained in children
    // If so I return
    // If not I add to end of array the nodes children
    // Then continue the loop
}

function pathPrint(path){
    console.log("You made it in " + (path.length - 1) + " moves! Here's your path: ")

    for (let i = 0; i < path.length; i++) {
        console.log("[" + path[i][0] + ","  + path[i][1] + "]")
        
    }
}

pathPrint(quickestPath([7, 7], [0, 0]))

// console.log(myNode)
