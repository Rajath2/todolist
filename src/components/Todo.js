import React from "react";

class Todos extends React.Component{
    //we use this type of syntax to construct 
    state={
        inputValue:"",
        editTodo:{},
        date: new Date(),
        todosList:localStorage.getItem('todos') ? JSON.parse (localStorage.getItem('todos')):[],

      }

    //in new react we dont use this type of constructor
    /*constructor(props){
        super(props);
        this.state ={
            inputValue:"",
            todosList:[]
        }
    }*/

    handleChange =(e)=> {
        this.setState({
            inputValue:e.target.value
        })
    }
    addTodo =(e)=>{
        e.preventDefault();
        if(this.state.inputValue){
            // clone old todo list in a value
            const todos =[...this.state.todosList]
            // add new todo list to cloned variable
            todos.push({
                id: Date.now(),
                value: this.state.inputValue,
                isDone: false
            })
            // change old todo to new todo list
            this.setState({
                inputValue:"", 
                todosList:todos
            })
            //save todo list in local storage
            localStorage.setItem("todos",JSON.stringify(todos))
        }
        else{
            alert("please add text")
        }
    }
    deleteTodo =(deleteItems) =>{
        console.log(deleteItems);
        let todos = [...this.state.todosList]
        todos= todos.filter((todo) =>{
            return todo.id !== deleteItems.id
        })
        this.setState({ 
            todosList:todos
        })
        //save todo list in local storage
        localStorage.setItem("todos",JSON.stringify(todos))
    }
    deleteAll =() =>{
        this.setState({ 
            todosList:[]
        })
        //save todo list in local storage
        localStorage.setItem("todos",JSON.stringify([]))
    }
    handelTodoDone = (doneTodo) =>{
        //console.log(deleteItems);
        let todos = [...this.state.todosList]
        todos= todos.filter((todo) =>{
            if(todo.id === doneTodo.id)
            {
                todo.isDone = !todo.isDone
            }
            return todo 
        })
        /*this.setState({ 
            todosList:todos
        })
        //save todo list in local storage
        localStorage.setItem("todos",JSON.stringify(todos))*/
    }
    editTodoClick = (todo)=>{
        this.setState({
            editTodo:todo
        })
    }
    editTodo=(editTodo)=>{
        let todos = [...this.state.todosList]
        todos= todos.filter((todo) =>{
            if(todo.id === editTodo.id)
            {
                todo.value = editTodo.value
            }
            return todo 
        })
        this.setState({ 
            todosList:todos
        })
        //save todo list in local storage
        localStorage.setItem("todos",JSON.stringify(todos))
    }
    getDate=()=> {
        var date = { currentTime: new Date().toLocaleString() };
    
        this.setState({
          date: date
        });
      }
    render(){
        console.log(this.state.todosList)
        return( 
            <>
            {/*BELOW FOR CREATING TODOLIST*/}
            <form onSubmit={this.addTodo}>
                <div className="input-group mb-3">
                    <input type="text" className="form-control mr-3"
                     placeholder="Add todo" onChange={this.handleChange}
                     value={this.state.inputValue}/>

                    <div className="input-group-append">
                        <button className="btn btn-success" type="submit">Add TodoList</button>
                    </div>
                </div>
            </form>

            {/*example*/}
            <table className="table" style={{border:'groove'}}>
                <tbody >
                            <td width={100}>sr.no</td>
                            <td width={200} style={{textAlign:'center'}}>Date</td>
                            <td width={130} style={{textAlign:'center'}}> Check box</td>
                            <td></td>
     
                </tbody>
            </table>



            {/*BELOW CODE FOR CREATING TODOLIST*/}
            <table className="table">
                <tbody>
                    {this.state.todosList.map((todo,index)=>(
                        <tr key={todo.id}>
                            <td width={100}>{index+1}</td>
                            <td style={{textAlign:'center'}}>{this.state.date.toLocaleDateString()}</td>
                            <td style={{textAlign:'center'}}>
                                <input type="checkbox" width={1000}
                                defaultChecked={todo.isDone}
                                onClick={this.handelTodoDone(todo)}/>
                            </td>
                            <td style={{textAlign:'center'}}>{todo.value}</td>
                            <td style={{textAlign:'center'}}>
                                <button 
                                className="btn btn-danger"
                                onClick={()=> this.deleteTodo(todo)}>
                                    Deleat</button>

                            </td>
                            
                            <td style={{textAlign:"center"}}>
                                <button 
                                className="btn btn-warning  tect-aligncenter"
                                data-bs-toggle='modal'
                                data-bs-target='#exampleModal'
                                type="button"
                                onClick={()=>this.editTodoClick(todo)}>
                                    Edit</button>

                            </td>

                            

                        </tr>

                    ))}
                        <button className="btn btn-danger"
                        onClick={() => this.deleteAll([])}>deleteAll</button>
                </tbody>
            </table>

<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-bs-dismiss="modal">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <label htmlFor='recipient-name' className="col-mb">
                value:
        </label>
        {this.state.editTodo?.value && (
            <input 
            type='text'
            className='form-control'
            value={this.state.editTodo.value}
            onChange={e=>
            this.setState({
                ...this.state,
                editTodo:{
                    ...this.state.editTodo,
                    value: e.target.value,
                },
            })
            }>    
            </input>
        )
        }
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={e => {
            e.preventDefault();
            this.editTodo(this.state.editTodo);
        }}>Save changes</button>
      </div>
    </div>
  </div>
</div>
            </>
        )
    }

}

export default Todos;