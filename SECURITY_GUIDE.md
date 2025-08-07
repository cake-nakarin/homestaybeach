# 🔒 คู่มือความปลอดภัย - โฮมสเตย์บีชเกาะช้าง

## ⚠️ ความเสี่ยงที่สำคัญ

### 1. **API Keys Exposure** (ความเสี่ยงสูง)
```javascript
// ❌ ไม่ปลอดภัย - เปิดเผย API Key ในโค้ด
emailjs.init("user_abc123def456");

// ✅ ปลอดภัย - ใช้ Environment Variables
emailjs.init(process.env.EMAILJS_PUBLIC_KEY);
```

### 2. **Form Validation** (ความเสี่ยงปานกลาง)
- ตรวจสอบข้อมูลที่ผู้ใช้กรอก
- ป้องกัน XSS และ SQL Injection
- จำกัดขนาดข้อมูล

### 3. **Rate Limiting** (ความเสี่ยงต่ำ)
- จำกัดจำนวนการส่งฟอร์ม
- ป้องกัน Spam และ DDoS

## 🛡️ มาตรการความปลอดภัยที่แนะนำ

### 1. **ซ่อน API Keys**
```bash
# สร้างไฟล์ .env (อย่าอัปโหลดขึ้น GitHub)
EMAILJS_PUBLIC_KEY=your_public_key_here
EMAILJS_SERVICE_ID=your_service_id_here
EMAILJS_TEMPLATE_ID=your_template_id_here
```

### 2. **Content Security Policy (CSP)**
```html
<!-- เพิ่มใน <head> ของทุกหน้า -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://api.emailjs.com; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; 
               font-src 'self' https://fonts.gstatic.com; 
               img-src 'self' data: https:; 
               connect-src 'self' https://api.emailjs.com;">
```

### 3. **Form Validation ที่เข้มงวด**
```javascript
// ตรวจสอบข้อมูลก่อนส่ง
function validateForm(data) {
    const errors = [];
    
    // ตรวจสอบอีเมล
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        errors.push('อีเมลไม่ถูกต้อง');
    }
    
    // ตรวจสอบเบอร์โทร
    const phoneRegex = /^[0-9-+\s()]{10,15}$/;
    if (!phoneRegex.test(data.phone)) {
        errors.push('เบอร์โทรไม่ถูกต้อง');
    }
    
    // ตรวจสอบชื่อ
    const nameRegex = /^[a-zA-Z\u0E00-\u0E7F\s]{2,50}$/;
    if (!nameRegex.test(data.name)) {
        errors.push('ชื่อไม่ถูกต้อง');
    }
    
    return errors;
}
```

### 4. **Rate Limiting**
```javascript
// จำกัดจำนวนการส่งฟอร์ม
const rateLimit = {
    requests: new Map(),
    maxRequests: 5,
    timeWindow: 60000 // 1 นาที
};

function checkRateLimit(userIP) {
    const now = Date.now();
    const userRequests = rateLimit.requests.get(userIP) || [];
    
    // ลบคำขอเก่า
    const recentRequests = userRequests.filter(time => now - time < rateLimit.timeWindow);
    
    if (recentRequests.length >= rateLimit.maxRequests) {
        return false; // เกินขีดจำกัด
    }
    
    // เพิ่มคำขอใหม่
    recentRequests.push(now);
    rateLimit.requests.set(userIP, recentRequests);
    return true;
}
```

## 📋 Checklist ความปลอดภัย

### ✅ ต้องทำ:
- [ ] ซ่อน API Keys ใน Environment Variables
- [ ] เพิ่ม Content Security Policy
- [ ] ตรวจสอบข้อมูลฟอร์มอย่างเข้มงวด
- [ ] จำกัดขนาดข้อมูลที่ส่ง
- [ ] ใช้ HTTPS เท่านั้น
- [ ] อัปเดต Dependencies เป็นประจำ

### ⚠️ ควรทำ:
- [ ] เพิ่ม Rate Limiting
- [ ] ใช้ CAPTCHA สำหรับฟอร์มสำคัญ
- [ ] เก็บ Log การใช้งาน
- [ ] ตั้งค่า Security Headers
- [ ] ใช้ reCAPTCHA

### 🔒 สำหรับ Production:
- [ ] ใช้ Web Application Firewall (WAF)
- [ ] ตั้งค่า CORS อย่างเหมาะสม
- [ ] ใช้ CDN ที่มี Security Features
- [ ] ตรวจสอบ Security Audit เป็นประจำ

## 🚨 สิ่งที่ห้ามทำ

### ❌ อย่าทำ:
1. **เปิดเผย API Keys** ในโค้ดที่แชร์สาธารณะ
2. **เชื่อถือข้อมูลจากผู้ใช้** โดยไม่ตรวจสอบ
3. **ใช้ HTTP** แทน HTTPS
4. **อนุญาต File Upload** โดยไม่จำกัดประเภทไฟล์
5. **ใช้ eval()** หรือ innerHTML โดยไม่ตรวจสอบ

## 🔧 การตั้งค่าความปลอดภัย

### 1. **สำหรับ Development:**
```bash
# สร้างไฟล์ .env
echo "EMAILJS_PUBLIC_KEY=your_key_here" > .env
echo "EMAILJS_SERVICE_ID=your_service_id" >> .env
echo "EMAILJS_TEMPLATE_ID=your_template_id" >> .env

# เพิ่ม .env ใน .gitignore
echo ".env" >> .gitignore
```

### 2. **สำหรับ Production:**
```bash
# ตั้งค่า Environment Variables บน Server
export EMAILJS_PUBLIC_KEY="your_production_key"
export EMAILJS_SERVICE_ID="your_production_service"
export EMAILJS_TEMPLATE_ID="your_production_template"
```

### 3. **Security Headers:**
```html
<!-- เพิ่มในทุกหน้า HTML -->
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta http-equiv="X-Frame-Options" content="DENY">
<meta http-equiv="X-XSS-Protection" content="1; mode=block">
<meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">
```

## 📊 การตรวจสอบความปลอดภัย

### 1. **ใช้ Security Tools:**
- [OWASP ZAP](https://owasp.org/www-project-zap/)
- [Snyk](https://snyk.io/)
- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit)

### 2. **ตรวจสอบด้วยตนเอง:**
```bash
# ตรวจสอบ Dependencies
npm audit

# ตรวจสอบ SSL
curl -I https://your-website.com

# ตรวจสอบ Security Headers
curl -I -H "User-Agent: Mozilla/5.0" https://your-website.com
```

## 🆘 เมื่อเกิดปัญหา

### 1. **API Key ถูกเปิดเผย:**
- เปลี่ยน API Key ทันที
- ตรวจสอบ Log การใช้งาน
- แจ้ง EmailJS Support

### 2. **ถูก Spam:**
- เปิด Rate Limiting
- เพิ่ม CAPTCHA
- ตรวจสอบ Log

### 3. **เว็บไซต์ถูก Hack:**
- ปิดเว็บไซต์ชั่วคราว
- ตรวจสอบ Log
- เปลี่ยน Passwords ทั้งหมด
- ติดต่อ Security Expert

## 📞 ติดต่อเมื่อมีปัญหา

- **EmailJS Support**: support@emailjs.com
- **GitHub Security**: security@github.com
- **OWASP**: https://owasp.org/

---

**หมายเหตุ**: ความปลอดภัยเป็นสิ่งสำคัญ ควรตรวจสอบและอัปเดตเป็นประจำ 