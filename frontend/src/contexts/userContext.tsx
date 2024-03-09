import { createContext, createEffect, useContext } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { api } from "../lib/axios";
import { createStore } from "solid-js/store";

export type TUserContext = {
    _id:string
    country:string
    email:string
}

export const UserContext = createContext({} as TUserContext);

export function UserContextProvider(props:any) {
    const navigator = useNavigate();
    const jwt = localStorage.getItem("token");
    const [userData, setUserData] = createStore();
    createEffect(async () => {
        try {
            const response = await api.get("/users/info", {
                headers: { Authorization: `Bearer ${jwt}` }
            });
            setUserData(response.data);
        } catch(err) {
            console.log(err);
            navigator("/signin");
        };
    });

    return (
        <UserContext.Provider value={userData}>
            {props.children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    console.log("useCounterContext: cannot find a CounterContext")
  }
  return context
}
