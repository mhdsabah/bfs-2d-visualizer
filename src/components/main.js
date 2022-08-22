import React from "react";



export default function Main(){
    
    const [tableData,setTableData] = React.useState({
        Trow : "35",
        Tcol : "60",
        
    })

    // const [arrayData,setArraydata] = React.useState(Array(tableData.Trow).fill(Array(tableData.Tcol).fill(0)))
    const [arrayData,setArraydata] = React.useState(Array.from({length:tableData.Trow},()=>Array.from({length: tableData.Tcol},() => 0)))
    const [startActive,setStart] = React.useState({
        isactive :false,
        xval : "",
        yval : ""

    });
    const [endActive,setEnd] = React.useState({
        isEnd : false,
        xend : "",
        yend : ""
    })



    function handleChange (event){
        const {name, value} = event.target
        // console.log(value)
        if (value === ""){
            setTableData(prevdata => ({
                ...prevdata,
                [name] : 0
            }))
        }        
        else  {
            setTableData(prevdata => ({
                ...prevdata,
                [name] : parseInt(value)
                
            }))
        }


    }

    function handleDiv(event){

        // console.log(event.target.getAttribute("style"))
        let v = event.target.getAttribute("data-index").split(",").map(x => x)
        // console.log(v)
        let x = parseInt(v[0])
        let y = parseInt(v[1])
        let k = [...arrayData]
        
        if (!startActive.isactive){
            setStart(prev => ({
                ...prev,
                isactive : true,
                xval : x,
                yval : y
            }
            ))
            k[x][y] = 100
            
        }

        if (startActive.isactive && !endActive.isactive){

            setEnd(prev => ({
                ...prev,
                isactive : true,
                xend : x,
                yend : y

            }))
            k[x][y]  = 200
        }

        
        
        setArraydata(k)
        

    }

    function handleArray(){

        // console.log("sadf")
        let jj = Array.from({length:tableData.Trow},()=>Array.from({length: tableData.Tcol},() => 0))
        setArraydata(jj)
        setStart({
            isactive :false,
            xval : "",
            yval : ""
    
        })
        setEnd({
            isEnd : false,
            xend : "",
            yend : ""
        })
        // console.log(typeof(arrayData))


    }

    function getBackgroundColor(x,y){
        let k  = [...arrayData]
        // console.log(x,y)
        if (k[x][y] == 100) return "#FF6464"
        if (k[x][y] == 200) return "#398AB9"
        if (k[x][y] == -1 )return "#FFE162"
        if (k[x][y] == -5) return "#9772FB"
        return "#91C483"

    }
    
    function bfs(){
        let x1 = startActive.xval
        let y1 = startActive.yval
        let x2 = endActive.xend
        let y2 = endActive.yend

        let path = new Map()

        let arr = [...arrayData]
        var stack = []
        
        stack.push([x1,y1,x1,y1])
        while (stack.length != 0){
            let temp = stack.shift()
            let i = temp[0]
            let j = temp[1]
            let pi = temp[2]
            let pj = temp[3]

            if (i == x2 && j == y2) {
                path[[x2,y2]] = [pi,pj]
                pathTrace(path,x1,y1,x2,y2)
                break}
            if (i<tableData.Trow && i>=0 && j<tableData.Tcol && j>=0 && arr[i][j] != -1  ){
                
                // console.log(temp[0],temp[1])
                stack.push([i+1,j,i,j])
                stack.push([i-1,j,i,j])
                stack.push([i,j+1,i,j])
                stack.push([i,j-1,i,j])
                stack.push([i+1,j+1,i,j])
                stack.push([i-1,j-1,i,j])
                stack.push([i-1,j+1,i,j])
                stack.push([i+1,j-1,i,j])
                
                arr[i][j] = -1
                setArraydata(arr)
                path[[i,j]] = [pi,pj]
            }


        }
        arr[x1][y1] = 100
        setArraydata(arr)

        // console.log(path)



    }


    function pathTrace(path,x1,y1,x2,y2){
        
        
        let arr = [...arrayData]
        let tx = x2
        let ty = y2
        let n = 0
        
        while(n++<tableData.Tcol*tableData.Trow){
            let v = path[[tx,ty]]
            arr[v[0]][v[1]] = -5
            tx = v[0]
            ty = v[1]
            setArraydata(arr)
            if (tx == x1 && ty == y1){break}
            
            
        }
        // 

        // console.log(arr)


    }




    
    const rendOp = arrayData.map(function(item,index){
         
         return (<div key ={index} className = "a">{item.map(function(item2,index2){
            // console.log(index,index2)
            // console.log("render")
            return(<div key = {index2} 
                className="a1" 
                onClick={handleDiv} 
                data-index ={[index,index2]} //value passed is a string
                style = {{
                    background:getBackgroundColor(index,index2),
                    // transition: "all 2s ease",
                    // WebkitTransition: "all 2s ease",
                    // MozTransition: "all 2s ease"
                }}
                
                >{}</div>)
         })}</div>)
        })

    // const rendOp = arrayData.map(x=> <div className="a">{x.map(y=> <div className="a1" onClick={handleDiv}>{}</div> )}</div>)


    return(
        <main className="main">
            <div className="inputs-and-buttons">

            <input type = "text"
            placeholder="Enter number of rows"
            name = "Trow"
            value = {tableData.Trow}
            onChange = {handleChange}
            ></input>
            
            <input type = "text"
            placeholder="Enter number of columns"
            name = "Tcol"
            value = {tableData.Tcol}
            onChange = {handleChange}
            ></input>
            <button id="button2"
            onClick={handleArray}
            >Generate Matrix</button>
            
            <button id ="dfs" 
            onClick={bfs}
            >BFS</button>
            <p> Click on squares to set start and ending coordinates, then click the BFS 
                button to generate the path.
            </p></div>
            <div className="wrapper">{rendOp}</div>
        </main>
    )
}