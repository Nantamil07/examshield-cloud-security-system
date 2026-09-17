# 🛡️ ExamShield Cloud

**Secure Cloud-Based Question Paper Management System**

A secure cloud application developed using **Next.js**, **Supabase**, **AES Encryption**, **SHA-256 Hashing**, and **Role-Based Access Control** to prevent unauthorized access, modification, and leakage of government competitive examination question papers before the scheduled examination.

---

## 📌 Project Overview

ExamShield Cloud is a cloud-based secure examination management platform where:

* Question setters upload encrypted question papers.
* Reviewers approve or reject papers.
* Administrators schedule secure release times.
* Exam Centers can download papers only after the release time.
* Every downloaded paper is watermarked and audited.

---

## 🎯 Objectives

* Prevent question paper leakage.
* Secure cloud storage using encryption.
* Integrity verification using SHA-256.
* Controlled release of examination papers.
* Complete audit monitoring.

---

## 🔐 Security Features

* AES-256 Encryption before cloud storage.
* SHA-256 Integrity Hash.
* Supabase Authentication.
* Role-Based Access Control.
* Private Cloud Storage.
* Countdown-based Controlled Release.
* Watermarked Downloads.
* Audit Logging.
* Integrity Verification Portal.

---

## 👥 User Roles

| Role            | Responsibilities                            |
| --------------- | ------------------------------------------- |
| Question Setter | Upload encrypted question papers.           |
| Reviewer        | Approve or reject uploaded papers.          |
| Administrator   | Schedule release time and monitor security. |
| Exam Center     | Download question paper only after release. |

---

## 🏗️ System Workflow

1. Setter uploads PDF.
2. AES encrypts PDF.
3. SHA-256 hash generated.
4. Encrypted PDF stored in Supabase Storage.
5. Reviewer approves/rejects.
6. Admin schedules release time.
7. Countdown reaches zero.
8. Status changes to Released.
9. Exam Center downloads watermarked PDF.
10. Audit logs record every action.

---

## ☁️ Technologies Used

* Next.js 16
* React.js
* Tailwind CSS
* Supabase Authentication
* Supabase PostgreSQL
* Supabase Storage
* CryptoJS (AES Encryption)
* pdf-lib
* Lucide React Icons

---

## 📁 Project Structure

app/
components/
utils/
lib/
public/

---

## ⚙️ Installation

```bash
git clone https://github.com/yourusername/examshield-cloud.git

cd examshield-cloud

npm install
```

Create `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_URL

NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_KEY
```

Run the project

```bash
npm run dev
```

Visit:

http://localhost:3000

---

## 🗄️ Database Tables

### question_papers

* id
* subject
* department
* semester
* exam_name
* encrypted_filename
* encrypted_file_url
* hash
* watermarked_hash
* status
* reviewer_comment
* release_time
* created_at

### audit_logs

* id
* user_id
* action
* description
* created_at

---

## 🧪 Sample Workflow

**Input**

Upload `Cloud_Computing_Mid1.pdf`

**Output**

* Encrypted `.enc` file stored in cloud.
* SHA-256 generated.
* Reviewer approval.
* Countdown release.
* Watermarked PDF download.
* Integrity verification successful.

---

## 📸 Screenshots

* Landing Page
* Setter Dashboard
* Reviewer Dashboard
* Admin Dashboard
* Exam Center Dashboard
* Security Dashboard
* Integrity Verification

---

## 🔮 Future Enhancements

* OTP-based paper release.
* QR-code verification.
* Multi-factor authentication.
* AI-based anomaly detection.
* SMS/Email alerts.

---

## 👨‍💻 Developed For

Cloud Computing Microproject

Coimbatore Institute of Technology
