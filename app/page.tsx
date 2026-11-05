"use client";

import { useState } from "react";

export default function Home() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function sendOTP() {
    if (!/^7[0-9]{8}$/.test(phone)) {
      setError("شماره موبایل باید ۹ رقم باشد و با 7 شروع شود.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: "+93" + phone }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "ارسال کد ناموفق بود");

      setStep(2);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function verifyOTP() {
    if (!/^[0-9]{6}$/.test(otp)) {
      setError("کد تأیید باید ۶ رقم باشد.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: "+93" + phone,
          code: otp,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "کد تأیید اشتباه است");

      window.location.href = "/";
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main dir="rtl" style={{
      minHeight: "100vh",
      background: "#f1f5f9",
      fontFamily: "Tahoma, sans-serif",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 20
    }}>
      <div style={{
        background: "white",
        width: "100%",
        maxWidth: 420,
        padding: 28,
        borderRadius: 22,
        boxShadow: "0 8px 35px #0001",
        textAlign: "center"
      }}>
        <div style={{ fontSize: 55 }}>🇦🇫</div>

        <h1 style={{ color: "#087443" }}>
          افغان بازار
        </h1>

        <p style={{ color: "#64748b" }}>
          بازار آنلاین افغانستان
        </p>

        {step === 1 ? (
          <>
            <h3>ثبت‌نام و ورود</h3>

            <p>شماره موبایل افغانستان خود را وارد کنید.</p>

            <div style={{
              display: "flex",
              gap: 8,
              marginTop: 20
            }}>
              <div style={{
                background: "#e2e8f0",
                padding: 15,
                borderRadius: 10
              }}>
                +93
              </div>

              <input
                type="tel"
                inputMode="numeric"
                value={phone}
                onChange={e =>
                  setPhone(e.target.value.replace(/\D/g, "").slice(0, 9))
                }
                placeholder="شماره موبایل"
                style={{
                  flex: 1,
                  minWidth: 0,
                  padding: 14,
                  border: "1px solid #cbd5e1",
                  borderRadius: 10,
                  fontSize: 16
                }}
              />
            </div>

            <button
              onClick={sendOTP}
              disabled={loading}
              style={buttonStyle}
            >
              {loading ? "در حال ارسال..." : "ارسال کد تأیید"}
            </button>
          </>
        ) : (
          <>
            <h3>تأیید شماره موبایل</h3>

            <p>کد ۶ رقمی ارسال‌شده را وارد کنید.</p>

            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={e =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder="------"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: 16,
                marginTop: 20,
                textAlign: "center",
                fontSize: 25,
                letterSpacing: 8,
                border: "1px solid #cbd5e1",
                borderRadius: 10
              }}
            />

            <button
              onClick={verifyOTP}
              disabled={loading}
              style={buttonStyle}
            >
              {loading ? "در حال بررسی..." : "تأیید و ورود"}
            </button>

            <button
              onClick={() => {
                setStep(1);
                setOtp("");
                setError("");
              }}
              style={{
                background: "none",
                border: 0,
                color: "#087443",
                padding: 15
              }}
            >
              تغییر شماره موبایل
            </button>
          </>
        )}

        {error && (
          <p style={{ color: "red", fontSize: 13 }}>
            {error}
          </p>
        )}

        <hr style={{ margin: "25px 0", borderColor: "#eee" }} />

        <p style={{ fontSize: 12, color: "#94a3b8" }}>
          خرید و فروش آسان در سراسر افغانستان
        </p>
      </div>
    </main>
  );
}

const buttonStyle = {
  width: "100%",
  padding: 16,
  marginTop: 20,
  background: "#087443",
  color: "white",
  border: 0,
  borderRadius: 10,
  fontSize: 16,
  fontWeight: "bold" as const,
  cursor: "pointer"
};
"use client";

import { useState } from "react";

const products = [
  { id: 1, name: "گوشی موبایل سامسونگ", price: "۱۸٬۵۰۰", category: "موبایل", icon: "📱" },
  { id: 2, name: "لپ‌تاپ حرفه‌ای", price: "۳۵٬۰۰۰", category: "کمپیوتر", icon: "💻" },
  { id: 3, name: "ساعت هوشمند", price: "۲٬۵۰۰", category: "لوازم جانبی", icon: "⌚" },
  { id: 4, name: "هدفون بلوتوث", price: "۱٬۲۰۰", category: "لوازم جانبی", icon: "🎧" },
  { id: 5, name: "لباس مردانه", price: "۱٬۵۰۰", category: "پوشاک", icon: "👕" },
  { id: 6, name: "موتر مدرن", price: "۸۵۰٬۰۰۰", category: "موتر", icon: "🚗" },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("همه");
  const [cart, setCart] = useState(0);

  const categories = ["همه", "موبایل", "کمپیوتر", "لوازم جانبی", "پوشاک", "موتر"];

  const filtered = products.filter(p =>
    p.name.includes(search) &&
    (category === "همه" || p.category === category)
  );

  return (
    <main dir="rtl" style={{
      minHeight: "100vh",
      background: "#f4f7f5",
      fontFamily: "Tahoma, sans-serif",
      color: "#18352a"
    }}>
      <header style={{
        background: "#075b3c",
        color: "white",
        padding: "22px 16px",
        borderRadius: "0 0 24px 24px"
      }}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <div>
            <h2 style={{margin:0}}>🛍️ Alkozi Market</h2>
            <small>بازار آنلاین افغانستان</small>
          </div>
          <button onClick={() => alert("تعداد کالاها: " + cart)}
            style={{padding:12, border:0, borderRadius:12}}>
            🛒 سبد خرید ({cart})
          </button>
        </div>

        <h2 style={{marginTop:30}}>به افغان بازار خوش آمدید!</h2>
        <p>بهترین محصولات را با قیمت مناسب پیدا کنید.</p>

        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="🔍 جستجوی محصولات..."
          style={{
            width:"100%",
            padding:15,
            borderRadius:12,
            border:0,
            boxSizing:"border-box",
            fontSize:15
          }}
        />
      </header>

      <section style={{padding:16}}>
        <h3>دسته‌بندی محصولات</h3>

        <div style={{
          display:"flex",
          gap:8,
          overflowX:"auto",
          paddingBottom:12
        }}>
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              style={{
                padding:"11px 16px",
                borderRadius:20,
                border:0,
                whiteSpace:"nowrap",
                background:category===c ? "#087747" : "white",
                color:category===c ? "white" : "#18352a"
              }}>
              {c}
            </button>
          ))}
        </div>

        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(2,minmax(0,1fr))",
          gap:12
        }}>
          {filtered.map(p => (
            <article key={p.id} style={{
              background:"white",
              borderRadius:16,
              padding:12,
              boxShadow:"0 3px 12px #0000000b"
            }}>
              <div style={{
                background:"#e8f4ed",
                borderRadius:12,
                height:110,
                display:"grid",
                placeItems:"center",
                fontSize:55
              }}>{p.icon}</div>

              <h4>{p.name}</h4>
              <p style={{color:"#087747",fontWeight:"bold"}}>
                {p.price} افغانی
              </p>

              <button onClick={() => setCart(cart+1)}
                style={{
                  width:"100%",
                  padding:11,
                  background:"#087747",
                  color:"white",
                  border:0,
                  borderRadius:10
                }}>
                افزودن به سبد 🛒
              </button>
            </article>
          ))}
        </div>

        {filtered.length===0 && <p>محصولی پیدا نشد.</p>}
      </section>

      <footer style={{
        background:"#075b3c",
        color:"white",
        padding:25,
        textAlign:"center",
        marginTop:30
      }}>
        <h3>Alkozi Market</h3>
        <p>بازار شما، انتخاب شما</p>
        <p>© 2026 تمام حقوق محفوظ است.</p>
      </footer>
    </main>
  );
}
