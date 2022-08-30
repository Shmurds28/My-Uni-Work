import {atom} from 'recoil';

export const modalState = atom({
    key: "modalState",
    default: false,
});

export const addModule = atom({
    key: "addModule",
    default: false,
});

export const addAssessment = atom({
    key: "addAssessment",
    default: false,
});

export const addLecturer = atom({
    key: "addLecturer",
    default: false,
});

export const signup = atom({
    key: "signup",
    default: false,
});

export const login = atom({
    key: "login",
    default: false,
});

export const viewModule = atom({
    key: "viewModule",
    default: false,
});

export const editLecturer = atom({
    key: "editLecturer",
    default: false,
});

export const editModule = atom({
    key: "editModule",
    default: false,
});

export const isError = atom({
    key: "isError",
    default: false,
});

export const isSnackBar = atom({
    key: "isSnackBar",
    default: false,
});

export const notificationMessage = atom({
    key: "notificationMessage",
    default: ""
});

export const confirm = atom({
    key: "confirm",
    default: false,
});

export const confirmed = atom({
    key: "isConfirmed",
    default: false,
})
