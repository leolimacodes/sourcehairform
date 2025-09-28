# 🚀 Deploy na Hostinger - Guia Completo

## ✅ Build Concluído com Sucesso!

O build do seu sistema foi gerado com sucesso na pasta `.next`. Agora você pode fazer o deploy na Hostinger.

## 📁 Arquivos Necessários para Upload

Você precisa fazer upload dos seguintes arquivos/pastas para a Hostinger:

### 🔥 **ARQUIVOS OBRIGATÓRIOS:**
```
📦 Pasta do projeto/
├── 📁 .next/                    ← PASTA PRINCIPAL DO BUILD
├── 📁 public/                   ← Imagens e arquivos estáticos
├── 📁 node_modules/             ← Dependências (se não instalar no servidor)
├── 📄 package.json              ← Lista de dependências
├── 📄 package-lock.json         ← Versões exatas das dependências
├── 📄 next.config.mjs           ← Configurações do Next.js
├── 📄 .env.local                ← Variáveis de ambiente (IMPORTANTE!)
└── 📄 database.sqlite           ← Banco de dados
```

## 🌐 Passos para Deploy na Hostinger

### 1️⃣ **Preparar o Ambiente**
- Acesse o painel da Hostinger
- Vá para "Gerenciador de Arquivos" ou use FTP
- Navegue até a pasta `public_html` (ou pasta do seu domínio)

### 2️⃣ **Upload dos Arquivos**
- Faça upload de TODOS os arquivos listados acima
- **IMPORTANTE:** Mantenha a estrutura de pastas exatamente igual

### 3️⃣ **Configurar Node.js na Hostinger**
- No painel da Hostinger, vá em "Node.js"
- Selecione a versão mais recente (18+ recomendado)
- Defina o "Entry Point" como: `server.js` ou `.next/standalone/server.js`

### 4️⃣ **Instalar Dependências**
Execute no terminal da Hostinger:
```bash
npm install
```

### 5️⃣ **Configurar Variáveis de Ambiente**
- Crie um arquivo `.env.production` com:
```env
NODE_ENV=production
```

### 6️⃣ **Iniciar a Aplicação**
```bash
npm start
```

## 🔧 Configurações Importantes

### **Para Hostinger Shared Hosting:**
Se você está usando hospedagem compartilhada, pode precisar:

1. **Criar um arquivo `.htaccess`:**
```apache
RewriteEngine On
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
```

2. **Ou usar o modo estático** (adicione no `next.config.mjs`):
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

export default nextConfig
```

### **Para VPS/Dedicado:**
- Use PM2 para manter a aplicação rodando:
```bash
npm install -g pm2
pm2 start npm --name "source-hair-form" -- start
pm2 startup
pm2 save
```

## 📋 Checklist Final

- [ ] ✅ Build gerado (pasta `.next` existe)
- [ ] ✅ Arquivos enviados para Hostinger
- [ ] ✅ Node.js configurado no painel
- [ ] ✅ Dependências instaladas (`npm install`)
- [ ] ✅ Variáveis de ambiente configuradas
- [ ] ✅ Aplicação iniciada (`npm start`)
- [ ] ✅ Domínio apontando corretamente
- [ ] ✅ Banco de dados funcionando

## 🆘 Problemas Comuns

### **Erro: "Module not found"**
- Certifique-se que executou `npm install`
- Verifique se o `package.json` foi enviado

### **Erro: "Database locked"**
- Verifique permissões do arquivo `database.sqlite`
- Pode precisar recriar o banco no servidor

### **Erro: "Port already in use"**
- Mude a porta no `package.json` ou use a porta fornecida pela Hostinger

## 🎉 Sucesso!

Se tudo deu certo, seu sistema estará rodando em:
`https://seudominio.com`

**Painel Admin:** `https://seudominio.com/admin`
**Formulário:** `https://seudominio.com/formulario`

---

💡 **Dica:** Mantenha sempre um backup dos arquivos antes de fazer alterações!