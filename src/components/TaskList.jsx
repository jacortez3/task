// TaskList.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TaskList = ({ supabase }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        let { data: tasks, error } = await supabase
          .from('tasks')
          .select('*')
          .order('id', { ascending: true });

        if (error) {
          throw error;
        }

        setTasks(tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
      }
    }

    fetchTasks();
  }, [supabase]);

  async function deleteTask(id) {
    try {
      await supabase.from('tasks').delete().eq('id', id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error.message);
    }
  }

  async function updateTask(id) {
    try {
      const { data: task, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      }

      const newTitle = prompt('Enter new task title', task.title);
      if (!newTitle.trim()) return;

      const { error: updateError } = await supabase
        .from('tasks')
        .update({ title: newTitle })
        .eq('id', id);

      if (updateError) {
        throw updateError;
      }

      setTasks(
        tasks.map((task) => (task.id === id ? { ...task, title: newTitle } : task))
      );
    } catch (error) {
      console.error('Error updating task:', error.message);
    }
  }
  

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <button onClick={() => updateTask(task.id)}>Actualizar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

TaskList.propTypes = {
  supabase: PropTypes.object.isRequired,
};

export default TaskList;
