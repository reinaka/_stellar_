import { ReactNode } from "react";

export type TModal = {
    onClose : () => void,
    title? : string,
    children? : ReactNode,
};