import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { MateriaConfig, EncerramentoForm } from '@/types';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Props {
  materia: MateriaConfig;
  nivelAtual: number;
  open: boolean;
  onClose: () => void;
}

export default function EncerramentoModal({ materia, nivelAtual, open, onClose }: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const hoje = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState<EncerramentoForm>({
    topico: '',
    data: hoje,
    duracao_min: null,
    erros: 0,
    dificuldade: 'medio',
    proximo_topico: '',
    decisao_proxima: 'avancar',
    observacoes: '',
    nivel: nivelAtual,
  });
  const [saving, setSaving] = useState(false);

  const update = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!form.topico.trim()) {
      toast({ title: 'Preencha o tópico estudado', variant: 'destructive' });
      return;
    }

    setSaving(true);
    const { error } = await supabase.from('sessoes').insert({
      materia: materia.slug,
      topico: form.topico,
      data: form.data,
      duracao_min: form.duracao_min,
      erros: form.erros,
      dificuldade: form.dificuldade,
      proximo_topico: form.proximo_topico || null,
      decisao_proxima: form.decisao_proxima,
      observacoes: form.observacoes || null,
      nivel: form.nivel,
    });

    if (error) {
      toast({ title: 'Erro ao salvar', description: error.message, variant: 'destructive' });
      setSaving(false);
      return;
    }

    queryClient.invalidateQueries({ queryKey: ['sessoes'] });
    toast({ title: 'Sessão salva!' });
    navigate('/');
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className={cn(
        'relative z-10 w-full max-w-lg bg-card border border-border rounded-t-2xl sm:rounded-2xl',
        'max-h-[90vh] overflow-y-auto',
        'shadow-xl'
      )}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border sticky top-0 bg-card rounded-t-2xl">
          <h2 className="text-base font-semibold">Encerrar sessão</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <div className="px-5 py-4 space-y-4">
          {/* Tópico */}
          <Field label="Tópico estudado *">
            <input
              value={form.topico}
              onChange={e => update('topico', e.target.value)}
              className="input-field"
              placeholder="Ex: Equações do 2º grau"
            />
          </Field>

          {/* Data + Duração */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Data">
              <input
                type="date"
                value={form.data}
                onChange={e => update('data', e.target.value)}
                className="input-field"
              />
            </Field>
            <Field label="Duração (min)">
              <input
                type="number"
                value={form.duracao_min || ''}
                onChange={e => update('duracao_min', e.target.value ? parseInt(e.target.value) : null)}
                className="input-field"
                placeholder="30"
              />
            </Field>
          </div>

          {/* Erros + Dificuldade */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Erros">
              <input
                type="number"
                value={form.erros}
                onChange={e => update('erros', parseInt(e.target.value) || 0)}
                className="input-field"
                min={0}
              />
            </Field>
            <Field label="Dificuldade">
              <select
                value={form.dificuldade}
                onChange={e => update('dificuldade', e.target.value)}
                className="input-field"
              >
                <option value="facil">Fácil</option>
                <option value="medio">Médio</option>
                <option value="dificil">Difícil</option>
              </select>
            </Field>
          </div>

          {/* Nível */}
          <Field label="Nível">
            <div className="flex gap-2">
              {[1, 2, 3].map(n => (
                <button
                  key={n}
                  onClick={() => update('nivel', n)}
                  className={cn(
                    'flex-1 py-2 rounded-lg text-sm font-medium transition-all',
                    form.nivel === n
                      ? 'bg-foreground text-background'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
          </Field>

          {/* Próximo tópico */}
          <Field label="Próximo tópico">
            <input
              value={form.proximo_topico}
              onChange={e => update('proximo_topico', e.target.value)}
              className="input-field"
              placeholder="Ex: Função quadrática"
            />
          </Field>

          {/* Decisão */}
          <Field label="Próxima sessão">
            <div className="flex gap-2">
              {[
                { value: 'avancar', label: 'Avançar' },
                { value: 'reforcar', label: 'Reforçar' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => update('decisao_proxima', opt.value)}
                  className={cn(
                    'flex-1 py-2 rounded-lg text-sm font-medium transition-all',
                    form.decisao_proxima === opt.value
                      ? 'bg-foreground text-background'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </Field>

          {/* Observações */}
          <Field label="Observações">
            <textarea
              value={form.observacoes}
              onChange={e => update('observacoes', e.target.value)}
              className="input-field min-h-[60px] resize-none"
              placeholder="Anotações sobre a sessão..."
              rows={2}
            />
          </Field>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-border sticky bottom-0 bg-card">
          <button
            onClick={handleSave}
            disabled={saving}
            className={cn(
              'w-full py-2.5 rounded-xl text-sm font-medium',
              'bg-foreground text-background',
              'hover:opacity-90 transition-opacity',
              'disabled:opacity-50'
            )}
          >
            {saving ? 'Salvando...' : 'Salvar sessão'}
          </button>
        </div>
      </div>

      <style>{`
        .input-field {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--muted) / 0.5);
          font-size: 0.875rem;
          color: hsl(var(--foreground));
          outline: none;
          transition: border-color 0.15s;
        }
        .input-field:focus {
          border-color: hsl(var(--ring));
        }
        .input-field::placeholder {
          color: hsl(var(--muted-foreground) / 0.5);
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[13px] font-medium text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}
