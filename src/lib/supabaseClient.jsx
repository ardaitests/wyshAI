import React from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://usufzcktftvaclhpscox.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzdWZ6Y2t0ZnR2YWNsaHBzY294Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNjM1MTYsImV4cCI6MjA2MjczOTUxNn0.QbT2B6IK3j_ol0_YLhiW6aIFR7Dfh6aS8yVXFYHzzkw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);