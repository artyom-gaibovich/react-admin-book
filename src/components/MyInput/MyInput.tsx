import {forwardRef} from 'react';
import {MyInputProps} from "./MyInput.props.ts";
import styles from './MyInput.module.css'

import cn from "classnames";

const MyInput = forwardRef<HTMLInputElement, MyInputProps>(function MyInput({children, ...props}: MyInputProps, ref) {
    const {...otherProps} = props;
    return (
        <input {...otherProps} className={cn(styles['input'])} ref={ref}/>

    );
});

export default MyInput;
