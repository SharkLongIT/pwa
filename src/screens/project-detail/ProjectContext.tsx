// ProjectContext.tsx
import React, { createContext, useContext } from 'react';

const ProjectContext = createContext<any>(null);

export const ProjectProvider = ({ value, children }: any) => {
    return (
        <ProjectContext.Provider value={value}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProject = () => useContext(ProjectContext);