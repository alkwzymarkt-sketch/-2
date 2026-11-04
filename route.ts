import { z } from 'zod';
const schema=z.object({phone:z.string().regex(/^\+937\d{8}$/,'شماره باید با فرمت +937XXXXXXXX باشد')});
export async function POST(req:Request){const body=await req.json().catch(()=>null);const parsed=schema.safeParse(body);if(!parsed.success)return Response.json({error:'شماره افغانستان معتبر نیست',details:parsed.error.flatten()},{status:400});return Response.json({error:'SMS provider is not configured. No OTP was sent.',phone:parsed.data.phone},{status:503});}
