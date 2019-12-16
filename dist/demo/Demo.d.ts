import React from 'react';
interface Props {
    title: string;
    code: React.ReactNode;
    children: React.ReactNode;
}
export default function Demo({ title, code, children }: Props): JSX.Element;
export {};
