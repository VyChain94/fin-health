import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { assetType, ticker } = await req.json();

    if (!assetType || !ticker) {
      throw new Error('Asset type and ticker are required');
    }

    let price = 0;

    if (assetType === 'crypto') {
      // Use CoinGecko API (free, no API key required)
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ticker.toLowerCase()}&vs_currencies=usd`
      );
      const data = await response.json();
      price = data[ticker.toLowerCase()]?.usd || 0;
    } else if (assetType === 'stock') {
      // Use Yahoo Finance alternative API
      const response = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/${ticker.toUpperCase()}`
      );
      const data = await response.json();
      price = data?.chart?.result?.[0]?.meta?.regularMarketPrice || 0;
    }

    return new Response(
      JSON.stringify({ 
        price,
        ticker,
        assetType,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
