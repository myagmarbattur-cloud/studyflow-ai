# STUDYFLOW AI

Монгол хэл дээрх Minimal White суралцах самбарын runnable Next.js App Router MVP.

## Ажиллуулах

```bash
npm install
npm run dev
```

`http://localhost:3000` хаягаар нээнэ үү.

## Боломжууд

- Даалгавар нэмэх, гүйцээх, устгах
- Даалгаврыг `localStorage`-д хадгалах
- 3 жишээ асуулттай квиз, зөв хариултын тайлбар
- Флаш карт эргүүлэх болон дараагийн карт руу шилжих
- Хадгалсан даалгавар, квизийн оролдлогоос ахицийн статистик тооцох
- Бодит AI биш гэдгийг тодорхой тэмдэглэсэн AI багшийн демо дэлгэц

## Дараагийн үе шат: Supabase Auth/Postgres/RLS

Эхний runnable commit нь гаднын үйлчилгээ, нууц түлхүүр ашиглахгүй бөгөөд зөвхөн браузерийн `localStorage` ашиглана. Дараагийн үе шатанд Supabase төслийг холбоно:

1. Supabase Auth ашиглан email/password бүртгэл, нэвтрэлтийг нэмнэ.
2. `profiles`, `tasks`, `quiz_attempts` хүснэгтүүдийг Postgres дээр үүсгэнэ.
3. Бүх хүснэгтэд RLS идэвхжүүлж, хэрэглэгч зөвхөн өөрийн `user_id` мөрүүдийг унших/өөрчлөх бодлого үүсгэнэ.
4. `NEXT_PUBLIC_SUPABASE_URL` болон `NEXT_PUBLIC_SUPABASE_ANON_KEY` хувьсагчдыг Vercel-ийн Vars хэсэгт нэмнэ.
5. `localStorage`-ийн үйлдлүүдийг Supabase client болон серверийн хамгаалагдсан query-гаар солино.
