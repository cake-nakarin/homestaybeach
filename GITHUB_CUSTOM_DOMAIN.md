# 🌐 คู่มือการตั้งค่า Custom Domain สำหรับ GitHub Pages

## 📋 ขั้นตอนการตั้งค่า

### 1. **เตรียม Domain**
```bash
# ตัวอย่าง Domain ที่จะใช้
homestaybeachkochang.com
www.homestaybeachkochang.com
```

### 2. **ตั้งค่า DNS Records**

#### **สำหรับ Domain Provider (เช่น Namecheap, GoDaddy):**

**A Records:**
```
Type: A
Name: @
Value: 185.199.108.153
TTL: 600

Type: A
Name: @
Value: 185.199.109.153
TTL: 600

Type: A
Name: @
Value: 185.199.110.153
TTL: 600

Type: A
Name: @
Value: 185.199.111.153
TTL: 600
```

**CNAME Record:**
```
Type: CNAME
Name: www
Value: your-username.github.io
TTL: 600
```

### 3. **ตั้งค่าใน GitHub Repository**

1. ไปที่ Repository บน GitHub
2. คลิก "Settings"
3. เลื่อนลงไปหา "Pages"
4. ใน "Custom domain" ใส่: `homestaybeachkochang.com`
5. คลิก "Save"
6. ✅ เลือก "Enforce HTTPS"

### 4. **สร้างไฟล์ CNAME**

สร้างไฟล์ `CNAME` ในโฟลเดอร์หลัก:
```bash
# สร้างไฟล์ CNAME
echo "homestaybeachkochang.com" > CNAME
```

### 5. **อัปเดตไฟล์ HTML**

เพิ่มใน `<head>` ของทุกหน้า:
```html
<link rel="canonical" href="https://homestaybeachkochang.com" />
<meta property="og:url" content="https://homestaybeachkochang.com" />
```

## 🔧 การตั้งค่า EmailJS สำหรับ Custom Domain

### 1. **อัปเดต EmailJS Configuration**
```javascript
// ในไฟล์ script.js
emailjs.init("YOUR_PUBLIC_KEY");

// เปลี่ยน URL ในฟอร์ม
const formAction = "https://homestaybeachkochang.com/contact";
```

### 2. **ตั้งค่า EmailJS Service**
1. ไปที่ EmailJS Dashboard
2. อัปเดต Service ให้ใช้ Domain ใหม่
3. ตรวจสอบ Template IDs

## 📱 การทดสอบ

### 1. **ตรวจสอบ DNS**
```bash
# ตรวจสอบ A Records
nslookup homestaybeachkochang.com

# ตรวจสอบ CNAME
nslookup www.homestaybeachkochang.com
```

### 2. **ตรวจสอบ SSL**
```bash
# ตรวจสอบ HTTPS
curl -I https://homestaybeachkochang.com
```

### 3. **ทดสอบฟอร์ม**
- ส่งฟอร์มติดต่อ
- ตรวจสอบอีเมลที่ได้รับ
- ทดสอบการจองห้องพัก

## ⚠️ ข้อควรระวัง

### 1. **DNS Propagation**
- อาจใช้เวลา 24-48 ชั่วโมง
- ใช้ [whatsmydns.net](https://www.whatsmydns.net/) ตรวจสอบ

### 2. **SSL Certificate**
- GitHub จะออก SSL Certificate อัตโนมัติ
- อาจใช้เวลา 24 ชั่วโมง

### 3. **EmailJS Configuration**
- ตรวจสอบ Service ID และ Template ID
- ทดสอบการส่งอีเมล

## 🎯 ข้อดีของ Custom Domain

### ✅ **Professional Look**
- ดูเป็นมืออาชีพมากขึ้น
- ง่ายต่อการจดจำ
- สร้างความน่าเชื่อถือ

### ✅ **SEO Benefits**
- ช่วยในการค้นหา Google
- Domain Authority สูงขึ้น
- Local SEO สำหรับเกาะช้าง

### ✅ **Branding**
- สร้างแบรนด์ที่ชัดเจน
- ง่ายต่อการโฆษณา
- Professional Email Address

## 📊 การติดตามผล

### 1. **Google Analytics**
```html
<!-- เพิ่มใน <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 2. **Google Search Console**
1. เพิ่ม Domain ใน Search Console
2. ยืนยันความเป็นเจ้าของ
3. ติดตามการค้นหา

### 3. **EmailJS Analytics**
- ติดตามจำนวนอีเมลที่ส่ง
- ตรวจสอบอัตราความสำเร็จ
- วิเคราะห์พฤติกรรมผู้ใช้

## 🔄 การอัปเดต

### **เมื่อมีการเปลี่ยนแปลง:**
```bash
# อัปเดตโค้ด
git add .
git commit -m "อัปเดต: เพิ่มฟีเจอร์ใหม่"
git push origin main

# GitHub Pages จะ Deploy อัตโนมัติ
```

### **การตรวจสอบ:**
- ตรวจสอบเว็บไซต์หลัง Deploy
- ทดสอบฟอร์มการทำงาน
- ตรวจสอบอีเมลที่ส่ง

---

**หมายเหตุ**: Custom Domain จะทำให้เว็บไซต์ดูเป็นมืออาชีพและน่าเชื่อถือมากขึ้น 