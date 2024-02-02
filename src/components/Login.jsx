import { createClient } from "@supabase/supabase-js";

function Login() {  
    const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_ANON_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);
    return (
        <div>
        <h1>Login</h1>
        <form>
            <input type="text" placeholder="Enter your email" />
            <input type="password" placeholder="Enter your password" />
            <button type="submit">Login</button>
        </form>
        </div>
    );
    }
    export default Login;

function logout() {
    return (
        <div>
        <h1>Logout</h1>
        <button type="submit">Logout</button>
        </div>
    );
    }