import style from './Header.module.css'

import todoLogo from '../assets/todoLogo.svg'

export function Header(){
    return(
        <h1 className={style.header}>
            <img src={todoLogo} alt="Logo-Todo" />
        </h1>
    )
}