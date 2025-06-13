export interface ChildrenArr {
    label: string;
    delete?: boolean;
    children?: ChildrenArr[];
}

export interface RadioConfigurationOptions {
    id: number;
    label: string;
}

export interface CheckConfigurationOptions {
    id: number,
    label: string;
    disabled?: boolean;
    checked?: boolean
}

export interface PullDownConfigurationOptions {
    id: number;
    label: string;
    disabled: boolean
}

export interface MultiplePullDownConfigurationOptions {
    title: string;
    options: ChildrenArr[];
    required: boolean;
    error: string;
    placeholder:string
}

export interface UploadImageConfigurationOptions {
    title: string;
    maxCount?: number | string;
    drag: boolean;
    multiple: boolean;
    required: boolean;
    error: string
}

export interface SortConfigurationOptions {
    id: number;
    label: string;
}
