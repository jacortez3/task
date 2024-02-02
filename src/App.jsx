// App.jsx
import { createClient } from '@supabase/supabase-js';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './index.css';

// Configurar el cliente Supabase
const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const App = () => {
  return (
    <div>
      
      <h1>Task Manager</h1>
      <TaskForm supabase={supabase} />
      <TaskList supabase={supabase} />
    </div>
  );
};

export default App;
