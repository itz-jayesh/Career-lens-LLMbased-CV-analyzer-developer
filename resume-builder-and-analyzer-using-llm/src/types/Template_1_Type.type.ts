export default interface Template_1_Type {
    title: string;
    email: string;
    
    personalDetails: {
        name: string;
        email: string;
        phone: string;
        linkedin: string;
        github: string;
        address: string;
        summary: string;
    };

    educationDetails: {
        title: string;
        institution: string;
        year: string;
    }[];

    skillDetails: {
        title: string;
        details: string;
    }[];

    projectDetails: {
        title: string;
        link: string;
        description: string[];
    }[];

    certificationDetails: {
        timeline: string;
        title: string;
    }[];

    extraCurricularDetails: string[];

    experienceDetails: {
        company: string;
        role: string;
        duration: string;
        description: string[];
    }[];
}
