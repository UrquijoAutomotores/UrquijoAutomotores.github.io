const SUPABASE_URL = 'https://chifqtfzhymxmalxmbmu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoaWZxdGZ6aHlteG1hbHhtYm11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc0ODcxNTcsImV4cCI6MjEwMzA2MzE1N30.uM640DOTaSN1hSjvWeeYuRAVAFogSZ_2lqFwKbvrtrM';

// Inicializar el cliente (asumiendo que la librería de supabase ya se cargó por CDN)
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
