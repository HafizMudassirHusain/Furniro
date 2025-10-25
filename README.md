## 🛍️ **Project Name — Modern E-Commerce Web App**

A **full-featured e-commerce web application** built with **React + Firebase + Tailwind CSS**, offering a smooth shopping experience, secure authentication, order tracking, and an elegant golden-themed UI.
Designed for scalability, modern UI, and seamless user interaction.

---

## 🚀 **Features**

### 🧑‍💻 User Features

* 🔐 **Login / Signup** (with Firebase Authentication)
* 🧾 **Guest Checkout** and account-based checkout support
* 🛒 **Add to Cart**, update or remove items
* 💳 **Checkout Form** with validation
* 📦 **Orders Page** for order history
* 🏠 **Responsive Home Page** showcasing products
* 📞 **Contact Us Page** for support or inquiries

### 🛠️ Admin Features

* 🧍‍♂️ **Admin Login Panel**
* 📋 **User Management Dashboard**
* 📊 **Order Overview & Details**
* 🧩 **Product Management (extendable)**

### 🎨 UI / UX Highlights

* ✨ **Golden Theme Palette** for a premium look
* 📱 **Fully Responsive** across all devices
* ⚡ **Fast Navigation** using React Router
* 🧠 **Clean, Modular Components** (Ant Design + Tailwind)
* 🧭 **Smooth Routing & Scroll Restoration**

---

## 🧩 **Tech Stack**

| Layer                | Technologies                                |
| -------------------- | ------------------------------------------- |
| **Frontend**         | React.js (Vite) + Tailwind CSS + Ant Design |
| **Backend / Auth**   | Firebase Authentication                     |
| **Database**         | Firebase Firestore                          |
| **State Management** | React Context API (FirebaseProvider)        |
| **Routing**          | React Router DOM                            |
| **Deployment**       | Vercel / Firebase Hosting                   |

---

## 📁 **Project Structure**

```
📦 project-root
├── 📂 src
│   ├── 📂 componet
│   │   └── 📂 ContactUs
│   │       └── Contact.jsx
│   ├── 📂 context
│   │   └── FirebaseContext.jsx
│   ├── 📂 pages
│   │   ├── 📂 Auth
│   │   │   ├── Login.jsx
│   │   │   ├── SignUp.jsx
│   │   │   ├── Admin.jsx
│   │   │   └── UserManagement.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Dashbord.jsx
│   │   ├── Home.jsx
│   │   ├── Orders.jsx
│   │   ├── OrderDetails.jsx
│   │   ├── ProductDetail.jsx
│   │   └── Products.jsx
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── 📄 package.json
├── 📄 vite.config.js
├── 📄 tailwind.config.js
└── 📄 README.md
```

---

## ⚙️ **Installation & Setup**

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Firebase Configuration

Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
Then add your Firebase config inside:

**`src/pages/firebase.js`**

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MSG_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

---

## 🧠 **Key Components Overview**

| Component                        | Description                                  |
| -------------------------------- | -------------------------------------------- |
| **`Dashbord.jsx`**               | Main layout wrapper (Header, Footer, Outlet) |
| **`Home.jsx`**                   | Displays hero banner and product showcase    |
| **`Products.jsx`**               | Fetches and lists all available products     |
| **`ProductDetail.jsx`**          | Shows single product details                 |
| **`Cart.jsx`**                   | Handles user cart and price calculation      |
| **`Checkout.jsx`**               | Form for guest or logged-in checkout         |
| **`Orders.jsx`**                 | Displays past orders                         |
| **`OrderDetails.jsx`**           | Order item details by ID                     |
| **`Contact.jsx`**                | Contact form integrated with form validation |
| **`Login / SignUp.jsx`**         | Firebase Authentication                      |
| **`Admin / UserManagement.jsx`** | Admin tools and user data overview           |

---

## 🖼️ **Color Palette**

| Element          | Color Code |
| ---------------- | ---------- |
| Primary (Golden) | `#e0c869`  |
| Hover / Accent   | `#c7b15b`  |
| Text             | `#1a1a1a`  |
| Background       | `#f9f9f9`  |

---

## 🚧 **Future Enhancements**

* 🧾 Product CRUD operations for admin
* 💳 Payment gateway integration (Stripe / Razorpay)
* 🧠 Search & Filter for products
* 💬 Chatbot / AI Assistant for users
* 📈 Advanced analytics dashboard

---

## 📸 **Preview**

(You can add screenshots here after deployment.)

---

## 🌍 **Deployment**

Easily deploy on **Vercel** or **Firebase Hosting**:

```bash
npm run build
```

Then follow your preferred hosting provider’s instructions.

---

## 👨‍💻 **Author**

**Hafiz Mudassir Husain (HMH)**
Full Stack Engineer
🔗 [LinkedIn Profile](https://www.linkedin.com/in/hafiz-mudassir-husain)

---

## 🪪 **License**

This project is open-source under the **MIT License**.
Feel free to use and modify it for learning or personal projects.

