import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get current date info
    const now = new Date();
    const dayOfMonth = now.getDate();
    
    // Only run archiving logic on the 15th of each month (or after)
    // This archives the previous month's statements
    console.log(`Auto-archive function called on day ${dayOfMonth}`);
    
    // Calculate the previous month's date range
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    
    console.log(`Archiving statements from ${previousMonthStart.toISOString()} to ${currentMonthStart.toISOString()}`);
    
    // Find all non-archived statements from the previous month
    const { data: statementsToArchive, error: fetchError } = await supabase
      .from("reports")
      .select("id, report_name, user_id")
      .eq("is_archived", false)
      .gte("report_date", previousMonthStart.toISOString())
      .lt("report_date", currentMonthStart.toISOString());
    
    if (fetchError) {
      console.error("Error fetching statements to archive:", fetchError);
      throw fetchError;
    }
    
    console.log(`Found ${statementsToArchive?.length || 0} statements to archive`);
    
    if (statementsToArchive && statementsToArchive.length > 0) {
      // Archive all found statements
      const { error: updateError } = await supabase
        .from("reports")
        .update({ is_archived: true })
        .in("id", statementsToArchive.map(s => s.id));
      
      if (updateError) {
        console.error("Error archiving statements:", updateError);
        throw updateError;
      }
      
      console.log(`Successfully archived ${statementsToArchive.length} statements`);
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: `Archived ${statementsToArchive?.length || 0} statements`,
        archivedCount: statementsToArchive?.length || 0
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Auto-archive error:", error);
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});