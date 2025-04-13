import AuthLayout from "@/components/layouts/AuthLayout";
import InputText from "@/components/ui/InputText";
import Button from "@/components/ui/Button";
import { UserPlus, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Loading from "@/components/ui/Loading";
import { useMessage } from "@/context/MessageContext";

export default function RegisterPage() {
  const router = useRouter();
  const { showMessage } = useMessage();

  const [form, setForm] = useState({
    name: "",
    email: "",
    confirm_email: "",
    password: "",
    confirm_password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);

    if (form.email !== form.confirm_email || form.password !== form.confirm_password) {
      showMessage("Email ou senha não conferem.", "danger");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post("/api/auth/register", {
        name: form.name,
        email: form.email,
        confirm_email: form.confirm_email,
        password: form.password,
        confirm_password: form.confirm_password
      });

      showMessage(data.message || "Cadastro realizado com sucesso!", "success");
      router.push("/login");
    } catch (err) {
      showMessage(err.response?.data?.error || "Erro ao registrar", "danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {loading && <Loading />}

      <div className="space-y-4">
        <InputText
          label="Nome"
          name="name"
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <InputText
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <InputText
          label="Confirmar Email"
          name="confirm_email"
          type="email"
          value={form.confirm_email}
          onChange={(e) => setForm({ ...form, confirm_email: e.target.value })}
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

        <InputText
          label="Confirmar Senha"
          name="confirm_password"
          type={showConfirmPassword ? "text" : "password"}
          value={form.confirm_password}
          onChange={(e) => setForm({ ...form, confirm_password: e.target.value })}
          icon={showConfirmPassword ? EyeOff : Eye}
          onIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
        />
      </div>

      <div className="text-center space-y-2">
        <div className="flex justify-between text-sm">
          <Link href="/login" className="text-[#2D61F0] hover:underline">
            Já tenho uma conta
          </Link>
          <Link href="/forgot-password" className="text-[#2D61F0] hover:underline">
            Esqueci minha senha
          </Link>
        </div>
      </div>

      <div className="pt-2">
        <Button
          variant="primary"
          icon={UserPlus}
          className="w-full"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Criando..." : "Criar conta"}
        </Button>
      </div>
    </div>
  );
}

RegisterPage.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};