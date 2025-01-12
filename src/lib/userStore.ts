import {create} from "zustand"

interface UserAuthState {
    userName: string ;
    fullName: string ;
    userId: string ;
    avatar: string ;
    setUser: (newFullName: string, newUserName: string, newUserId: string, newAvatar: string) => void;
    clearUser: () => void;
}

const userStore = create<UserAuthState>((set) => ({
    userName: "",
    fullName: "",
    userId: "",
    avatar: "",

    setUser: (newFullName: string, newUserName: string, newUserId: string, newAvatar: string) => set({ userName: newUserName, fullName: newFullName, userId: newUserId, avatar: newAvatar }),
    clearUser: () => set({ userName: "", fullName: "", userId: "", avatar: "" })
}))

export default userStore;