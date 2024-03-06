import { Component } from "solid-js"

interface ProfileOptionName {
    name: string,
    perform: () => void
}

const ProfileOption:Component<ProfileOptionName> = ({name, perform}) => {
    return (
        <div class="w-4/5 rounded-md bg-slate-800 text-slate-200 px-3 py-1 cursor-pointer text-center" onClick={perform}>
           {name} 
        </div>
    );
}

export default ProfileOption;
