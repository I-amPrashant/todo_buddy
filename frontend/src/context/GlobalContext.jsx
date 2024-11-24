import { useState, createContext } from "react";

// Create a context 
export const GlobalContext = createContext();

// Create a provider
export const GlobalProvider = ({ children }) => {
    const [taskName, setTaskName] = useState('');
    const [taskDeadline, setTaskDeadline] = useState('');
    const [taskImportance, setTaskImportance] = useState('');

    return (
        <GlobalContext.Provider value={{    
            taskName, 
            setTaskName, 
            taskDeadline, 
            setTaskDeadline, 
            taskImportance, 
            setTaskImportance
        }}>
            {children}
        </GlobalContext.Provider>
    );
};
