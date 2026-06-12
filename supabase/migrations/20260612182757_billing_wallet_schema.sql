-- ============================================================
-- MIGRAÇÃO: Sistema de Carteira Pré-Paga (Wallet/Credits)
-- Modelo: Usuário compra créditos via Stripe → usa app → saldo decrementa.
-- Sem saldo = sem acesso à IA.
-- ============================================================

-- ──────────────────────────────────────────────────────────────
-- 1. TABELA: user_billing
-- Vincula o usuário do Supabase ao Customer do Stripe.
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_billing (
  user_id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT UNIQUE NOT NULL,
  -- 'active' = pode usar o app | 'suspended' = bloqueado (ex: chargeback)
  status             TEXT NOT NULL DEFAULT 'active',
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS: cada usuário vê apenas os próprios dados de billing
ALTER TABLE public.user_billing ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_billing_select_own"
  ON public.user_billing FOR SELECT
  USING (auth.uid() = user_id);

-- ──────────────────────────────────────────────────────────────
-- 2. TABELA: credit_transactions
-- Livro-razão (ledger) de TODAS as movimentações de crédito.
-- Saldo = SUM(amount_brl). Positivo = TOP_UP, Negativo = USAGE.
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.credit_transactions (
  id                        UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                   UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- 'TOP_UP' = recarga paga | 'USAGE' = consumo de IA
  type                      TEXT        NOT NULL CHECK (type IN ('TOP_UP', 'USAGE')),

  -- Valor em BRL. TOP_UP: positivo (ex: 30.0000). USAGE: negativo (ex: -0.0030).
  amount_brl                NUMERIC(10,4) NOT NULL,

  -- Quantidade de tokens consumidos (NULL para TOP_UP)
  tokens                    INTEGER,

  -- Descrição legível (ex: "Recarga R$30" ou "Chat - 1.240 tokens")
  description               TEXT,

  -- Chave de idempotência: evita creditar a mesma fatura duas vezes
  stripe_payment_intent_id  TEXT UNIQUE,

  created_at                TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Índices para queries rápidas de saldo e histórico
CREATE INDEX IF NOT EXISTS idx_credit_transactions_user_id
  ON public.credit_transactions (user_id);

CREATE INDEX IF NOT EXISTS idx_credit_transactions_created_at
  ON public.credit_transactions (user_id, created_at DESC);

-- RLS: cada usuário vê apenas o próprio histórico
ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "credit_transactions_select_own"
  ON public.credit_transactions FOR SELECT
  USING (auth.uid() = user_id);

-- ──────────────────────────────────────────────────────────────
-- 3. FUNÇÃO: get_user_balance(p_user_id)
-- Retorna o saldo atual em BRL calculado pelo SUM do ledger.
-- Usada pelas Edge Functions com Service Role (sem RLS bypass).
-- ──────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.get_user_balance(p_user_id UUID)
RETURNS NUMERIC(10,4)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT COALESCE(SUM(amount_brl), 0)
  FROM public.credit_transactions
  WHERE user_id = p_user_id;
$$;
