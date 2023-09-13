import './styles.scss';

import { off, onChildChanged, onValue, push, update } from 'firebase/database';
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

import { projectDbRef } from '../../../firebase';
import { EFormAction, IEditFormAction, IFormAction, INewFormAction, IProject, IReadOnlyFormAction } from '../../../interfaces';

const newFormAction: INewFormAction = { type: EFormAction.NEW };
const readOnlyFormAction: IReadOnlyFormAction = { type: EFormAction.READONLY };
const editFormAction: IEditFormAction = { type: EFormAction.EDIT };

export const ProjectDetails: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    const newVal: IProject = {
        info: {
            ...newFormAction,
            key: 'default-key',
        },
        projectName: '',
        projectDescription: '',
        imgUrl: '',
    };
    const [formData, setFormData] = useState<IProject[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [formAction, setFormAction] = useState<IFormAction>(readOnlyFormAction);

    const handleFormData = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, dataIndex: number) => {
        console.log('inside iput change');

        setFormData((prev) => {
            prev[dataIndex][e.target.name as Exclude<keyof IProject, 'info'>] = e.target.value;

            return [...prev];
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let filterdData: IProject[], submitForm: (data: IProject) => Promise<void>;

        switch (formAction.type) {
            case EFormAction.NEW:
                filterdData = formData.filter(({ info }) => info && info.type === EFormAction.NEW);
                submitForm = async (data) => {
                    const key = push(projectDbRef).key;
                    return await update(projectDbRef, {
                        [key as string]: { ...data, info: { ...data.info, ...readOnlyFormAction, key } },
                    });
                };
                break;
            case EFormAction.EDIT:
                filterdData = formData.filter(({ info }) => info && info.type === EFormAction.EDIT);
                submitForm = async ({ info, ...data }) => {
                    info.type === EFormAction.EDIT &&
                        (await update(projectDbRef, {
                            [info.key]: {
                                ...data,
                                info: {
                                    ...info,
                                    ...readOnlyFormAction,
                                },
                            },
                        }));
                };
                break;
            default:
                alert('Wrong Selection');
                filterdData = formData;
                break;
        }

        formAction.type !== EFormAction.READONLY &&
            Promise.all(filterdData?.map(async (eachData) => await submitForm?.(eachData))).then((res) => {
                console.log('Result: ' + res);
            });

        console.table(filterdData);
    };

    const handleDelete = async () => {
        const deletingStruc = selectedKeys.reduce((acc, key) => {
            return { ...acc, [key]: null };
        }, {});
        await update(projectDbRef, deletingStruc).then(() =>
            setFormData((prev) => prev.filter((data) => !selectedKeys.includes(data.info?.key || '')))
        );
    };

    const handleEdit = () => {
        if (selectedKeys.length) {
            setFormAction(editFormAction);
            setFormData((prev) =>
                prev.map((data) =>
                    !selectedKeys.includes(data.info?.key || '') ? data : { ...data, info: { ...data.info, type: EFormAction.EDIT } }
                )
            );
        }
    };

    const handleSelection = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, eachDataIndex: number) =>
        (formAction.type === EFormAction.READONLY ||
            (formAction.type !== EFormAction.NEW && e.target instanceof HTMLDivElement && e.target.className === 'form-item')) &&
        setSelectedKeys((prev) => {
            const key = formData[eachDataIndex].info.key;
            const keyIndex = prev.findIndex((prevKey) => prevKey === key);
            return keyIndex === -1 ? [...prev, key] : [...prev.slice(0, keyIndex), ...prev.slice(keyIndex + 1)];
        });

    const handleCancel = () => {
        switch (formAction.type) {
            case EFormAction.NEW:
                setFormData((prev) => prev.filter((data) => data.info?.type !== EFormAction.NEW));

                break;

            case EFormAction.EDIT:
                setFormData((prev) => prev.map((data) => ({ ...data, info: { ...data.info, type: EFormAction.READONLY } })));

                break;
        }
        setSelectedKeys([]);
        setFormAction(readOnlyFormAction);
    };

    const handleImgDrop = (e: React.DragEvent<HTMLDivElement>, dataIndex: number) => {
        e.preventDefault();
        e.stopPropagation();
        if (fileInputRef?.current) fileInputRef.current.files = e.dataTransfer.files;
        console.log(fileInputRef.current, e.dataTransfer.files[0].name, fileInputRef?.current?.files && fileInputRef?.current?.value);
        if (fileInputRef?.current?.value && e.target instanceof HTMLDivElement) {
            e.target.innerHTML = 'File Dropped Successfully!';
            e.target.style.display = 'none';
            if (imgRef?.current) imgRef.current.setAttribute('class', 'active');
            const reader = new FileReader();
            reader.onload = function (e) {
                setFormData((prev) => {
                    prev[dataIndex].imgUrl = (e?.target?.result as string) || '';
                    return [...prev];
                });
            };

            reader.readAsDataURL(e.dataTransfer.files[0]);
        }
    };

    const saveDbData = (snapshot: { val: () => Record<string, IProject> | null }) => {
        setFormAction(readOnlyFormAction);
        setSelectedKeys([]);

        const dbData: Record<string, IProject> | null = snapshot.val();
        const data: IProject[] | null = dbData && Object.values(dbData);
        data && setFormData(data);
    };

    useEffect(() => {
        const valueUnSubscribe = onValue(projectDbRef, saveDbData);

        const childChangedunSubscribe = onChildChanged(projectDbRef, saveDbData);

        return () => {
            off(projectDbRef);
            valueUnSubscribe();
            childChangedunSubscribe();
        };
    }, []);

    return (
        <div className='edit-project-details'>
            <div className='form-action'>
                {formAction.type !== EFormAction.EDIT ? (
                    <button
                        onClick={() => {
                            setFormAction(newFormAction);
                            setFormData((prev) => [...prev, newVal]);
                        }}
                    >
                        Add Project
                    </button>
                ) : null}
                {formData.length && formAction.type !== EFormAction.NEW ? (
                    <>
                        <button onClick={handleEdit}>Edit Project</button>
                        <button onClick={handleDelete}>Delete Project</button>
                    </>
                ) : null}
                {formAction.type !== EFormAction.READONLY ? <button onClick={handleCancel}>Cancel</button> : null}
            </div>

            <form className='project-details-form' onSubmit={handleSubmit}>
                {(formData.length &&
                    formData?.map((eachData, eachDataIndex) => (
                        <div
                            className={formAction.type !== eachData.info.type ? 'form-item disabled' : 'form-item'}
                            key={'form-item-' + eachData.info.key}
                            onClick={(e) => handleSelection(e, eachDataIndex)}
                        >
                            {formAction.type !== EFormAction.READONLY && formAction.type === eachData.info.type && (
                                <div
                                    className='drag-drop'
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        if (e.target instanceof HTMLDivElement) e.target.innerHTML = 'Drop your file here!';
                                    }}
                                    onDrop={(e) => handleImgDrop(e, eachDataIndex)}
                                >
                                    <input
                                        type='file'
                                        name='imgUrl'
                                        ref={fileInputRef}
                                        className='project-img'
                                        id={'project-img' + eachDataIndex}
                                    />
                                    Drag & drop Project image here
                                </div>
                            )}

                            <input
                                type='checkbox'
                                name='isSelected'
                                key={'check-' + eachDataIndex}
                                checked={selectedKeys.includes(eachData.info?.key || '')}
                                readOnly={formAction.type === EFormAction.READONLY}
                                onChange={(e) => handleFormData(e, eachDataIndex)}
                            />
                            <img
                                className={formAction.type !== EFormAction.NEW ? 'active' : ''}
                                src={eachData.imgUrl}
                                ref={imgRef}
                                alt='Preview Img'
                            />

                            <label htmlFor={'project-name' + eachDataIndex}>Project Name</label>
                            <input
                                type='text'
                                name='projectName'
                                className='project-name'
                                id={'project-name' + eachDataIndex}
                                value={eachData.projectName}
                                readOnly={formAction.type === EFormAction.READONLY}
                                onChange={(e) => handleFormData(e, eachDataIndex)}
                            />
                            <label htmlFor={'project-description' + eachDataIndex}>Project Description</label>
                            <textarea
                                name='projectDescription'
                                className='project-description'
                                id={'project-description' + eachDataIndex}
                                value={eachData.projectDescription}
                                readOnly={formAction.type === EFormAction.READONLY}
                                onChange={(e) => handleFormData(e, eachDataIndex)}
                            />
                        </div>
                    ))) || <h1 className='no-projects'>Click Add Project button to add new projects</h1>}

                <button className='submit' type='submit' disabled={formAction.type === EFormAction.READONLY}>
                    Submit
                </button>
            </form>
        </div>
    );
};
