export enum EFormAction {
    NEW = 'NEW',
    READONLY = 'READONLY',
    EDIT = 'EDIT',
}

export interface INewFormAction {
    type: EFormAction.NEW;
}
export interface IReadOnlyFormAction {
    type: EFormAction.READONLY;
}
export interface IEditFormAction {
    type: EFormAction.EDIT;
}

export interface IProject {
    projectName: string;
    projectDescription: string;
    imgUrl: string;
    info: (INewFormAction | IEditFormAction | IReadOnlyFormAction) & {
        key: string;
    };
}

export type IFormAction = INewFormAction | IReadOnlyFormAction | IEditFormAction;
