import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { BrainCircuit, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Bem-vindo(a) de volta!");
        navigate(from, { replace: true });
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        
        if (data.session) {
          toast.success("Conta criada! Você já pode acessar.");
          navigate(from, { replace: true });
        } else {
          toast.success("Conta criada! Confirme seu e-mail ou faça login para acessar.");
          setIsLogin(true);
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Erro na autenticação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {/* Background Blobs for Glassmorphism effect */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md z-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            {isLogin ? 'Bem-vindo de volta' : 'Criar nova conta'}
          </h1>
          <p className="text-muted-foreground mt-2 text-center">
            Acesse sua plataforma de estudos para continuar.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card/80 backdrop-blur-xl border border-border shadow-2xl rounded-3xl p-8 space-y-6">
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground/90">E-mail</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full px-4 py-3 bg-muted/50 border border-input focus:border-primary focus:ring-1 focus:ring-primary rounded-xl outline-none transition-all placeholder:text-muted-foreground/50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground/90">Senha</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-muted/50 border border-input focus:border-primary focus:ring-1 focus:ring-primary rounded-xl outline-none transition-all placeholder:text-muted-foreground/50"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-medium text-lg hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 flex justify-center items-center shadow-lg shadow-primary/20"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (isLogin ? 'Entrar' : 'Criar Conta')}
          </button>

          <div className="text-center pt-6 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Não tem uma conta?" : "Já possui uma conta?"}
              <button 
                type="button" 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-primary font-medium hover:underline"
              >
                {isLogin ? "Cadastre-se" : "Faça Login"}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
