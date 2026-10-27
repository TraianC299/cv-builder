import COLORS from '@/constants/COLORS';
import { INITIAL_CV_VALS } from '@/constants/INITIAL_CV_VALS';
import type { CvListKey, CvObjectType } from '@/interfaces/cv.types';
import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { persist } from "zustand/middleware";
import type { CVStoreProps } from './cvStore.tyes';

const initialCvObject: CvObjectType = {
    summary: "",
    hobbies: "",
    skills: [],
    languages: [],
    email: "",
    phone: "",
    country: "",
    name: "",
    surname: "",
    jobTitle: "",
    city: "",
    dateOfBirth: "",
    profileImage: "",
    employment: [],
    education: [],
    internships: [],
    projects: [],
    certifications: [],
    template: 1,
    language: "en",
    color: COLORS.MAINCOLOR,
};




export const useCV = create<CVStoreProps>()(
    persist(
        (set) => ({
            cvObject: initialCvObject,
            sectionOrder: [] as CvListKey[],
            clearCategory: (key: CvListKey) => set((state) => ({
                cvObject: { ...state.cvObject, [key]: [] },
                sectionOrder: state.sectionOrder.filter(el => el !== key)
            })),
            changeCvStringProperty: (key: string, value: any) => set((state) => {
                return {
                    cvObject: { ...state.cvObject, [key]: value }
                }
            }),
            deleteListItem: (listKey: CvListKey, id: string) => set((state) => {
                const remaningArr = state.cvObject?.[listKey]?.filter((el) => el.id !== id)
                return {
                    cvObject: {
                        ...state.cvObject,
                        [listKey]: remaningArr
                    },
                    ...(remaningArr?.length === 0 ? { sectionOrder: state.sectionOrder.filter(el => el !== listKey) } : {})
                }
            }),
            changeListOrder: (listKey: CvListKey, values: any[]) => set((state) => ({
                cvObject: {
                    ...state.cvObject,
                    [listKey]: values
                }
            })),
            addNewSection: (key: CvListKey) => set((state) => {
                const noEdit = state.cvObject?.[key]?.map((el) => ({
                    ...el,
                    edit: false,
                })) ?? [];
                return {
                    sectionOrder: state.sectionOrder.includes(key) ? state.sectionOrder : [...state.sectionOrder, key],
                    cvObject: {
                        ...state.cvObject,
                        [key]: [...noEdit, { ...INITIAL_CV_VALS[key], id: nanoid() }],
                    }
                }
            }),
            changeCvObject: (key, value, id, category) => set((state) => {
                const items = state.cvObject[category] as { id: string;[k: string]: any }[];
                const index = items.findIndex((el) => el.id === id);
                if (index === -1) return state;

                return {
                    cvObject: {
                        ...state.cvObject,
                        [category]: items.map((el) =>
                            el.id === id ? { ...el, [key]: value } : el
                        ),
                    }
                };
            }),
        }),
        {
            name: "resumelio-cv-storage", // localStorage key
            partialize: (state) => ({
                cvObject: state.cvObject,
                sectionOrder: state.sectionOrder,
            }),
        }
    )
);

export default useCV