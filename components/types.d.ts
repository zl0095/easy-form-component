export interface ChildrenArr {
    label: string;
    delete?: boolean;
    children?: ChildrenArr[];
}

export interface RadioConfigurationOptions {
    id: number;
    label: string;
    maxLength?: number;
    placeholder?: string;
}

export interface CheckConfigurationOptions {
    id: number;
    label: string;
    placeholder?: string;
    maxLength?: number;
    disabled?: boolean;
}

export interface PullDownConfigurationOptions {
    id: number;
    label: string;
    maxLength?: number;
    placeholder: string;
}

export interface MultiplePullDownConfigurationOptions {
    title: string;
    disposition: ChildrenArr[];
}

export interface UploadImageConfigurationOptions {
    title: string;
    maxCount?: number | string;
    drag: boolean;
}

export interface SortConfigurationOptions {
    id: number;
    label: string;
    maxLength?: number;
    placeholder?: string;
}
