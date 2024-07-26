import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ProviderDataContextType {
    providerData: string | null;
    setProviderData: React.Dispatch<React.SetStateAction<string | null>>;
}

const ProviderDataContext = createContext<ProviderDataContextType | null>(null);

interface ProviderDataProviderProps {
    children: ReactNode;
}

export const ProviderDataProvider = ({ children }: ProviderDataProviderProps) => {
    const [providerData, setProviderData] = useState<string | null>(null);

    return (
        <ProviderDataContext.Provider value={{ providerData, setProviderData }}>
            {children}
        </ProviderDataContext.Provider>
    );
};

export const useProviderData = () => {
    const context = useContext(ProviderDataContext);
    if (!context) {
        throw new Error('useProviderData must be used within a ProviderDataProvider');
    }
    return context;
};
