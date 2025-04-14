import {InputHTMLAttributes, ReactNode} from "react";

export interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {
    children?: ReactNode;
}