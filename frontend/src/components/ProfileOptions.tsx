import { Component } from "solid-js"

interface ProfileOptionName {
    name: string,
    perform: () => void
}

const ProfileOption:Component<ProfileOptionName> = ({name, perform}) => {
    return (
        <div class="w-4/5 rounded-3xl bg-slate-800 text-slate-200 px-4 py-4 cursor-pointer text-center" onClick={perform}>
           <p>{name}</p>
        </div>
    );
}

export default ProfileOption;
