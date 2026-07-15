import { auth, googleProvider } from "../../../firebase/FirebaseDB";
import { Link, useSearchParams } from "react-router-dom";
import setStorage from "../../../hooks/setStorage.hook";
import API_Routes from "../../../constants/API_Route";
import { useState, type FormEvent } from "react";
import { signInWithPopup } from "firebase/auth";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export default function Login_Page() {
  const [form, setForm] = useState({ email: "star@gmail.com", password: "1111111" });
  const [loading, setLoading] = useState(false);
  const [_, setParams] = useSearchParams();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(API_Routes.login, form);

      if (res.data.success) {
        toast.success(`Welcome ${res.data.name || "User"}`);
        setStorage("_APP_", { name: res.data.name, email: res.data.email, token: res.data.token });
        setParams({});
        window.location.pathname = "/";
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (err: any) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (user.displayName && user.email) {
        const res = await axios.post(API_Routes.loginGoogle, {
          name: user.displayName, email: user.email,
        });

        if (res.data.success) {
          toast.success(`Welcome ${res.data.name || user.displayName}`);
          setStorage("_APP_", { name: res.data.name, email: res.data.email, token: res.data.token });
          window.location.pathname = "/";
        } else {
          toast.error(res.data.message || "Google login failed");
        }
      } else {
        toast.error("Google Login Failed");
      }
    } catch (err: any) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message || "Google Login Failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white py-16">
      <div className="w-full max-w-md backdrop-blur-lg md:bg-blue-800/15 shadow-xl rounded-2xl md:p-8">
        <h2 className="text-3xl font-bold text-center mb-8 bg-linear-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
          Career Lens
        </h2>
        <p className="text-center font-light text-2xl">Sign in to Your Account</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-7">
          <input
            required
            type="email"
            value={form.email}
            placeholder="Email Address"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border-2 border-transparent bg-blue-950 focus:border-cyan-400 p-3 rounded-xl outline-none transition"
          />
          <input
            required
            type="password"
            value={form.password}
            placeholder="Enter Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="border-2 border-transparent bg-blue-950 focus:border-cyan-400 p-3 rounded-xl outline-none transition"
          />

          <button type="submit" disabled={loading}
            className="bg-linear-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 transition p-3 rounded-xl font-semibold mt-2 disabled:opacity-60">
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="flex items-center justify-center my-5">
          <div className="w-24 border-t border-gray-700"></div>
          <span className="px-3 text-gray-400 text-sm">OR CONTINUE WITH</span>
          <div className="w-24 border-t border-gray-700"></div>
        </div>

        <button onClick={handleGoogleLogin} disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white p-3 rounded-xl font-semibold transition disabled:opacity-60">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google Logo" className="w-5 h-5"
          />
          {loading ? "Please wait..." : "Continue with Google"}
        </button>

        <div className="text-center mt-6 text-gray-300">
          Don&apos;t have an account?{" "}
          <Link to={"?page=register-user"}>
            <button className="text-teal-400 hover:underline font-semibold">
              Register now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}