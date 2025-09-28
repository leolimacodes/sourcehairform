'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Lock, User } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirecionar para o painel admin
        router.push('/admin');
      } else {
        setError(data.error || 'Erro ao fazer login');
      }
    } catch (error) {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative" style={{ backgroundColor: "#cbcbcb" }}>
      {/* Pearl Mist Background with Top Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(226, 232, 240, 0.12), transparent 60%), #cbcbcb",
        }}
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative w-48 h-24 sm:w-56 sm:h-28">
              <Image
                src="/novasimagens/logosource2.png"
                alt="Source Hair Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-[#b18933] to-[#daa520] p-3 rounded-full shadow-lg">
                  <Lock className="h-6 w-6 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Painel Administrativo</h1>
              <p className="text-gray-600">Faça login para acessar o painel de controle</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Usuário
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="username"
                    type="text"
                    placeholder="Digite seu usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:border-[#b18933] focus:outline-none transition-colors"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="password"
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:border-[#b18933] focus:outline-none transition-colors"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-base transition-all duration-300 shadow-lg ${
                  isLoading
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                    : "bg-gradient-to-r from-[#b18933] via-[#daa520] to-[#b18933] text-white hover:from-[#8b6914] hover:via-[#b8860b] hover:to-[#8b6914] hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-[1.02] shadow-[#b18933]/40 border border-[#daa520]/30"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Entrando...
                  </div>
                ) : (
                  'Entrar'
                )}
              </button>
            </form>

            {/* Info sobre credenciais */}
            <div className="mt-8 text-center text-sm text-gray-600">
              <p className="text-xs text-[#b18933] font-medium">
                💡 Entre com suas credenciais de administrador
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
