import Navbar from "./components/Navbar"
import { useState ,useEffect,react } from "react"

function App() {
   const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
     const [showFinished, setshowFinished] = useState(true);
     useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])

    const saveToLS=()=>{
      localStorage.setItem('todos',JSON.stringify(todos))
      //This stores a value in the browser's localStorage with the key "todos"
      // todos is probably an array or object (like a list of to-do items).

      // localStorage can only store strings, so JSON.stringify converts the todos array/object into a string
    }
    const toogleFinished=()=>{
      setshowFinished(!showFinished);
    }

   const handleAdd=()=>{
    //now i will add that todo to todos which is an array
    setTodos([...todos,{id:todo,todo,isCompleted:false}]);
    setTodo('');
    saveToLS();
   }


   const handleChange=(e)=>{
    setTodo(e.target.value);
    //what the user just typed
   }
   const handleCheckbox=(e)=>{
    let id=e.target.name;
    let index=todos.findIndex(item=>{
      return item.id=== id;

    });
    let newTodos=[...todos];
    newTodos[index].isCompleted=!newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();

   }
    const handleEdit = (e, id)=>{ 
    let t = todos.filter(i=>i.id === id) 
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLS()
  }

  const handleDelete= (e, id)=>{  
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLS()
  }

  return (
    <>
     
      <Navbar/>
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[45%]">
        <h1 className="text-center font-bold text-3xl">Manage all your task in one place!</h1>
        <div className="my-5  flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Add a Todo</h2>
          <div className="flex">
             <input  onChange={handleChange} id="input 1" value={todo} type="text" className='w-[80%] bg-violet-200 rounded-full px-5 py-1' />
            <button onClick={handleAdd} disabled={todo.length<=3} className="bg-violet-500 text-xl hover:text-white transition-all  rounded-xl p-2 mx-4 hover:bg-violet-600 hover:font-bold">add</button>
            

            {/* disabled till the length of todo is greater than 4 */}

          </div>
        </div>
        <input type="checkbox" checked={showFinished} onChange={toogleFinished} className="bg-violet-200 my-4" id="show"  />
        <label className="mx-2"htmlFor="show">showFinished</label>
         <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
         <h2 className='text-2xl font-bold'>Your Todos</h2>
         <div>
          {todos.length==0 && <div className=" m-5">Nothing to show right now</div>}
          {todos.map(item=>{
            return (!item.isCompleted||showFinished) && <div id="item.id" className="flex my-3 justify-between">
              <div className='flex gap-5'>
                <input 
                type="checkbox"
                checked={item.isCompleted}
                name={item.id}
                onChange={handleCheckbox} 
                id=""/>
                <div className={`${item.isCompleted?"line-through":""}`}>{item.todo}</div>
              </div>
              <div className="flex buttons">
                <button  onClick={(e)=>handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>edit</button>
                <button  onClick={(e)=>handleDelete(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'> delete</button>
              </div>
            </div>
          })}
         </div>
      </div>
      
    </>
  )
}

export default App
