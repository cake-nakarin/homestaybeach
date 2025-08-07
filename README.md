# 🏖️ โฮมสเตย์บีชเกาะช้าง - เว็บไซต์โรงแรมขนาดเล็ก

เว็บไซต์สำหรับโฮมสเตย์บีชเกาะช้าง ที่ออกแบบให้สวยงาม สะอาดตา และใช้งานง่าย

![โฮมสเตย์บีชเกาะช้าง](https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)

## 🌟 Live Demo
[ดูเว็บไซต์ได้ที่นี่](https://your-username.github.io/homestaybeach)

## 🎯 คุณสมบัติหลัก

### หน้าเว็บไซต์
- **🏠 หน้าแรก** - แสดงภาพสไลด์และข้อมูลแนะนำ
- **🛏️ ห้องพัก** - แสดงประเภทห้องพักและราคา
- **📦 แพ็คเกจ** - แสดงแพ็คเกจพิเศษต่างๆ
- **📞 ติดต่อสอบถาม** - ฟอร์มติดต่อและข้อมูลการติดต่อ
- **📋 หน้าดูรายละเอียด** - รายละเอียดห้องพักและแพ็คเกจ

### ฟีเจอร์พิเศษ
- ✅ Responsive Design (รองรับทุกอุปกรณ์)
- ✅ Image Slider อัตโนมัติ
- ✅ Mobile Menu สำหรับมือถือ
- ✅ Smooth Scrolling
- ✅ Form Validation
- ✅ Notification System
- ✅ Loading Animations
- ✅ Scroll to Top Button
- ✅ Hover Effects

## 🚀 การติดตั้งและใช้งาน

### วิธีที่ 1: Clone จาก GitHub
```bash
git clone https://github.com/your-username/homestaybeach.git
cd homestaybeach
```

### วิธีที่ 2: เปิดไฟล์โดยตรง
1. ดาวน์โหลดไฟล์ทั้งหมด
2. เปิดไฟล์ `index.html` ในเบราว์เซอร์

### วิธีที่ 3: ใช้ Local Server
```bash
# ใช้ Python
python -m http.server 8000

# ใช้ Node.js (ต้องติดตั้ง http-server ก่อน)
npx http-server

# ใช้ PHP
php -S localhost:8000
```

จากนั้นเปิดเบราว์เซอร์ไปที่ `http://localhost:8000`

## 📁 โครงสร้างไฟล์

```
homestaybeach/
├── index.html              # ไฟล์ HTML หลัก
├── room-detail.html        # หน้าดูรายละเอียดห้องพัก
├── package-detail.html     # หน้าดูรายละเอียดแพ็คเกจ
├── styles.css              # ไฟล์ CSS สำหรับสไตล์หลัก
├── detail-styles.css       # ไฟล์ CSS สำหรับหน้าดูรายละเอียด
├── script.js               # ไฟล์ JavaScript สำหรับฟังก์ชันหลัก
├── detail-script.js        # ไฟล์ JavaScript สำหรับหน้าดูรายละเอียด
├── EMAILJS_SETUP.md        # คู่มือการตั้งค่า EmailJS
├── .gitignore              # ไฟล์ที่ไม่อัปโหลดขึ้น GitHub
└── README.md               # ไฟล์อธิบายการใช้งาน
```

## 🎨 การออกแบบ

### สีหลัก (Beach Theme)
- **🟡 Sand Yellow**: #f4d03f - สื่อถึงชายหาด
- **🔵 Ocean Blue**: #3498db - สื่อถึงน้ำทะเล
- **🟢 Nature Green**: #27ae60 - สื่อถึงต้นไม้
- **⚪ White**: #ffffff - สีพื้นหลัง
- **⚫ Dark Gray**: #2c3e50 - สีข้อความ

### ฟอนต์
- **Prompt** - ฟอนต์ไทยที่อ่านง่าย

### Icons
- **Font Awesome** - ไอคอนสวยงาม

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## 🔧 การปรับแต่ง

### เปลี่ยนข้อมูล
1. แก้ไขข้อมูลใน `index.html`
2. เปลี่ยนรูปภาพโดยแทนที่ URL ในแท็ก `<img>`
3. ปรับราคาและรายละเอียดห้องพัก

### เปลี่ยนสี
1. แก้ไขสีใน `styles.css`
2. เปลี่ยนค่าสีในตัวแปร CSS

### เพิ่มฟีเจอร์
1. เพิ่มโค้ด JavaScript ใน `script.js`
2. เพิ่มสไตล์ CSS ใน `styles.css`

## 📞 ข้อมูลติดต่อ

- **📍 ที่อยู่**: 123 ถนนชายหาด ตำบลเกาะช้าง อำเภอเกาะช้าง จังหวัดตราด 23170
- **📞 โทรศัพท์**: 039-123-4567
- **📧 อีเมล**: info@homestaybeachkochang.com

## 📧 การตั้งค่าส่งอีเมล

ดูคู่มือการตั้งค่า EmailJS ในไฟล์ [EMAILJS_SETUP.md](EMAILJS_SETUP.md)

## 🛠️ เทคโนโลยีที่ใช้

- **HTML5** - โครงสร้างเว็บไซต์
- **CSS3** - การจัดสไตล์และ Responsive Design
- **JavaScript (ES6+)** - ฟังก์ชันการทำงาน
- **Font Awesome** - ไอคอน
- **Google Fonts** - ฟอนต์ Prompt

## 📄 ลิขสิทธิ์

© 2024 โฮมสเตย์บีชเกาะช้าง. สงวนลิขสิทธิ์.

## 🤝 การสนับสนุน

หากมีปัญหาหรือต้องการปรับแต่งเพิ่มเติม กรุณาสร้าง Issue ใน GitHub

## ⭐ Star this repository

หากโปรเจกต์นี้มีประโยชน์ กรุณาให้ดาว ⭐ ให้ด้วยครับ

---

**สร้างด้วย ❤️ สำหรับโฮมสเตย์บีชเกาะช้าง** 