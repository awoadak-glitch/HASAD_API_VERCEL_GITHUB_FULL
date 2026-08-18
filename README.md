# HASAD Server — V10 + IRAQ-BX V2

هذا تحديث للمستودع الحالي بحيث يدعم عقد تسجيل الدخول القديم V10 وعقد IRAQ-BX V2 في نفس `/connect`.

## مهم قبل الرفع

المجلد:
`public/bypass/HASADVIP1/`

يحتوي فقط ملف:
`KEEP_EXISTING_NEW_ZIP.txt`

التحديث **لا يحتوي new.zip** حتى لا يستبدل الملف الموجود عندك حاليًا.
اترك ملفك الحالي:
`public/bypass/HASADVIP1/new.zip`
كما هو.

## المسارات بعد النشر

- `POST /connect`
- `POST /verify.php`
- `GET /bypass/HASADVIP1/Hasad.json`
- `GET /bypass/HASADVIP1/new.zip`  ← ملفك الحالي
- `GET /bypass/furybbox1.json`
- `GET /bypass/furybbox1.zip`       ← ZIP اختبار آمن مرفق
- `GET /bypass/FAHAD.json`          ← placeholder آمن
- `GET /api/health`

## /connect

### V10

يرسل:
`game=PUBG&user_key=...&serial=...&verrr=1.0.0`

التوكن:
`MD5("PUBG-" + key + "-" + serial + "-" + V10_TOKEN_SALT)`

### V2

يرسل:
`game=VIP&user_key=...&serial=...`

لا يحتاج `verrr`.

التوكن:
`MD5("VIP-" + key + "-" + serial + "-" + V2_TOKEN_SALT)`

## Environment Variables في Vercel

انسخ:

```env
USERS_JSON={"AWR-2026":{"enabled":true,"exp":"2026-12-31 23:59:59","serial":"*","games":["PUBG","VIP"]}}
V10_APP_VERSION=1.0.0
V10_TOKEN_SALT=Vm8Lk7Uj2JmsjCPVPVjrLa7zgfx3uz9E
V10_RESOURCE_VERSION=5
V2_TOKEN_SALT=ABUFAHADTOP
V2_RESOURCE_VERSION=5
V2_APP_VERSION=4.5
V2_UPDATE_URL=
VERIFY_LICENSE_KEY=FAHAD41
VERIFY_PACKAGE=pubgm.loader
VERIFY_SIGNATURE_MD5=*
```

### توقيع V2

`VERIFY_SIGNATURE_MD5=*` مخصص لمرحلة الاختبار فقط.

بعد تعديل وتوقيع APK النهائي احسب MD5 للتوقيع الذي يرسله التطبيق ثم ضع القيمة الدقيقة بدل `*` للحصول على تحقق صارم.

## furybbox1.json

يرجع افتراضيًا:

```json
{
  "bypassVersion": 5,
  "version": "4.5",
  "url": ""
}
```

القيمة `bypassVersion` رقم وليست نصًا.

## furybbox1.zip

المرفق حاليًا ZIP آمن للاختبار يحتوي `README.txt` فقط.
يمكن استخدام هذا المسار لاختبار أن التنزيل وفك الضغط يعملان مع موارد تطبيق عادية غير تنفيذية.

## FAHAD.json

يرجع:

```json
{"bypasspassword":""}
```

هذه قيمة placeholder فقط لأن القيمة الفعلية تُمرر في التطبيق إلى مسار Runtime/Exec.

## الرفع إلى GitHub

انسخ/ارفع محتويات ZIP إلى جذر المستودع الحالي مع الاستبدال عند التعارض:
- api/
- scripts/
- .github/
- package.json
- vercel.json
- .env.example
- .gitignore
- README.md
- public/bypass/furybbox1.zip

لا تحذف:
`public/bypass/HASADVIP1/new.zip`

بعد Commit إلى `main` سيعمل Vercel Deployment جديد تلقائيًا.

## اختبار بعد النشر

من PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\test-server.ps1
```

أو:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\test-server.ps1 -Base "https://YOUR-DOMAIN.vercel.app"
```
