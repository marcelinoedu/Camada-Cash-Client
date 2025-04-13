import AuthLayout from "@/components/layouts/AuthLayout";
import InputText from "@/components/ui/InputText";
import Button from "@/components/ui/Button";
import { LogIn, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Loading from "@/components/ui/Loading";
import { useMessage } from "@/context/MessageContext";
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();
  const { showMessage } = useMessage();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const { data } = await axios.post("/api/auth/login", {
        email: form.email,
        password: form.password,
      });

      const token = data.access_token?.token;
      const expiresAt = new Date(data.access_token?.expires_at);
      
      if (token) {
        Cookies.set("token", token, { expires: expiresAt, sameSite: "Lax", path: "/" });
      }

      showMessage(data.message || "Login realizado com sucesso!", "success");
      router.push("/");
    } catch (err) {
      showMessage(err.response?.data?.error || "Erro ao fazer login", "danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {loading && <Loading />}

      <div className="space-y-4">
        <InputText
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <InputText
          label="Senha"
          name="password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          icon={showPassword ? EyeOff : Eye}
          onIconClick={() => setShowPassword(!showPassword)}
        />
      </div>

      <div className="text-center space-y-2">
        <div className="flex justify-between text-sm">
          <Link href="/register" className="text-[#2D61F0] hover:underline">
            Criar conta
          </Link>
          <Link href="/forgot-password" className="text-[#2D61F0] hover:underline">
            Esqueci minha senha
          </Link>
        </div>
      </div>

      <div className="pt-2">
        <Button
          variant="primary"
          icon={LogIn}
          className="w-full"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </div>
    </div>
  );
}

LoginPage.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
