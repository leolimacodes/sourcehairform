-- Script para inicializar as tabelas no PostgreSQL da Vercel
-- Execute este script no dashboard do Vercel Postgres após criar o banco

-- Tabela de submissões de formulário
CREATE TABLE IF NOT EXISTS form_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    "hairType" VARCHAR(100),
    "hairLength" VARCHAR(50),
    "hairColor" VARCHAR(50),
    "hairTexture" VARCHAR(50),
    "scalpCondition" VARCHAR(100),
    "hairConcerns" TEXT,
    "currentProducts" TEXT,
    "allergies" TEXT,
    "lifestyle" TEXT,
    "budgetRange" VARCHAR(50),
    "previousTreatments" TEXT,
    "expectations" TEXT,
    "additionalInfo" TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    "analysisStatus" VARCHAR(20) DEFAULT 'pending',
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de usuários admin
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    "passwordHash" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_form_submissions_status ON form_submissions(status);
CREATE INDEX IF NOT EXISTS idx_form_submissions_analysis_status ON form_submissions("analysisStatus");
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON form_submissions("createdAt");
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username);