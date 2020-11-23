import React, { useContext, useEffect } from 'react';
import Project from './Project.jsx';
import ProjectContext from '../../context/projects/projectContext.jsx';

const ProjectList = () => {
    
    const projectState = useContext(ProjectContext);
    const {projects, getProjects} = projectState;

    useEffect( () => {
        getProjects();
    },[]);

    if (projects.length === 0) return <p>no projects</p>;
    
    return ( 
        <ul className="listado-proyectos">
            {
                projects.map(project => (
                    <Project 
                        key={project.id}
                        project={project}
                    />
                ))
            }
        </ul>
     );
}
 
export default ProjectList;