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
