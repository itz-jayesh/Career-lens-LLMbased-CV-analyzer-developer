import { NextFunction, Request, Response } from "express";

export default function Update_Resume_Middleware(req: Request, res: Response, next: NextFunction) {
    try {
        const { template } = req.body;

        if (template == null || typeof template !== "string" || !(["template1", "template2"].includes(template))) {
            res.status(200).json({ success: false, message: "Invalid template name" });
            return;
        }

        if (template === "template1") {
            const message = Update_Resume_Middleware_Template_1(req.body);
            if (message !== null) {
                res.status(200).json({ success: false, message: message });
                return;
            }
        }

        if (template === "template2") {
            const message = Update_Resume_Middleware_Template_2(req.body);
            if (message !== null) {
                res.status(200).json({ success: false, message: message });
                return;
            }
        }

        next();
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong. Please try again later" });
        return;
    }
}



function Update_Resume_Middleware_Template_1(data: Partial<any>) {

    if (!data.title || typeof data.title !== "string")
        return "Field 'title' is required and must be a string.";

    // ------------------ Personal Details ------------------
    if (!data.personalDetails)
        return "Personal details are required.";

    const { name, email, phone, linkedin, github, address, summary } = data.personalDetails;

    if (!name || typeof name !== "string" || name.trim().length < 2)
        return "Personal 'name' is required and must be at least 2 characters.";

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return "Personal 'email' must be valid.";

    if (!phone || typeof phone !== "string" || !/^\+?\d{10,15}$/.test(phone))
        return "Personal 'phone' must be a valid phone number (10-15 digits).";

    if (!linkedin || typeof linkedin !== "string")
        return "Personal 'linkedin' must be a string.";

    if (!github || typeof github !== "string")
        return "Personal 'github' must be a string.";

    if (address && typeof address !== "string")
        return "Personal 'address' must be a string.";

    if (summary && typeof summary !== "string")
        return "Personal 'summary' must be a string.";

    // ------------------ Education Details ------------------
    if (data.educationDetails) {
        if (!Array.isArray(data.educationDetails))
            return "'educationDetails' must be an array.";

        for (let i = 0; i < data.educationDetails.length; i++) {
            const edu = data.educationDetails[i];

            if (!edu.title || typeof edu.title !== "string")
                return `Education[${i}].title is required and must be a string.`;

            if (!edu.institution || typeof edu.institution !== "string")
                return `Education[${i}].institution is required and must be a string.`;

            if (!edu.year || typeof edu.year !== "string")
                return `Education[${i}].year is required and must be a string.`;
        }
    }

    // ------------------ Skills ------------------
    if (data.skillDetails) {
        if (!Array.isArray(data.skillDetails))
            return "'skillDetails' must be an array.";

        for (let i = 0; i < data.skillDetails.length; i++) {
            const skill = data.skillDetails[i];

            if (!skill.title || typeof skill.title !== "string")
                return `Skill[${i}].title is required and must be a string.`;

            if (!skill.details || typeof skill.details !== "string")
                return `Skill[${i}].details is required and must be a string.`;
        }
    }

    // ------------------ Projects ------------------
    if (data.projectDetails) {
        if (!Array.isArray(data.projectDetails))
            return "'projectDetails' must be an array.";

        for (let i = 0; i < data.projectDetails.length; i++) {
            const proj = data.projectDetails[i];

            if (!proj.title || typeof proj.title !== "string")
                return `Project[${i}].title is required and must be a string.`;

            if (proj.link && !/^https?:\/\/.+/.test(proj.link))
                return `Project[${i}].link must be a valid URL.`;

            if (!Array.isArray(proj.description) || proj.description.some((d: any) => typeof d !== "string"))
                return `Project[${i}].description must be an array of strings.`;
        }
    }

    // ------------------ Certifications ------------------
    if (data.certificationDetails) {
        if (!Array.isArray(data.certificationDetails))
            return "'certificationDetails' must be an array.";

        for (let i = 0; i < data.certificationDetails.length; i++) {
            const cert = data.certificationDetails[i];

            if (!cert.timeline || typeof cert.timeline !== "string")
                return `Certification[${i}].timeline is required and must be a string.`;

            if (!cert.title || typeof cert.title !== "string")
                return `Certification[${i}].title is required and must be a string.`;
        }
    }

    // ------------------ Extra Curricular ------------------
    if (data.extraCurricularDetails) {
        if (!Array.isArray(data.extraCurricularDetails))
            return "'extraCurricularDetails' must be an array of strings.";

        if (data.extraCurricularDetails.some(e => typeof e !== "string"))
            return "Each item in 'extraCurricularDetails' must be a string.";
    }

    // ------------------ Experience ------------------
    if (data.experienceDetails) {
        if (!Array.isArray(data.experienceDetails))
            return "'experienceDetails' must be an array.";

        for (let i = 0; i < data.experienceDetails.length; i++) {
            const exp = data.experienceDetails[i];

            if (!exp.company || typeof exp.company !== "string")
                return `Experience[${i}].company is required and must be a string.`;

            if (!exp.role || typeof exp.role !== "string")
                return `Experience[${i}].role is required and must be a string.`;

            if (!exp.duration || typeof exp.duration !== "string")
                return `Experience[${i}].duration is required and must be a string.`;

            if (!Array.isArray(exp.description) || exp.description.some((d: any) => typeof d !== "string"))
                return `Experience[${i}].description must be an array of strings.`;
        }
    }

    return null;
}

function Update_Resume_Middleware_Template_2(data: Partial<any>) {

    if (!data.title || typeof data.title !== "string")
        return "Field 'title' is required and must be a string.";

    // ------------------ Personal Details ------------------
    if (!data.personalDetails)
        return "Personal details are required.";

    const { fullName, learning, phoneNumber, email, address, summary, gender, birthDate, languagesKnown, maritalStatus, currentAddress, emails, imageUrl } = data.personalDetails;

    if (!imageUrl || typeof imageUrl !== "string")
        return "Personal 'imageUrl' is required and must be a string.";

    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2)
        return "Personal 'fullName' is required and must be at least 2 characters.";

    if (!learning || typeof learning !== "string")
        return "Personal 'learning' is required and must be a string.";

    if (!phoneNumber || typeof phoneNumber !== "string" || !/^\+?\d{10,15}$/.test(phoneNumber))
        return "Personal 'phoneNumber' must be a valid phone number (10-15 digits).";

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return "Personal 'email' must be valid.";

    if (!address || typeof address !== "string")
        return "Personal 'address' is required and must be a string.";

    if (summary && typeof summary !== "string")
        return "Personal 'summary' must be a string.";

    if (!gender || typeof gender !== "string" || !(["Male", "Female"].includes(gender)))
        return "Personal 'gender' is required and must be a string.";

    if (!birthDate || typeof birthDate !== "string")
        return "Personal 'birthDate' is required and must be a string.";

    if (!Array.isArray(languagesKnown) || languagesKnown.some(lang => typeof lang !== "string"))
        return "Personal 'languagesKnown' must be an array of strings.";

    if (!maritalStatus || typeof maritalStatus !== "string")
        return "Personal 'maritalStatus' is required and must be a string.";

    if (!currentAddress || typeof currentAddress !== "string")
        return "Personal 'currentAddress' is required and must be a string.";

    if (!Array.isArray(emails) || emails.some(e => typeof e !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)))
        return "Personal 'emails' must be an array of valid email addresses.";

    // ------------------ Skills ------------------
    if (data.skillsDetails) {
        if (!Array.isArray(data.skillsDetails))
            return "'skillsDetails' must be an array.";

        if (data.skillsDetails.some(skill => typeof skill !== "string"))
            return "'skillsDetails' must be an array of strings.";
    }

    // ------------------ Experience ------------------
    if (data.experienceDetails) {
        if (!Array.isArray(data.experienceDetails))
            return "'experienceDetails' must be an array.";

        for (let i = 0; i < data.experienceDetails.length; i++) {
            const exp = data.experienceDetails[i];

            if (!exp.company || typeof exp.company !== "string")
                return `Experience[${i}].company is required and must be a string.`;

            if (!exp.timeline || typeof exp.timeline !== "string")
                return `Experience[${i}].timeline is required and must be a string.`;

            if (!exp.position || typeof exp.position !== "string")
                return `Experience[${i}].position is required and must be a string.`;

            if (!Array.isArray(exp.keySkills) || exp.keySkills.some((skill: any) => typeof skill !== "string"))
                return `Experience[${i}].keySkills must be an array of strings.`;

            if (!Array.isArray(exp.description) || exp.description.some((d: any) => typeof d !== "string"))
                return `Experience[${i}].description must be an array of strings.`;
        }
    }

    // ------------------ Education ------------------
    if (data.educationDetails) {
        if (!Array.isArray(data.educationDetails))
            return "'educationDetails' must be an array.";

        for (let i = 0; i < data.educationDetails.length; i++) {
            const edu = data.educationDetails[i];

            if (!edu.institute || typeof edu.institute !== "string")
                return `Education[${i}].institute is required and must be a string.`;

            if (!edu.marks || typeof edu.marks !== "string")
                return `Education[${i}].marks is required and must be a string.`;

            if (!edu.timeline || typeof edu.timeline !== "string")
                return `Education[${i}].timeline is required and must be a string.`;

            if (!edu.learning || typeof edu.learning !== "string")
                return `Education[${i}].learning is required and must be a string.`;
        }
    }

    // ------------------ Projects ------------------
    if (data.projectDetails) {
        if (!Array.isArray(data.projectDetails))
            return "'projectDetails' must be an array.";

        for (let i = 0; i < data.projectDetails.length; i++) {
            const proj = data.projectDetails[i];

            if (!proj.title || typeof proj.title !== "string")
                return `Project[${i}].title is required and must be a string.`;

            if (proj.link && !/^https?:\/\/.+/.test(proj.link))
                return `Project[${i}].link must be a valid URL.`;

            if (!Array.isArray(proj.description) || proj.description.some((d: any) => typeof d !== "string"))
                return `Project[${i}].description must be an array of strings.`;

            if (!Array.isArray(proj.keySkills) || proj.keySkills.some((skill: any) => typeof skill !== "string"))
                return `Project[${i}].keySkills must be an array of strings.`;
        }
    }

    return null;
}
