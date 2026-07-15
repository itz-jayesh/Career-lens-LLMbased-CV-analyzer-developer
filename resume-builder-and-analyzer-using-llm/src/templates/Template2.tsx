import { Document, Page, Text, Image, View } from '@react-pdf/renderer';
import type Template_2_Type from '../types/Template_2_Type.type';

export default function Template2({ data }: { data: Template_2_Type }) {
  const { personalDetails, skillsDetails, educationDetails, projectDetails, experienceDetails } = data;

  return (<Document>
    <Page size="A3" style={{ paddingHorizontal: 40, paddingVertical: 30 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Image style={{ height: 65, width: 80, marginLeft: 30 }} src={"/sit-logo.png"} />
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <View style={{ textAlign: "right", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
            <Text style={{ textAlign: "right", fontWeight: 800 }}>{personalDetails.fullName}</Text>
            <Text style={{ textAlign: "right", fontSize: 12, }}>{personalDetails.learning}</Text>
            <Text style={{ textAlign: "right", fontSize: 12, }}>{personalDetails.phoneNumber}</Text>
            <Text style={{ textAlign: "right", fontSize: 12, }}>{personalDetails.email}</Text>
            <Text style={{ textAlign: "right", fontSize: 12, }}>{personalDetails.address}</Text>
          </View>
          <Image style={{ height: 80, width: 75 }} src={data.personalDetails.imageUrl === "" ? "https://cdn-icons-png.flaticon.com/512/4838/4838856.png" : data.personalDetails.imageUrl} />
        </View>
      </View>

      <View style={{ marginTop: 15 }}>
        <Text style={{ backgroundColor: '#276cf5', color: '#FFFFFF', paddingVertical: 4, paddingHorizontal: 10, fontSize: 13, fontWeight: 'bold', marginBottom: 7 }}>BRIEF SUMMARY</Text>
        <View style={{}}>
          <Text style={{ fontSize: 13, color: 'rgba(0,0,0,0.7)', lineHeight: 1.3 }}>{personalDetails.summary}</Text>
        </View>
      </View>

      <View style={{ marginTop: 15 }}>
        <Text style={{ backgroundColor: '#276cf5', color: '#FFFFFF', paddingVertical: 4, paddingHorizontal: 10, fontSize: 13, fontWeight: 'bold', marginBottom: 7 }}>KEY EXPERTISE</Text>
        <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
          {skillsDetails.map((skill, index) => (
            <Text key={index} style={{ fontSize: 13, color: '#000000', backgroundColor: "rgba(0,0,0,0.1)", borderRadius: 8, paddingHorizontal: 6, paddingVertical: 4 }}>
              {skill}
            </Text>
          ))}
        </View>
      </View>

      <View style={{ marginTop: 15 }}>
        <Text style={{ backgroundColor: '#276cf5', color: '#FFFFFF', paddingVertical: 4, paddingHorizontal: 10, fontSize: 13, fontWeight: 'bold', marginBottom: 7 }}>EDUCATION</Text>
        <View style={{ marginTop: 5, gap: 10, flexDirection: "column" }}>
          {
            educationDetails.map((a, i) => {
              return <View key={i} style={{ fontSize: 14,  }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingBottom: 5 }}>
                  <Text style={{ fontWeight: 800 }}>{a.institute}</Text>
                  <Text style={{ fontSize: 12 }}>{a.timeline}</Text>
                </View>
                <View style={{ fontSize: 12, marginTop: 3, flexDirection: "row", gap: 3 }}>
                  <Text>{a.learning}</Text>
                  <Text>{a.marks}</Text>
                </View>
              </View>
            })
          }
        </View>
      </View>

      <View style={{ marginTop: 15 }}>
        <Text style={{ backgroundColor: '#276cf5', color: '#FFFFFF', paddingVertical: 4, paddingHorizontal: 10, fontSize: 13, fontWeight: 'bold', marginBottom: 7 }}>WORK EXPERIENCE / INTERNSHIP</Text>
        <View style={{ gap: 10, flexDirection: "column" }}>
          {
            experienceDetails.map((a, i) => {
              return <View key={i} style={{ fontSize: 13, marginBottom: 5 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ fontSize: 14, fontWeight: 700 }}>{a.company}</Text>
                  <Text style={{ fontSize: 12, fontWeight: 700 }}>{a.timeline}</Text>
                </View>
                <Text style={{ fontSize: 12, paddingTop: 4 }}>{a.position}</Text>
                <View style={{ marginTop: 5, flexDirection: "row", gap: 10, alignItems: "center" }}>
                  <Text style={{ fontWeight: 800, fontSize: 12, paddingVertical: 7 }}>Key Skills : </Text>
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    {a.keySkills.map((skill, index) => (
                      <Text key={index} style={{
                        fontSize: 11,
                        color: '#000000',
                        backgroundColor: "rgba(0,0,0,0.2)",
                        borderRadius: 8, paddingHorizontal: 7, paddingVertical: 2
                      }}>{skill}</Text>
                    ))}
                  </View>
                </View>
                <View style={{ marginTop: 5 }}>
                  {a.description.map((line, index) => (
                    <Text key={index} style={{ fontSize: 12, color: '#000000', lineHeight: 1.3 }}>{line}</Text>
                  ))}
                </View>
              </View>
            })
          }
        </View>
      </View>

      <View style={{ marginTop: 15 }}>
        <Text style={{ backgroundColor: '#276cf5', color: '#FFFFFF', paddingVertical: 4, paddingHorizontal: 10, fontSize: 13, fontWeight: 'bold', marginBottom: 7 }}>PROJECT</Text>
        <View style={{ flexDirection: "column", gap: 10 }}>
          {
            projectDetails.map((a, i) => {
              return <View key={i} style={{ fontSize: 13, marginBottom: 3 }}>
                <Text style={{ fontWeight: 900, fontSize: 14 }}>{a.title}</Text>
                <View style={{ marginTop: 5, flexDirection: "row", gap: 10, alignItems: "center" }}>
                  <Text style={{ fontWeight: 800, fontSize: 12 }}>Key Skills : </Text>
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    {a.keySkills.map((skill, index) => (
                      <Text key={index} style={{
                        fontSize: 11,
                        color: '#000000',
                        backgroundColor: "rgba(0,0,0,0.2)",
                        borderRadius: 8, paddingHorizontal: 7, paddingVertical: 2
                      }}>{skill}</Text>
                    ))}
                  </View>
                </View>
                <Text style={{ fontWeight: 800, paddingVertical: 7, fontSize: 12 }}>Project Link : <Text style={{ color: 'blue' }}>{a.link}</Text>
                </Text>
                <View>
                  {a.description.map((line, index) => (
                    <Text key={index} style={{ fontSize: 13, color: '#000000', lineHeight: 1.2 }}>{line}</Text>
                  ))}
                </View>
              </View>
            })}
        </View>
      </View>

      <View style={{ marginTop: 15, fontSize: 13 }}>
        <Text style={{ backgroundColor: '#276cf5', color: '#FFFFFF', paddingVertical: 4, paddingHorizontal: 10, fontSize: 13, fontWeight: 'bold', marginBottom: 7 }}>PERSONAL DETAILS</Text>
        <View style={{ marginTop: 5, flexDirection: "row", gap: 5 }}>
          <View style={{ flex: 1, flexDirection: "column", gap: 4 }}>
            <Text><Text style={{ fontWeight: 800 }}>Gender:</Text> {personalDetails.gender}</Text>
            <Text><Text style={{ fontWeight: 800 }}>Marital Status:</Text> {personalDetails.maritalStatus}</Text>
            <Text><Text style={{ fontWeight: 800 }}>Current Address:</Text> {personalDetails.currentAddress}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: "column", gap: 4 }}>
            <Text><Text style={{ fontWeight: 800 }}>Date of Birth:</Text> {personalDetails.birthDate}</Text>
            <Text><Text style={{ fontWeight: 800 }}>Languages Known:</Text> {personalDetails.languagesKnown}</Text>
            <Text><Text style={{ fontWeight: 800 }}>Phone Number:</Text> {personalDetails.phoneNumber}</Text>
          </View>
        </View>
        <Text style={{ marginTop: 8 }}>
          <Text style={{ fontWeight: 800 }}>Emails:</Text>
          {personalDetails.emails}</Text>
      </View>
    </Page>
  </Document>)
}