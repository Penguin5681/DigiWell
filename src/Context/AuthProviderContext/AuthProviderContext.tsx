import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthProviderContextProps {
	authProvider: string;
	setAuthProvider: (provider: string) => void;
}

const AuthProviderContext = createContext<AuthProviderContextProps | undefined>(undefined);

export const AuthProviderProvider = ({ children }: { children: ReactNode }) => {
	const [authProvider, setAuthProvider] = useState<string>('');

	return (
		<AuthProviderContext.Provider value={{ authProvider, setAuthProvider }}>
			{children}
		</AuthProviderContext.Provider>
	);
};

export const useAuthProvider = () => {
	const context = useContext(AuthProviderContext);
	if (!context) {
		throw new Error('useAuthProvider must be used within an AuthProviderProvider');
	}
	return context;
};
