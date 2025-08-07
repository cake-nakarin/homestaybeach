# คู่มือการตั้งค่า EmailJS สำหรับส่งอีเมล

## 📧 EmailJS คืออะไร?
EmailJS เป็นบริการฟรีที่ช่วยให้เว็บไซต์ Frontend สามารถส่งอีเมลได้โดยไม่ต้องมี Backend Server

## 🚀 ขั้นตอนการตั้งค่า

### 1. สมัคร EmailJS
1. ไปที่ [EmailJS.com](https://www.emailjs.com/)
2. สมัครบัญชีใหม่ (ฟรี)
3. ยืนยันอีเมล

### 2. สร้าง Email Service
1. เข้าไปที่ Dashboard
2. คลิก "Add New Service"
3. เลือก "Gmail" หรือ "Outlook"
4. ใส่ข้อมูลอีเมลของคุณ
5. ตั้งชื่อ Service เช่น "homestay_service"

### 3. สร้าง Email Template
1. คลิก "Email Templates"
2. คลิก "Create New Template"
3. ตั้งชื่อ Template เช่น "contact_form"

#### Template สำหรับฟอร์มติดต่อ:
```html
ชื่อ: {{from_name}}
อีเมล: {{from_email}}
เบอร์โทร: {{from_phone}}
หัวข้อ: {{subject}}
ข้อความ: {{message}}
```

#### Template สำหรับจองห้องพัก:
```html
ประเภทห้อง: {{room_type}}
วันที่เช็คอิน: {{checkin_date}}
วันที่เช็คเอาท์: {{checkout_date}}
จำนวนผู้เข้าพัก: {{guests}}
จำนวนคืน: {{nights}}
ราคารวม: {{total_price}}
```

#### Template สำหรับจองแพ็คเกจ:
```html
แพ็คเกจ: {{package_name}}
วันที่เช็คอิน: {{checkin_date}}
จำนวนผู้เข้าพัก: {{guests}}
คำขอพิเศษ: {{special_requests}}
ราคารวม: {{total_price}}
```

### 4. รับ Public Key
1. ไปที่ "Account" > "API Keys"
2. คัดลอก Public Key

### 5. แก้ไขโค้ดในเว็บไซต์

#### แก้ไขไฟล์ `script.js`:
```javascript
// เปลี่ยน YOUR_PUBLIC_KEY เป็น Public Key ของคุณ
emailjs.init("YOUR_PUBLIC_KEY");

// เปลี่ยน YOUR_SERVICE_ID เป็น Service ID ของคุณ
// เปลี่ยน YOUR_TEMPLATE_ID เป็น Template ID ของคุณ
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

#### แก้ไขไฟล์ `detail-script.js`:
```javascript
// สำหรับจองห้องพัก
emailjs.send('YOUR_SERVICE_ID', 'YOUR_ROOM_BOOKING_TEMPLATE_ID', roomBookingParams)

// สำหรับจองแพ็คเกจ
emailjs.send('YOUR_SERVICE_ID', 'YOUR_BOOKING_TEMPLATE_ID', bookingParams)
```

## 📋 ข้อมูลที่ต้องหา

### Service ID
- ไปที่ "Email Services"
- คัดลอก Service ID จากรายการ

### Template ID
- ไปที่ "Email Templates"
- คัดลอก Template ID จากรายการ

### Public Key
- ไปที่ "Account" > "API Keys"
- คัดลอก Public Key

## 🔧 ตัวอย่างการตั้งค่า

```javascript
// ตัวอย่างการตั้งค่าใน script.js
emailjs.init("user_abc123def456"); // Public Key ของคุณ

// สำหรับฟอร์มติดต่อ
emailjs.send('service_xyz789', 'template_contact', templateParams)

// สำหรับจองห้องพัก
emailjs.send('service_xyz789', 'template_room_booking', roomBookingParams)

// สำหรับจองแพ็คเกจ
emailjs.send('service_xyz789', 'template_package_booking', bookingParams)
```

## ⚠️ ข้อควรระวัง

1. **ไม่ควรเปิดเผย Public Key** ในโค้ดที่แชร์สาธารณะ
2. **ใช้ Environment Variables** ในโปรเจกต์จริง
3. **ทดสอบการส่งอีเมล** ก่อนใช้งานจริง
4. **ตรวจสอบ Spam Folder** ของอีเมลที่รับ

## 🎯 ข้อดีของ EmailJS

- ✅ ฟรีสำหรับการใช้งานพื้นฐาน
- ✅ ไม่ต้องมี Backend Server
- ✅ ใช้งานง่าย
- ✅ รองรับหลาย Email Service
- ✅ มี Template System

## 📞 การสนับสนุน

หากมีปัญหาการตั้งค่า:
1. ดู Documentation ที่ [EmailJS.com](https://www.emailjs.com/docs/)
2. ติดต่อ Support ของ EmailJS
3. ตรวจสอบ Console ใน Browser สำหรับ Error Messages

---

**หมายเหตุ**: หลังจากตั้งค่าเสร็จแล้ว ฟอร์มจะสามารถส่งอีเมลได้จริงไปยังอีเมลที่คุณกำหนด 