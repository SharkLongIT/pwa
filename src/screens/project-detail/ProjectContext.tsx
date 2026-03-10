// // ProjectContext.tsx
// import React, { createContext, useContext, useEffect, useState } from 'react';
// import projectFe from '~/api/projectType.api';

// const ProjectContext = createContext<any>(null);

// // export const ProjectProvider = ({ value, children }: any) => {
// //     return (
// //         <ProjectContext.Provider value={value}>
// //             {children}
// //         </ProjectContext.Provider>
// //     );
// // };

// export const ProjectProvider = ({ value, children }: any) => {

//     const [project, setProject] = useState<any>(value);
//     useEffect(() => {
//         setProject(value);
//     }, [value]);
//     const reloadProject = async () => {

//         if (!project?.id) return;

//         const res = await projectFe.getProjectDetail(project.id);
//         console.log(res)
//         setProject(res.data.result);

//     };

//     return (

//         <ProjectContext.Provider value={{ project, reloadProject }}>
//             {children}
//         </ProjectContext.Provider>

//     );

// };
// export const useProject = () => useContext(ProjectContext);
import React, { createContext, useContext, useEffect, useState } from "react";
import projectFe from "~/api/projectType.api";

const ProjectContext = createContext<any>(null);

export const ProjectProvider = ({ value, children }: any) => {

    const [project, setProject] = useState<any>(value);

    useEffect(() => {
        setProject(value);
    }, [value]);

    const reloadProject = async () => {

        if (!project?.id) return;

        const res = await projectFe.getProjectDetail(project.id);

        setProject(res.data.result);

    };

    return (

        <ProjectContext.Provider value={{ project, reloadProject }}>
            {children}
        </ProjectContext.Provider>

    );

};

export const useProject = () => useContext(ProjectContext);