import { Document, Page, Text, View, Link } from "@react-pdf/renderer";
import type Template_1_Type from "../types/Template_1_Type.type";
// import { Font } from "@react-pdf/renderer";

// Font.register({
//     family: "Poppins",
//     fonts: [
//         { src: "/fonts/Poppins-Regular.ttf", fontWeight: "normal" },
//         { src: "/fonts/Poppins-Medium.ttf", fontWeight: 500 },
//         { src: "/fonts/Poppins-Bold.ttf", fontWeight: "bold" },
//         { src: "/fonts/Poppins-Italic.ttf", fontWeight: "normal", fontStyle: "italic" },
//         { src: "/fonts/Poppins-BoldItalic.ttf", fontWeight: "bold", fontStyle: "italic" },
//     ]
// });

export default function Template1({ data }: { data: Template_1_Type }) {
    const { personalDetails, educationDetails, skillDetails, projectDetails, certificationDetails, experienceDetails, extraCurricularDetails } = data;


    return (<Document>
        <Page size={"A4"} style={{ flexDirection: 'column', backgroundColor: '#ffffff', padding: 20,   }}>
            <Text style={{ textAlign: 'center', fontSize: 22 }}>
                {personalDetails.name}
            </Text>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 4, flexWrap: "wrap", gap: 1 }}>
                <Text style={{ marginHorizontal: 5, fontSize: 11 }}>{personalDetails.phone}</Text>
                <Text style={{ marginHorizontal: 5, fontSize: 11, color: 'blue', textDecoration: 'underline' }}>
                    {personalDetails.email}
                </Text>
                {personalDetails.linkedin && (
                    <Link src={personalDetails.linkedin} style={{ marginHorizontal: 5, fontSize: 11, color: 'blue' }}>
                        Linkedin
                    </Link>
                )}
                {personalDetails.github && (
                    <Link src={personalDetails.github} style={{ marginHorizontal: 5, fontSize: 11, color: 'blue' }}>
                        Github
                    </Link>
                )}
                <Text style={{ marginHorizontal: 5, fontSize: 11, color: '#555' }}>
                    {personalDetails.address}
                </Text>
            </View>

            <View style={{ marginTop: 25, paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 12, fontWeight: '800' }}>Summary</Text>
                <View style={{ height: 1, backgroundColor: '#000', marginVertical: 3 }} />
                <Text style={{ fontSize: 12, lineHeight: 1.5 }}>{personalDetails.summary}</Text>
            </View>

            <View style={{ marginTop: 13, paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 12, fontWeight: '800' }}>Skills</Text>
                <View style={{ height: 1, backgroundColor: '#000', marginVertical: 3, marginBottom: 5 }} />
                {skillDetails.map((skill, index) => (
                    <Text key={index} style={{ fontSize: 11, marginBottom: 5 }}>
                        <Text style={{ fontWeight: 700 }}>{skill.title}</Text> : {skill.details}
                    </Text>
                ))}
            </View>

            <View style={{ marginTop: 15, paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 12, fontWeight: '800' }}>Education</Text>
                <View style={{ height: 1, backgroundColor: '#000', marginVertical: 3, marginBottom: 5 }} />
                {educationDetails.map((education, index) => (
                    <View key={index} style={{ marginTop: 10 }}>
                        <View style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                            <Text style={{ fontSize: 11, fontWeight: 'bold' }}>{education.title}</Text>
                            <Text style={{ fontSize: 11, color: '#555' }}>({education.year})</Text>
                        </View>
                        <Text style={{ fontSize: 11, color: '#555', marginTop: 2, fontStyle: "italic" }}>
                            {education.institution}
                        </Text>
                    </View>
                ))}
            </View>

            <View style={{ marginTop: 15, paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 12, fontWeight: '800' }}>Projects</Text>
                <View style={{ height: 1, backgroundColor: '#000', marginVertical: 5 }} />
                {projectDetails.map((project, index) => (
                    <View key={index} style={{ marginBottom: 5 }}>
                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                            {project.title} |{" "}
                            <Link src={project.link} style={{ color: 'blue' }}>
                                Link
                            </Link>
                        </Text>
                        {project.description.map((desc, idx) => (
                            <Text key={idx} style={{ fontSize: 11, color: '#555', marginTop: 6 }}>
                                - {desc}
                            </Text>
                        ))}
                    </View>
                ))}
            </View>

            <View style={{ marginTop: 15, paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#000' }}>Experience</Text>
                <View style={{ height: 1, backgroundColor: '#000', marginVertical: 5 }} />
                {experienceDetails.map((exp, index) => (
                    <View key={index} style={{ marginBottom: 5 }}>
                        <Text style={{ fontSize: 11, fontWeight: 'bold' }}>
                            {exp.role} | {exp.company} ({exp.duration})
                        </Text>
                        {exp.description.map((desc, idx) => (
                            <Text key={idx} style={{ fontSize: 11, color: '#555', marginTop: 3 }}>
                                - {desc}
                            </Text>
                        ))}
                    </View>
                ))}
            </View>

            <View style={{ marginTop: 15, paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#000' }}>Certifications</Text>
                <View style={{ height: 1, backgroundColor: '#000', marginVertical: 5 }} />
                {certificationDetails.map((cert, index) => (
                    <Text key={index} style={{ fontSize: 11, color: '#555', marginTop: 2 }}>
                        • {cert.title} – {cert.timeline}
                    </Text>
                ))}
            </View>

            {extraCurricularDetails.length > 0 && (
                <View style={{ marginTop: 15, paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 12, fontWeight: '700', color: '#000' }}>Extra-Curricular Activities</Text>
                    <View style={{ height: 1, backgroundColor: '#000', marginVertical: 5 }} />
                    {extraCurricularDetails.map((activity, index) => (
                        <Text key={index} style={{ fontSize: 11, color: '#555', marginTop: 2 }}>
                            • {activity}
                        </Text>
                    ))}
                </View>
            )}
        </Page>
    </Document>);
}