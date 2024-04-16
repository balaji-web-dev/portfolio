import './styles.scss';

import { onValue } from 'firebase/database';
import React, { useEffect, useState } from 'react';

import { projectDbRef } from '../../firebase';
import { IMenuItems, IProject } from '../../interfaces';
import { Modal } from '../../components';

export const Projects: React.FC<{ dataMenu?: IMenuItems }> = ({ dataMenu }) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [projects, setProjects] = useState<IProject[]>();
    // const projects: IProject[] = [
    //     {
    //         url1: logo,
    //         url2: logo,
    //         url3: logo,
    //         name: 'PFRDA',
    //         description: `The purpose of this project is to build a module to be integrated into the existing website. It is proposed that this
    //                                     module is to have a portal for customers to file their appeals along with the necessary details and documents. In
    //                                     addition, this module will have an admin panel for the ombudsman to refer to the filed appeal and other related
    //                                     documents. The module scope of work includes Screening process Collection of necessary information and documents.
    //                                     Designed with good user experience and interactive interfaces using the HTML, CSS & JavaScript.`,
    //     },
    //     {
    //         url1: logo,
    //         url2: logo,
    //         url3: logo,
    //         name: 'Embarckle website',
    //         description: `In order to stay relevant and continue to attract customers, Embarckle would like to overhaul its website. The company
    //                       maintains a strong reputation and presence in industry and would like to grow its business. To accomplish this,
    //                       Embarckle needs a complete website redesign to outpace the competition. Designed with good user experience and
    //                       interactive interfaces using the React & Express framework.`,
    //     },
    //     {
    //         url1: logo,
    //         url2: logo,
    //         url3: logo,
    //         name: 'GYM apllication',
    //         description: `Gym Website is to manage the details of Gym, Trainer, Memeber, Facility, Fitness Class. It manages all the information
    //                       about Gym, Time Slot, Fitness Class, Gym. The project is totally built at administrative end and thus only the
    //                       administrator is guaranteed the access. The purpose of the project is to build an application program to reduce the
    //                       manual work for managing the Gym, Trainer, Time Slot, Memeber. It tracks all the details about the Memeber, Facility,
    //                       Fitness Class.. Designed with good user experience and interactive interfaces using the React framework.`,
    //     },
    //     {
    //         url1: logo,
    //         url2: logo,
    //         url3: logo,
    //         name: 'Insurance Analytics',
    //         description: `Insurance analytics project is a data analytics projects using the python language. Currently working on it. We are
    //                       analyzing the insurance companies' data and providing the data in a chart format like sales for the quarter and the
    //                       quarterly premium sales prediction.`,
    //     },
    //     {
    //         url1: logo,
    //         url2: logo,
    //         url3: logo,
    //         name: 'Agraryans',
    //         description: `The Agraryans is an application that involves linking service providers and consumers. Through this application, a
    //                       consumer can book a service and schedule required services at nearby locations. The main motive of this application is
    //                       to provide quality service providers along with a good user experience. Also, a vendor can register with this
    //                       application with their services allowed by Agraryans. Designed with good user experience and interactive interfaces
    //                       using the BootSrap & Django framework.`,
    //     },
    // ];

    useEffect(() => {
        const unSubscribe = onValue(projectDbRef, (snapshot: { val: () => Record<string, IProject> | null }) => {
            const dbData: Record<string, IProject> | null = snapshot.val();
            const data: IProject[] | null = dbData && Object.values(dbData);
            data && setProjects(data);
        });

        return () => unSubscribe();
    }, []);

    return (
        <>
            <div
                className='projects'
                id={dataMenu
                    ?.replace(/([a-z])([A-Z])/g, '$1-$2')
                    .replace(/[\s_]+/g, '-')
                    .toLowerCase()}
                data-menu={dataMenu}
            >
                <div className='project-list'>
                    <ul>
                        {projects?.map(({ projectName, imgUrl }, projectIndex) => (
                            <li key={`${projectName}`} className='first'>
                                <button
                                    onClick={() => setActiveIndex(projectIndex)}
                                    className={activeIndex === projectIndex ? 'active' : ''}
                                >
                                    <img className='project-list-img' alt='crypto' src={imgUrl}></img>
                                </button>
                            </li>
                        ))}
                        {projects?.map(({ projectName, imgUrl }, projectIndex) => (
                            <li key={`${projectName}`} className='first'>
                                <button
                                    onClick={() => setActiveIndex(projectIndex)}
                                    className={activeIndex === projectIndex ? 'active' : ''}
                                >
                                    <img className='project-list-img' alt='crypto' src={imgUrl}></img>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='project-preview'>
                    <div className='position-indicator'>
                        {activeIndex + 1} / {projects?.length}
                    </div>
                    <div className='project-img-first'>
                        <img alt='crypto' src={projects?.[activeIndex].imgUrl}></img>
                    </div>
                    <div className='project-img-second'>
                        <img alt='crypto' src={projects?.[activeIndex].imgUrl}></img>
                    </div>
                    <div className='project-img-third'>
                        <img alt='crypto' src={projects?.[activeIndex].imgUrl}></img>
                    </div>
                    <div className='slideshow-postion-indicator'>
                        {projects?.length === 0
                            ? 'Projects not found...!'
                            : projects?.map(({ projectName }, projectIndex) => (
                                  <button
                                      className={activeIndex === projectIndex ? 'active' : ''}
                                      key={`${projectName}-${projectIndex}`}
                                      onClick={() => setActiveIndex(projectIndex)}
                                  ></button>
                              ))}
                    </div>
                </div>
                <div className='project-description' key={activeIndex}>
                    <div className='section-title'>Projects</div>
                    <h2>{projects?.[activeIndex].projectName}</h2>
                    <p>{projects?.[activeIndex].projectDescription}</p>
                    <Modal.OpenButton>
                        <button className='plain-btn'>See More</button>
                    </Modal.OpenButton>
                </div>
            </div>
            <Modal.Dialog>
                <h2>{projects?.[activeIndex].projectName}</h2>
                <p>{projects?.[activeIndex].projectDescription}</p>
            </Modal.Dialog>
        </>
    );
};
