import { ReactNode } from 'react';

interface PageProps {
    params: {
        [key: string]: any;
    };
    searchParams?: any;
    children?: ReactNode;
}

interface BreadcrumbProps {
    label: string;
    url: string;
    icon?: string;
}

interface LoaderProps {
    label?: string;
    show?: boolean;
}

interface DividerProps {
    height?: number;
    color?: string;
    mx?: number;
    my?: number;
    px?: number;
    py?: number;
}

export type { PageProps, BreadcrumbProps, LoaderProps, DividerProps };
