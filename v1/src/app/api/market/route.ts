// src/app/api/market/route.ts
import { NextResponse } from 'next/server'


// Keep the types narrow to reduce payload size to the client
export interface TokenMarket {
id: string
symbol: string
name: string
image: string
current_price: number | null
market_cap: number | null
market_cap_rank: number | null
total_volume: number | null
circulating_supply: number | null
total_supply: number | null
price_change_percentage_1h_in_currency: number | null
price_change_percentage_24h_in_currency: number | null
price_change_percentage_7d_in_currency: number | null
sparkline_in_7d?: { price: number[] }
}


const BASE = 'https://api.coingecko.com/api/v3/coins/markets'


export async function GET(req: Request) {
const { searchParams } = new URL(req.url)
const vs = (searchParams.get('vs') || 'usd').toLowerCase()
const per_page = Number(searchParams.get('per_page') || 50)


const url = `${BASE}?vs_currency=${vs}&order=market_cap_desc&per_page=${per_page}&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en`


try {
const res = await fetch(url, { cache: 'no-store', headers: { accept: 'application/json' } })
if (!res.ok) return NextResponse.json({ error: 'Upstream error' }, { status: res.status })


const data = (await res.json()) as TokenMarket[]
return NextResponse.json(data, {
headers: {
'Cache-Control': 'no-store',
},
})
} catch (e) {
return NextResponse.json({ error: 'Failed to fetch market' }, { status: 500 })
}
}