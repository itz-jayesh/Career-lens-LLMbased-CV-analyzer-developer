import Generate_Resume_Template_1_Page from "./app/user/generate-resume/template/template1/Generate_Resume_Template_1_Page";
import Generate_Resume_Template_2_Page from "./app/user/generate-resume/template/template2/Generate_Resume_Template_2_Page";
import Edit_Resume_Page from "./app/user/generated-resume/edit/resumeId/Edit_Resume_Page";
import Technical_Questions_Page from "./app/technical-questions/Technical_Questions_Page";
import Generated_Resumes_Page from "./app/user/generated-resume/Generated_Resume_Page";
import Layout_Generate_Resume from "./app/user/generate-resume/Layout_Generate_Resume";
import Analyze_Resume_Page from "./app/features/analyze-resume/Analyze_Resume_Page";
import About_Career_Lens_Page from "./app/about-career-lens/About_Career_Lens_Page";
import Generate_Resume_Page from "./app/user/generate-resume/Generate_Resume_Page";
import Preparation_Plan_Page from "./app/preparation-plan/Preparation_Plan_Page";
import Get_Started_Page from "./app/get-started/Get_Started_Page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Not_Found_Page from "./app/Not_Found_Page";
import Auth_Context from "./app/Auth_Context";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home_Page from "./app/Home_Page";
import { Toaster } from "sonner";


export default function App() {
  return (
    <div className="bg-linear-to-br from-[#0e0045] via-[#01001b] to-[#290045]">
      <Auth_Context>
        <Toaster theme="dark" swipeDirections={['top', 'right', 'bottom', 'left']} position="top-center" richColors />
        <BrowserRouter>
          <Navbar />
          <Routes>

            <Route path="/" Component={Home_Page} />

            <Route path="/get-started" Component={Get_Started_Page} />

            <Route path="/technical-questions" Component={Technical_Questions_Page} />

            <Route path="/preparation-plan" Component={Preparation_Plan_Page} />

            <Route path="/features/analyze-resume" Component={Analyze_Resume_Page} />

            <Route path="/about-career-lens" Component={About_Career_Lens_Page} />

            <Route path="/user" Component={Layout_Generate_Resume}>
              <Route path="generate-resume" Component={Generate_Resume_Page} />
              <Route path="generate-resume/template/template1" Component={Generate_Resume_Template_1_Page} />
              <Route path="generate-resume/template/template2" Component={Generate_Resume_Template_2_Page} />
              <Route path="generated-resumes" Component={Generated_Resumes_Page} />
              <Route path="generated-resumes/edit/:resumeId" Component={Edit_Resume_Page} />
            </Route>

            <Route path="*" Component={Not_Found_Page} />

          </Routes>
          <Footer />
        </BrowserRouter>
      </Auth_Context>
    </div>
  )
}