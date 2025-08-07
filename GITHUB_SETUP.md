# 🚀 คู่มือการอัปโหลดโปรเจกต์ขึ้น GitHub

## 📋 ขั้นตอนการอัปโหลด

### 1. สร้าง Repository บน GitHub

1. ไปที่ [GitHub.com](https://github.com)
2. คลิกปุ่ม "New" หรือ "+" เพื่อสร้าง Repository ใหม่
3. ตั้งชื่อ Repository: `homestaybeach`
4. เลือก "Public" (ฟรี) หรือ "Private" (ต้องเสียเงิน)
5. **อย่า** เลือก "Add a README file" (เพราะเรามีแล้ว)
6. คลิก "Create repository"

### 2. เปิด Terminal/Command Prompt

```bash
# ไปที่โฟลเดอร์โปรเจกต์
cd /path/to/homestaybeach

# ตรวจสอบว่าอยู่ในโฟลเดอร์ที่ถูกต้อง
ls
# ควรเห็นไฟล์: index.html, styles.css, script.js, etc.
```

### 3. เริ่มต้น Git Repository

```bash
# เริ่มต้น Git repository
git init

# เพิ่มไฟล์ทั้งหมด
git add .

# Commit ครั้งแรก
git commit -m "Initial commit: โฮมสเตย์บีชเกาะช้าง"

# เพิ่ม remote repository
git remote add origin https://github.com/YOUR_USERNAME/homestaybeach.git

# Push ขึ้น GitHub
git branch -M main
git push -u origin main
```

### 4. ตั้งค่า GitHub Pages (ถ้าต้องการ)

1. ไปที่ Repository บน GitHub
2. คลิก "Settings"
3. เลื่อนลงไปหา "Pages"
4. ใน "Source" เลือก "Deploy from a branch"
5. เลือก branch "main"
6. คลิก "Save"

เว็บไซต์จะสามารถเข้าถึงได้ที่: `https://YOUR_USERNAME.github.io/homestaybeach`

## 🔧 คำสั่ง Git ที่ใช้บ่อย

### อัปเดตโค้ด
```bash
# เพิ่มไฟล์ที่เปลี่ยนแปลง
git add .

# Commit การเปลี่ยนแปลง
git commit -m "อัปเดต: เพิ่มฟีเจอร์ใหม่"

# Push ขึ้น GitHub
git push
```

### ดึงโค้ดล่าสุด
```bash
git pull origin main
```

### ดูสถานะ
```bash
git status
```

### ดูประวัติ
```bash
git log --oneline
```

## 📁 ไฟล์ที่สำคัญ

### ไฟล์ที่ต้องมี:
- ✅ `index.html` - หน้าหลัก
- ✅ `room-detail.html` - หน้าดูรายละเอียดห้องพัก
- ✅ `package-detail.html` - หน้าดูรายละเอียดแพ็คเกจ
- ✅ `styles.css` - สไตล์หลัก
- ✅ `detail-styles.css` - สไตล์หน้าดูรายละเอียด
- ✅ `script.js` - JavaScript หลัก
- ✅ `detail-script.js` - JavaScript หน้าดูรายละเอียด
- ✅ `README.md` - คู่มือการใช้งาน
- ✅ `EMAILJS_SETUP.md` - คู่มือ EmailJS
- ✅ `.gitignore` - ไฟล์ที่ไม่อัปโหลด

### ไฟล์ที่ไม่อัปโหลด:
- ❌ `.vscode/` - โฟลเดอร์ IDE
- ❌ `.env` - ไฟล์ environment variables
- ❌ `node_modules/` - โฟลเดอร์ dependencies
- ❌ `*.log` - ไฟล์ log

## 🌐 การแชร์โปรเจกต์

### วิธีแชร์:
1. **URL Repository**: `https://github.com/YOUR_USERNAME/homestaybeach`
2. **Live Demo**: `https://YOUR_USERNAME.github.io/homestaybeach` (ถ้าเปิด GitHub Pages)

### วิธี Clone:
```bash
git clone https://github.com/YOUR_USERNAME/homestaybeach.git
cd homestaybeach
```

## 🔒 ความปลอดภัย

### สิ่งที่ต้องระวัง:
1. **อย่า** อัปโหลด API Keys หรือ Private Keys
2. **อย่า** อัปโหลดไฟล์ `.env` ที่มีข้อมูลสำคัญ
3. **ตรวจสอบ** `.gitignore` ก่อน push

### การซ่อนข้อมูลสำคัญ:
```bash
# ใช้ Environment Variables
# แทนที่จะใส่ API Key ในโค้ด
emailjs.init(process.env.EMAILJS_PUBLIC_KEY);
```

## 📝 การอัปเดต README

### เปลี่ยน URL ใน README:
```markdown
## 🌟 Live Demo
[ดูเว็บไซต์ได้ที่นี่](https://YOUR_USERNAME.github.io/homestaybeach)

## 🚀 การติดตั้งและใช้งาน
### วิธีที่ 1: Clone จาก GitHub
```bash
git clone https://github.com/YOUR_USERNAME/homestaybeach.git
cd homestaybeach
```
```

## 🎯 ข้อดีของการใช้ GitHub

- ✅ **Version Control** - เก็บประวัติการเปลี่ยนแปลง
- ✅ **Collaboration** - ทำงานร่วมกับผู้อื่นได้
- ✅ **Backup** - สำรองข้อมูลอัตโนมัติ
- ✅ **Deployment** - ใช้ GitHub Pages ได้ฟรี
- ✅ **Documentation** - มี README และ Wiki
- ✅ **Issues** - ระบบรายงานปัญหา

## 🆘 การแก้ปัญหา

### ปัญหาที่พบบ่อย:

1. **Authentication failed**
   ```bash
   # ใช้ Personal Access Token
   git remote set-url origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/homestaybeach.git
   ```

2. **Permission denied**
   ```bash
   # ตรวจสอบสิทธิ์
   git remote -v
   ```

3. **Merge conflicts**
   ```bash
   # แก้ไข conflict แล้ว
   git add .
   git commit -m "แก้ไข merge conflict"
   git push
   ```

---

**หมายเหตุ**: หลังจากอัปโหลดเสร็จแล้ว โปรเจกต์จะสามารถแชร์และใช้งานได้ผ่าน GitHub 