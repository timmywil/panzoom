/// <reference types="react" />
import 'prismjs/themes/prism-tomorrow.css';
interface Props {
    language?: string;
    children: string;
}
export default function Code({ children, language }: Props): JSX.Element;
export {};
