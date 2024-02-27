import {Component, JSXElement, createContext, useContext} from "solid-js";
import { QueryClient } from "@tanstack/solid-query";
import { PropsWithChildren } from "../types/TPropsWithChildren";

const QueryClientContext = createContext<QueryClient>(new QueryClient());

export const QueryClientProvider: Component<PropsWithChildren> = ({children}) => {
    const queryClient = new QueryClient();
    return (
        <QueryClientContext.Provider value={queryClient}>
            {children}
        </QueryClientContext.Provider>
    )
}

export const useQueryClientContext = () => {
    return useContext(QueryClientContext);
}

