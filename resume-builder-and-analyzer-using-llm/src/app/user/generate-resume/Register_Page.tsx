import { Link, useSearchParams } from "react-router-dom";
import setStorage from "../../../hooks/setStorage.hook";
import API_Routes from "../../../constants/API_Route";
import { useState, type FormEvent } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export default function Register_Page() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [_, setParams] = useSearchParams();


  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(API_Routes.register, form);

      if (res.data.success) {
        toast.success("Registration successful");
        setStorage("_APP_", { name: res.data.name, email: res.data.email, token: res.data.token });
        setParams({});
        window.location.pathname = "/";
      } else {
        toast.error(res.data.message || "Registration failed");
      }
    } catch (err: any) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white py-16">
      <div className="w-full max-w-md backdrop-blur-lg md:bg-blue-800/15 shadow-xl rounded-2xl md:p-8">
        <h2 className="text-3xl font-bold text-center mb-8 bg-linear-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
          Career lens
        </h2>
        <p className="text-center font-light text-2xl">Create Your Account</p>

        <form onSubmit={handleRegister} className="flex flex-col gap-4 mt-7">
          <input
            required
            type="text"
            placeholder="Enter name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border-2 border-transparent bg-blue-950 focus:border-cyan-400 p-3 rounded-xl outline-none transition"
          />
          <input
            required
            type="email"
            placeholder="Enter email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border-2 border-transparent bg-blue-950 focus:border-cyan-400 p-3 rounded-xl outline-none transition"
          />
          <input
            required
            type="password"
            placeholder="Enter password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="border-2 border-transparent bg-blue-950 focus:border-cyan-400 p-3 rounded-xl outline-none transition"
          />

          <button type="submit" disabled={loading}
            className="bg-linear-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 transition p-3 rounded-xl font-semibold mt-2 disabled:opacity-60">
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-5">
          Already have an account?{" "}
          <Link to={"?page=login-user"}>
            <button className="text-teal-400 font-semibold hover:underline">
              Signin
            </button>
          </Link>
        </p>
      </div>
    </div >
  );
}