import type { CvObjectType } from "@/interfaces/cv.types";

export const calculateProgress = (cvObject: CvObjectType) => {
    let progress = 0;
    if (
        cvObject.name &&
        cvObject.surname &&
        cvObject.jobTitle &&
        cvObject.city &&
        cvObject.country
    ) {
        progress += 10;
    }
    if (cvObject.email && cvObject.phone && cvObject.profileImage) {
        progress += 10;
    }
    if (cvObject.summary) {
        progress += 10;
    }
    if (cvObject.hobbies) {
        progress += 10;
    }
    if (cvObject?.skills?.length > 0) {
        progress += 10;
    }
    if (cvObject?.languages?.length > 0) {
        progress += 10;
    }
    if (cvObject?.employment?.length > 0) {
        progress += 10;
    }
    if (cvObject?.education?.length > 0) {
        progress += 10;
    }
    if (cvObject?.internships?.length > 0) {
        progress += 10;
    }
    if (cvObject?.projects?.length > 0) {
        progress += 10;
    }
    return progress;
};

