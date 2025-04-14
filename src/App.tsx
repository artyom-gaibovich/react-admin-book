import './App.module.css'
import styles from "./App.module.css";
import {useState, MouseEvent} from "react";
import LoginForm from "./components/LoginForm/LoginForm.tsx";
import cn from "classnames";

function App() {
    const [counter, setCounter] = useState<number>(0);


    const addCounter = (e: MouseEvent) => {
        console.log(e)
    }

    return (
        <div className={cn(styles['app'])}>
            <h1>
                Вход
            </h1>
            <LoginForm></LoginForm>
            <p>
                Нет аккаунта ?
            </p>
            <a href="#">
                Зарегестрироваться
            </a>
        </div>
    )
}

export default App
