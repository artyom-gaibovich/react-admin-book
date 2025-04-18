import styles from './Button.module.css'
import {ButtonProps} from "./Button.props.ts";
import cn from "classnames";

function Button({children, className, appearance, ...props}: ButtonProps) {

    return (
        <button className={(cn(styles['button'], styles['accenet'], className, {
            [styles['appearance']]: appearance === 'big',
            [styles['appearance']]: appearance === 'small',
        }))} {...props}>{children}</button>
    )
}

export default Button
