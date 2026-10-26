import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    "https://bgnhonfcmynmtywfmphq.supabase.co",
    "sb_publishable_VRszRdd0Hb2HvOoFlDDrgg_z0WX5J_e",
  );
}
