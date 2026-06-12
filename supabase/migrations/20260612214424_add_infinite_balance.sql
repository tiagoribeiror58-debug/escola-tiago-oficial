-- Adiciona R$ 100.000,00 de crédito para o usuário principal (Tiago Ribeiro)
INSERT INTO public.credit_transactions (user_id, amount_brl, type, description)
VALUES ('ba10b3a5-82ae-485b-969d-0bd0a9adf8d2', 100000.00, 'TOP_UP', 'Admin Infinite Credits');
