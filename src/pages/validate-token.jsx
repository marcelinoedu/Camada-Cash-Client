import AuthLayout from "@/components/layouts/AuthLayout";
import InputText from "@/components/ui/InputText";
import Button from "@/components/ui/Button";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ValidateTokenPage() {
  const [form, setForm] = useState({ token: "" });

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-800">Validar Código</h1>
        <p className="text-sm text-gray-500">
          Digite o código de verificação enviado para seu e-mail.
        </p>
      </div>

      <div className="space-y-4">
        <InputText
          label="Código de Verificação"
          name="token"
          type="text"
          value={form.token}
          onChange={(e) => setForm({ ...form, token: e.target.value })}
        />
      </div>

      <div className="text-center text-sm">
        <Link href="/forgot-password" className="text-[#2D61F0] hover:underline">
          Reenviar código
        </Link>
      </div>

      <div className="pt-2">
        <Button variant="primary" icon={ShieldCheck} className="w-full">
          Validar Código
        </Button>
      </div>
    </div>
  );
}

ValidateTokenPage.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
