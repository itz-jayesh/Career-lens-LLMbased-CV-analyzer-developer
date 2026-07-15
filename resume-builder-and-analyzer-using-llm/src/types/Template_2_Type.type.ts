export default interface Template_2_Type {
    title: string;
    email: string;

    personalDetails: {
        imageUrl: string;
        fullName: string;
        learning: string;
        phoneNumber: string;
        email: string;
        address: string;
        summary: string;
        gender: string;
        birthDate: string;
        languagesKnown: string[];
        maritalStatus: string;
        currentAddress: string;
        emails: string[];
    },

    skillsDetails: string[],

    experienceDetails: {
        company: string;
        timeline: string;
        position: string;
        keySkills: string[];
        description: string[];
    }[],

    educationDetails: {
        institute: string;
        marks: string;
        timeline: string;
        learning: string;
    }[],

    projectDetails: {
        title: string;
        keySkills: string[];
        description: string[];
        link: string;
    }[]
};