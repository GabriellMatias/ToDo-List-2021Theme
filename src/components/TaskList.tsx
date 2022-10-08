import { FormEvent, useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask(event:FormEvent) {
    event.preventDefault();
    const newTask = ([
      ...tasks, {
        id:Math.floor(Math.random() *100),
        title: newTaskTitle,
        isComplete: false
      }
    ])
    setTasks(newTask);
    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    const completedTasks = tasks.map(task =>{
      if (task.id === id){
        return{
          ...task, isComplete: !task.isComplete
        }
      }
      return task /* percorre as tarefas, aquela que tiver o ID IGUAL 
      a selecionada ele pega o isCOmplete e muda para False caso esteja true e 
      vise versa*/
    })
    setTasks(completedTasks)
  }

  function handleRemoveTask(id: number) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.id !== id
    }) /*filtra as tarefas e retorna apenas aquelas que tem o ID DIFERENTE
    da selecionada para exclusao*/
    setTasks(tasksWithoutDeletedOne)
  }
  const isNewTaskEmpty = newTaskTitle.length === 0;

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask} disabled={isNewTaskEmpty}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}