import AuthLayout from "@/components/layouts/AuthLayout";
import InputText from "@/components/ui/InputText";
import Button from "@/components/ui/Button";
import { MailCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [form, setForm] = useState({ email: "" });

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-800">Recuperar Senha</h1>
        <p className="text-sm text-gray-500">Digite seu email para receber instruções de redefinição.</p>
      </div>

      <div className="space-y-4">
        <InputText
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <div className="text-center text-sm">
        <Link href="/login" className="text-[#2D61F0] hover:underline">
          Voltar para login
        </Link>
      </div>

      <div className="pt-2">
        <Button variant="primary" icon={MailCheck} className="w-full">
          Enviar Instruções
        </Button>
      </div>
    </div>
  );
}

ForgotPasswordPage.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
