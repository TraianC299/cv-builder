import type { CvListKey, CvObjectType } from "@/interfaces/cv.types";

export type CVStoreProps = {
    cvObject: CvObjectType;
    // progress: number
    changeCvStringProperty: (key: string, value: any) => void
    deleteListItem: (listKey: CvListKey, id: string) => void,
    changeListOrder: (listKey: CvListKey, values: any[]) => void,
    clearCategory: (key: CvListKey) => void
    changeCvObject: (
        key: string,
        value: string | boolean | number,
        id: string,
        category: CvListKey,
    ) => void;
    addNewSection: (key: CvListKey) => void;
    sectionOrder: CvListKey[];
}

