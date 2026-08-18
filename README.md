# HASAD API — Vercel + GitHub

مشروع جاهز لـ GitHub ثم Vercel، مع الحفاظ على مسارات التوافق القديمة الخاصة بتسجيل الدخول والإعدادات.

## المسارات

- `POST /connect`
- `GET /bypass/HASADVIP1/Hasad.json`
- `GET /bypass/HASADVIP1/new.zip`
- `GET /api/health`

## تسجيل الدخول

يرسل العميل:

`game=PUBG&user_key=...&serial=...&verrr=1.0.0`

وعند النجاح يرجع:

```json
{
  "status": true,
  "data": {
    "token": "...",
    "EXP": "2026-12-31 23:59:59",
    "rng": 1234567890
  }
}
```

## إعداد Vercel

أضف Environment Variables:

- `TOKEN_SALT`
- `APP_VERSION`
- `USERS_JSON`
- `RESOURCE_VERSION`

مثال `USERS_JSON`:

```json
{"AWR-2026":{"enabled":true,"exp":"2026-12-31 23:59:59","serial":"*"}}
```

`serial="*"` يسمح بأي جهاز. ضع serial محددًا لتقييد المفتاح بجهاز واحد.

## الربط مع GitHub

1. أنشئ مستودعًا جديدًا على GitHub.
2. ارفع جميع محتويات هذا المجلد إلى الفرع `main`.
3. في Vercel اختر **Add New Project** ثم **Import Git Repository**.
4. اختر المستودع.
5. أضف Environment Variables السابقة.
6. اضغط Deploy.
7. بعد الربط، كل Push جديد إلى GitHub يؤدي إلى Deployment جديد تلقائيًا.

## اختبار الروابط بعد النشر

لو كان عنوان المشروع:

`https://YOUR-PROJECT.vercel.app`

فستكون الروابط:

- `https://YOUR-PROJECT.vercel.app/connect`
- `https://YOUR-PROJECT.vercel.app/bypass/HASADVIP1/Hasad.json`
- `https://YOUR-PROJECT.vercel.app/bypass/HASADVIP1/new.zip`
- `https://YOUR-PROJECT.vercel.app/api/health`

## new.zip

المرفق داخل هذا المشروع هو **ZIP تجريبي آمن** يحتوي `README.txt` فقط، حتى يمكن اختبار دورة التنزيل كاملة.

لا تضع الأسرار مثل مفاتيح GitHub/Vercel داخل المستودع. استخدم Environment Variables في Vercel.
