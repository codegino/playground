import { SupabaseClient } from "@supabase/supabase-js";
import React from "react";

export const SupabaseContext = React.createContext<SupabaseClient>(
  null as unknown as SupabaseClient
);

export const SupabaseProvider: React.FC<{ supabase: SupabaseClient }> = ({
  children,
  supabase,
}) => (
  <SupabaseContext.Provider value={supabase}>
    {children}
  </SupabaseContext.Provider>
);

export const useSupabase = () => React.useContext(SupabaseContext);
