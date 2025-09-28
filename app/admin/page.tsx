'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  BarChart3, 
  LogOut, 
  Eye,
  Calendar,
  TrendingUp,
  TrendingDown,
  Trash2,
  ThumbsUp,
  ThumbsDown,
  Settings
} from 'lucide-react';

interface DashboardStats {
  total: number;
  completed: number;
  abandoned: number;
  conversionRate: number;
  abandonedByStep: { step: number; count: number }[];
}

interface FormSubmission {
  id: number;
  nomeCompleto?: string;
  telefone?: string;
  instagram?: string;
  tiktok?: string;
  seguidores?: string;
  experienciaProtese?: string;
  facilidadeVideos?: string;
  autorizacaoImagem?: string;
  disponibilidade?: string;
  motivacao?: string;
  expectativas?: string;
  status: 'abandoned' | 'completed';
  currentStep: number;
  analysisStatus?: 'pending' | 'selected' | 'discarded';
  createdAt: string;
  updatedAt: string;
}

export default function AdminPanel() {
  const [user, setUser] = useState<{ id: number; username: string } | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [completedSubmissions, setCompletedSubmissions] = useState<FormSubmission[]>([]);
  const [abandonedSubmissions, setAbandonedSubmissions] = useState<FormSubmission[]>([]);
  const [selectedSubmissions, setSelectedSubmissions] = useState<FormSubmission[]>([]);
  const [discardedSubmissions, setDiscardedSubmissions] = useState<FormSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    loadDashboardData();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/check');
      if (response.ok) {
        const userData = await response.json();
        setUser(userData.user);
      } else {
        router.push('/login');
      }
    } catch (error) {
      router.push('/login');
    }
  };

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      console.log('Carregando dados do dashboard...');
      
      // Carregar estatísticas
      const statsResponse = await fetch('/api/admin/stats');
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
        console.log('Stats carregadas:', statsData);
      }

      // Carregar formulários completos
      const completedResponse = await fetch('/api/admin/completed');
      if (completedResponse.ok) {
        const completedData = await completedResponse.json();
        setCompletedSubmissions(completedData);
        console.log('Formulários completos carregados:', completedData.length);
      }

      // Carregar formulários abandonados
      const abandonedResponse = await fetch('/api/admin/abandoned');
      if (abandonedResponse.ok) {
        const abandonedData = await abandonedResponse.json();
        setAbandonedSubmissions(abandonedData);
        console.log('Formulários abandonados carregados:', abandonedData.length);
      }

      // Carregar candidatos selecionados
      const selectedResponse = await fetch('/api/admin/selected');
      if (selectedResponse.ok) {
        const selectedData = await selectedResponse.json();
        setSelectedSubmissions(selectedData);
        console.log('Candidatos selecionados carregados:', selectedData.length);
      }

      // Carregar candidatos descartados
      const discardedResponse = await fetch('/api/admin/discarded');
      if (discardedResponse.ok) {
        const discardedData = await discardedResponse.json();
        setDiscardedSubmissions(discardedData);
        console.log('Candidatos descartados carregados:', discardedData.length);
      }
      
      console.log('Dados do dashboard carregados com sucesso');
    } catch (error) {
      console.error('Erro ao carregar dados do painel:', error);
      setError('Erro ao carregar dados do painel');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleAnalysis = async (id: number, analysisStatus: 'selected' | 'discarded') => {
    try {
      console.log('Enviando análise:', { id, analysisStatus });
      
      const response = await fetch('/api/admin/analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, analysisStatus }),
      });

      console.log('Resposta da API:', response.status, response.statusText);
      
      if (response.ok) {
        console.log('Análise atualizada com sucesso');
        
        // Encontrar o submission que está sendo movido
        const submissionToMove = completedSubmissions.find(sub => sub.id === id);
        console.log('Submission encontrado:', submissionToMove);
        
        if (submissionToMove) {
          // Forçar atualização imediata do estado local
          if (analysisStatus === 'selected') {
            console.log('Movendo para selecionados');
            // Remover da lista de completos
            setCompletedSubmissions(prev => {
              const updated = prev.filter(sub => sub.id !== id);
              console.log('Completos após remoção:', updated.length);
              return updated;
            });
            // Adicionar aos selecionados
            setSelectedSubmissions(prev => {
              // Remover se já existe para evitar duplicação, depois adicionar no topo
              const filtered = prev.filter(sub => sub.id !== id);
              const updated = [{ ...submissionToMove, analysisStatus: 'selected' }, ...filtered];
              console.log('Selecionados após adição:', updated.length);
              return updated;
            });
          } else if (analysisStatus === 'discarded') {
            console.log('Movendo para descartados');
            // Remover da lista de completos
            setCompletedSubmissions(prev => {
              const updated = prev.filter(sub => sub.id !== id);
              console.log('Completos após remoção:', updated.length);
              return updated;
            });
            // Adicionar aos descartados
            setDiscardedSubmissions(prev => {
              // Remover se já existe para evitar duplicação, depois adicionar no topo
              const filtered = prev.filter(sub => sub.id !== id);
              const updated = [{ ...submissionToMove, analysisStatus: 'discarded' }, ...filtered];
              console.log('Descartados após adição:', updated.length);
              return updated;
            });
          }
        } else {
          console.error('Submission não encontrado na lista de completos');
        }
        
      } else {
        const errorData = await response.json();
        console.error('Erro na resposta:', errorData);
        setError('Erro ao atualizar status de análise: ' + (errorData.error || 'Erro desconhecido'));
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setError('Erro ao atualizar status de análise');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este formulário?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/delete?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Recarregar dados
        loadDashboardData();
      } else {
        setError('Erro ao excluir formulário');
      }
    } catch (error) {
      setError('Erro ao excluir formulário');
    }
  };

  const getStepName = (step: number) => {
    const steps = [
      'Nome Completo',
      'Idade',
      'Cidade e Estado',
      'Telefone/WhatsApp',
      '@ Instagram/TikTok',
      'Quantos seguidores você tem atualmente?',
      'Você já utiliza prótese capilar ou seria sua primeira experiência?',
      'Você tem facilidade em gravar vídeos e aparecer nas câmeras?',
      'Você autoriza o uso da sua imagem em campanhas de marketing da marca?'
    ];
    return steps[step - 1] || `Etapa ${step}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full relative" style={{ backgroundColor: "#cbcbcb" }}>
        {/* Pearl Mist Background with Top Glow */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(226, 232, 240, 0.12), transparent 60%), #cbcbcb",
          }}
        />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b18933] mx-auto mb-4"></div>
            <p className="text-gray-700">Carregando painel administrativo...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative" style={{ backgroundColor: "#cbcbcb" }}>
      {/* Pearl Mist Background with Top Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(226, 232, 240, 0.12), transparent 60%), #cbcbcb",
        }}
      />

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-gray-200/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                {/* Logo */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src="/novasimagens/logosource2.png"
                    alt="Source Hair Logo"
                    width={120}
                    height={40}
                    className="h-10 w-auto"
                  />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
                  <p className="text-sm text-gray-600">Bem-vindo, {user?.username}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#b18933] to-[#daa520] rounded-lg hover:from-[#9a7429] to-[#c19520] transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          {/* Dashboard Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <Card className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border border-[#b18933]/20 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">Total de Formulários</CardTitle>
                <Users className="h-4 w-4 text-[#b18933]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stats?.total || 0}</div>
                <p className="text-xs text-gray-600 mt-1">Todos os formulários recebidos</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-50/50 to-emerald-50/50 border border-[#b18933]/20 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">Formulários Completos</CardTitle>
                <CheckCircle className="h-4 w-4 text-[#b18933]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stats?.completed || 0}</div>
                <p className="text-xs text-gray-600 mt-1">Formulários finalizados</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-red-50/50 to-rose-50/50 border border-[#b18933]/20 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">Formulários Abandonados</CardTitle>
                <XCircle className="h-4 w-4 text-[#b18933]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stats?.abandoned || 0}</div>
                <div className="flex items-center mt-1">
                  {stats?.conversionRate && stats.conversionRate < 50 ? (
                    <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                  ) : (
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  )}
                  <p className="text-xs text-gray-600">
                    Taxa de conversão: {stats?.conversionRate?.toFixed(1) || 0}%
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tabs for different views */}
          <Tabs defaultValue="pending" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-white/50 backdrop-blur-sm border border-[#b18933]/20">
              <TabsTrigger 
                value="pending" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#b18933] data-[state=active]:to-[#daa520] data-[state=active]:text-white"
              >
                Pendentes de Análise
              </TabsTrigger>
              <TabsTrigger 
                value="selected"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#b18933] data-[state=active]:to-[#daa520] data-[state=active]:text-white"
              >
                Selecionados
              </TabsTrigger>
              <TabsTrigger 
                value="discarded"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#b18933] data-[state=active]:to-[#daa520] data-[state=active]:text-white"
              >
                Descartados
              </TabsTrigger>
              <TabsTrigger 
                value="abandoned"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#b18933] data-[state=active]:to-[#daa520] data-[state=active]:text-white"
              >
                Abandonados
              </TabsTrigger>
              <TabsTrigger 
                value="analysis"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#b18933] data-[state=active]:to-[#daa520] data-[state=active]:text-white"
              >
                Análise de Abandono
              </TabsTrigger>
            </TabsList>

            {/* Formulários Pendentes de Análise */}
            <TabsContent value="pending" className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Formulários Pendentes de Análise</h2>
                {completedSubmissions.length === 0 ? (
                  <Card className="bg-gradient-to-r from-amber-50/50 to-yellow-50/50 border border-[#b18933]/20 backdrop-blur-sm">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Users className="h-12 w-12 text-[#b18933] mb-4" />
                      <p className="text-gray-600 text-center">Nenhum formulário pendente de análise no momento.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4">
                    {completedSubmissions.map((submission) => (
                      <motion.div
                        key={submission.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="bg-gradient-to-r from-amber-50/50 to-yellow-50/50 border border-[#b18933]/20 backdrop-blur-sm hover:shadow-lg transition-all duration-200">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                              <div className="space-y-2">
                                <h3 className="font-semibold text-gray-900">{submission.nomeCompleto || 'Nome não informado'}</h3>
                                <p className="text-sm text-gray-600">{submission.telefone || 'Telefone não informado'}</p>
                                <div className="flex items-center space-x-2">
                                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                                    Completo
                                  </Badge>
                                  <span className="text-xs text-gray-500">
                                    {formatDate(submission.createdAt)}
                                  </span>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => setSelectedSubmission(submission)}
                                  className="flex items-center px-3 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-[#b18933] to-[#daa520] rounded-md hover:from-[#9a7429] hover:to-[#c19520] transition-all duration-200"
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  Ver Detalhes
                                </button>
                                <button
                                  onClick={() => handleAnalysis(submission.id, 'selected')}
                                  className="flex items-center px-3 py-1.5 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors duration-200"
                                >
                                  <ThumbsUp className="h-4 w-4 mr-1" />
                                  Selecionar
                                </button>
                                <button
                                  onClick={() => handleAnalysis(submission.id, 'discarded')}
                                  className="flex items-center px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors duration-200"
                                >
                                  <ThumbsDown className="h-4 w-4 mr-1" />
                                  Descartar
                                </button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </TabsContent>

            {/* Candidatos Selecionados */}
            <TabsContent value="selected" className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Candidatos Selecionados</h2>
                {selectedSubmissions.length === 0 ? (
                  <Card className="bg-gradient-to-r from-amber-50/50 to-yellow-50/50 border border-[#b18933]/20 backdrop-blur-sm">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <ThumbsUp className="h-12 w-12 text-[#b18933] mb-4" />
                      <p className="text-gray-600 text-center">Nenhum candidato selecionado ainda.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4">
                    {selectedSubmissions.map((submission) => (
                      <motion.div
                        key={submission.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="bg-gradient-to-r from-green-50/50 to-emerald-50/50 border border-[#b18933]/20 backdrop-blur-sm hover:shadow-lg transition-all duration-200">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                              <div className="space-y-2">
                                <h3 className="font-semibold text-gray-900">{submission.nomeCompleto}</h3>
                                <p className="text-sm text-gray-600">{submission.telefone}</p>
                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                  Selecionado
                                </Badge>
                              </div>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => setSelectedSubmission(submission)}
                                  className="flex items-center px-3 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-[#b18933] to-[#daa520] rounded-md hover:from-[#9a7429] hover:to-[#c19520] transition-all duration-200"
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  Ver Detalhes
                                </button>
                                <button
                                  onClick={() => handleDelete(submission.id)}
                                  className="flex items-center px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors duration-200"
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Excluir
                                </button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </TabsContent>

            {/* Candidatos Descartados */}
            <TabsContent value="discarded" className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Candidatos Descartados</h2>
                {discardedSubmissions.length === 0 ? (
                  <Card className="bg-gradient-to-r from-amber-50/50 to-yellow-50/50 border border-[#b18933]/20 backdrop-blur-sm">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <ThumbsDown className="h-12 w-12 text-[#b18933] mb-4" />
                      <p className="text-gray-600 text-center">Nenhum candidato descartado ainda.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4">
                    {discardedSubmissions.map((submission) => (
                      <motion.div
                        key={submission.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="bg-gradient-to-r from-red-50/50 to-rose-50/50 border border-[#b18933]/20 backdrop-blur-sm hover:shadow-lg transition-all duration-200">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                              <div className="space-y-2">
                                <h3 className="font-semibold text-gray-900">{submission.nomeCompleto}</h3>
                                <p className="text-sm text-gray-600">{submission.telefone}</p>
                                <Badge variant="secondary" className="bg-red-100 text-red-800">
                                  Descartado
                                </Badge>
                              </div>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => setSelectedSubmission(submission)}
                                  className="flex items-center px-3 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-[#b18933] to-[#daa520] rounded-md hover:from-[#9a7429] hover:to-[#c19520] transition-all duration-200"
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  Ver Detalhes
                                </button>
                                <button
                                  onClick={() => handleDelete(submission.id)}
                                  className="flex items-center px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors duration-200"
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Excluir
                                </button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </TabsContent>

            {/* Formulários Abandonados */}
            <TabsContent value="abandoned" className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Formulários Abandonados</h2>
                {abandonedSubmissions.length === 0 ? (
                  <Card className="bg-gradient-to-r from-amber-50/50 to-yellow-50/50 border border-[#b18933]/20 backdrop-blur-sm">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <XCircle className="h-12 w-12 text-[#b18933] mb-4" />
                      <p className="text-gray-600 text-center">Nenhum formulário abandonado encontrado.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4">
                    {abandonedSubmissions.map((submission) => (
                      <motion.div
                        key={submission.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="bg-gradient-to-r from-orange-50/50 to-amber-50/50 border border-[#b18933]/20 backdrop-blur-sm hover:shadow-lg transition-all duration-200">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                              <div className="space-y-2">
                                <h3 className="font-semibold text-gray-900">{submission.nomeCompleto || 'Nome não informado'}</h3>
                                <p className="text-sm text-gray-600">Etapa atual: {submission.currentStep}</p>
                                <div className="flex items-center space-x-2">
                                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                                    Abandonado
                                  </Badge>
                                  <span className="text-xs text-gray-500">
                                    Última atividade: {formatDate(submission.updatedAt)}
                                  </span>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => setSelectedSubmission(submission)}
                                  className="flex items-center px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#b18933] to-[#daa520] rounded-lg hover:from-[#9a7429] to-[#c19520] transition-all duration-200"
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  Ver Detalhes
                                </button>
                                <button
                                  onClick={() => handleDelete(submission.id)}
                                  className="flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Excluir
                                </button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </TabsContent>

            {/* Análise de Abandono */}
            <TabsContent value="analysis" className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Análise de Abandono por Etapa</h2>
                {stats?.abandonedByStep && stats.abandonedByStep.length > 0 ? (
                  <div className="grid gap-4">
                    {stats.abandonedByStep.map((stepData) => (
                      <motion.div
                        key={stepData.step}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="bg-gradient-to-r from-purple-50/50 to-indigo-50/50 border border-[#b18933]/20 backdrop-blur-sm">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-center">
                              <div>
                                <h3 className="font-semibold text-gray-900">
                                  Etapa {stepData.step}
                                </h3>
                                <p className="text-sm text-gray-600">{getStepName(stepData.step)}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-[#b18933]">{stepData.count}</div>
                                <p className="text-sm text-gray-600">abandonos</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <Card className="bg-gradient-to-r from-amber-50/50 to-yellow-50/50 border border-[#b18933]/20 backdrop-blur-sm">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <BarChart3 className="h-12 w-12 text-[#b18933] mb-4" />
                      <p className="text-gray-600 text-center">Nenhum dado de abandono disponível para análise.</p>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            </TabsContent>
          </Tabs>

          {/* Modal de Detalhes */}
          {selectedSubmission && (
            <div className="fixed inset-0 bg-white/20 backdrop-blur-md flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Detalhes do Formulário</h2>
                    <button
                      onClick={() => setSelectedSubmission(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Informações Básicas */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 p-6 rounded-xl border border-[#b18933]/20 backdrop-blur-sm"
                    >
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <Users className="h-5 w-5 mr-2 text-[#b18933]" />
                        Informações Básicas
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm font-medium text-[#b18933]">Nome Completo</label>
                          <p className="text-sm text-gray-900 mt-1">{selectedSubmission.nomeCompleto || 'Não informado'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-[#b18933]">Idade</label>
                          <p className="text-sm text-gray-900 mt-1">{selectedSubmission.idade || 'Não informado'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-[#b18933]">Cidade e Estado</label>
                          <p className="text-sm text-gray-900 mt-1">{selectedSubmission.cidadeEstado || 'Não informado'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-[#b18933]">Telefone/WhatsApp</label>
                          <p className="text-sm text-gray-900 mt-1">{selectedSubmission.telefone || 'Não informado'}</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Redes Sociais */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 p-6 rounded-xl border border-[#b18933]/20 backdrop-blur-sm"
                    >
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <Users className="h-5 w-5 mr-2 text-[#b18933]" />
                        Redes Sociais
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-[#b18933]">@ Instagram/TikTok</label>
                          <p className="text-sm text-gray-900 mt-1">{selectedSubmission.instagram || 'Não informado'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-[#b18933]">Número de Seguidores</label>
                          <p className="text-sm text-gray-900 mt-1">{selectedSubmission.seguidores || 'Não informado'}</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Experiência e Preferências */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-gradient-to-r from-amber-50/50 to-yellow-50/50 p-6 rounded-xl border border-[#b18933]/20 backdrop-blur-sm"
                    >
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <Settings className="h-5 w-5 mr-2 text-[#b18933]" />
                        Experiência e Preferências
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-[#b18933]">Você já utiliza prótese capilar ou seria sua primeira experiência?</label>
                          <p className="text-sm text-gray-900 mt-1">{selectedSubmission.experienciaProtese || selectedSubmission.experiencia || 'Não informado'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-[#b18933]">Você tem facilidade em gravar vídeos e aparecer nas câmeras?</label>
                          <p className="text-sm text-gray-900 mt-1">{selectedSubmission.facilidadeVideos || selectedSubmission.disponibilidade || 'Não informado'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-[#b18933]">Você autoriza o uso da sua imagem em campanhas de marketing da marca?</label>
                          <p className="text-sm text-gray-900 mt-1">{selectedSubmission.autorizacaoImagem || 'Não informado'}</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Status e Informações do Sistema */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-gradient-to-r from-amber-50/50 to-yellow-50/50 p-6 rounded-xl border border-[#b18933]/20 backdrop-blur-sm"
                    >
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <Settings className="h-5 w-5 mr-2 text-[#b18933]" />
                        Status e Informações do Sistema
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm font-medium text-[#b18933]">Status</label>
                          <div className="mt-1">
                            <Badge 
                              variant="secondary" 
                              className={selectedSubmission.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                            >
                              {selectedSubmission.status === 'completed' ? 'Concluído' : 'Abandonado'}
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-[#b18933]">Etapa Atual</label>
                          <p className="text-sm text-gray-900 mt-1">Etapa {selectedSubmission.currentStep} de 9</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-[#b18933]">Progresso</label>
                          <p className="text-sm text-gray-900 mt-1">{Math.round((selectedSubmission.currentStep / 9) * 100)}%</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Datas */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-gradient-to-r from-amber-50/50 to-yellow-50/50 p-6 rounded-xl border border-[#b18933]/20 backdrop-blur-sm"
                    >
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-[#b18933]" />
                        Informações de Data
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-[#b18933]">Criado em</label>
                          <p className="text-sm text-gray-900 mt-1">{formatDate(selectedSubmission.createdAt)}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-[#b18933]">Última atualização</label>
                          <p className="text-sm text-gray-900 mt-1">{formatDate(selectedSubmission.updatedAt)}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}