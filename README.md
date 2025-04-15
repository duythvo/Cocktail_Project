# U_Cocktail_World

## 🚀 Giới thiệu

U_Cocktail_World là một ứng dụng web gồm **frontend** (React) và **backend** (Express.js) giúp quản lý và hiển thị thông tin cocktail.

## 📦 Công nghệ sử dụng

### Frontend

- **React 19** - Thư viện UI mạnh mẽ
- **Vite** - Công cụ build nhanh chóng
- **React Router** - Điều hướng giữa các trang
- **Axios** - Thư viện gọi API
- **TailwinCSS & Flowbite** - Hỗ trợ giao diện UI
- **React Toastify** - Hiển thị thông báo
- **ESLint** - Kiểm tra mã nguồn

### Backend

- **Express.js** - Framework cho Node.js
- **Mongoose** - ODM cho MongoDB
- **MongoDB** - Cơ sở dữ liệu NoSQL
- **JWT** - Xác thực người dùng
- **Bcrypt** - Mã hóa mật khẩu
- **Cloudinary** - Lưu trữ hình ảnh
- **Multer** - Xử lý upload file
- **Dotenv** - Quản lý biến môi trường

---

## 🛠️ Cài đặt & Chạy dự án

### 1️⃣ Clone dự án

```bash
git clone https://github.com/your-repo/U_Cocktail_World.git
cd U_Cocktail_World
```

### 2️⃣ Cài đặt Frontend

```bash
cd frontend
npm install
```

#### Chạy Frontend

```bash
npm run dev
```

### 3️⃣ Cài đặt Backend

```bash
cd backend
npm install
```

#### Chạy Backend

```bash
npm run server
```

---

## 📂 Cấu trúc thư mục

```
U_Cocktail_World/
├── backend/
│   ├── config/         # Cấu hình kết nối DB
│   ├── controllers/    # Xử lý logic API
│   ├── middlewares/    # Middleware xác thực
│   ├── models/         # Định nghĩa Schema MongoDB
│   ├── routes/         # Định nghĩa API
│   ├── uploads/        # Lưu trữ file upload
│   ├── .env            # Biến môi trường
│   ├── package.json    # Cấu hình backend
│   ├── server.js       # Server chính
│
├── frontend/
│   ├── src/
│   │   ├── components/  # Các component tái sử dụng
│   │   ├── pages/       # Các trang chính
│   │   ├── assets/      # Hình ảnh, CSS
│   │   ├── App.jsx      # Component chính
│   │   ├── main.jsx     # Điểm vào ứng dụng
│   ├── public/          # File tĩnh
│   ├── package.json     # Cấu hình frontend
│
├── README.md            # Hướng dẫn dự án
```

---

## 📌 API Endpoints (Backend)

| Phương thức | Endpoint                          | Mô tả                             | Tham số                                                          |
| ----------- | --------------------------------- | --------------------------------- | ---------------------------------------------------------------- |
| `GET`       | `/api/drink/getDrinks`            | Lấy danh sách cocktail            | None                                                             |
| `POST`      | `/api/drink/addDrink`             | Thêm cocktail mới                 | name, description, nutrition, ingredients, recipes, image, video |
| `POST`      | `/api/recipe/addRecipeBox`        | Thêm Recipe Box                   | userId, boxName                                                  |
| `POST`      | `/api/recipe/updateRecipeBox`     | Cập nhật tên Recipe Box           | userId, newName, recipeId                                        |
| `POST`      | `/api/user/register`              | Đăng ký tài khoản                 | name, email, password                                            |
| `POST`      | `/api/user/login`                 | Đăng nhập                         | email, password                                                  |
| `GET`       | `/api/user/profile`               | Lấy thông tin người dùng          | None                                                             |
| `POST`      | `/api/user/update-profile`        | Cập nhật thông tin người dùng     | userId, name, phone, dob, gender, imageFile                      |
| `GET`       | `/api/user/get-recipes`           | Lấy danh sách công thức yêu thích | userId                                                           |
| `POST`      | `/api/user/add-to-box`            | Thêm một cocktail vào một box     | userId, drinkId, recipeId                                        |
| `POST`      | `/api/user/remove-from-box`       | Xóa một cocktail khỏi một box     | userId, drinkId, recipeId                                        |
| `GET`       | `/api/user/get-drinks-in-recipes` | Lấy các loại cocktail trong 1 box | userId, recipeId                                                 |
| `GET`       | `/api/blog/getBlogs`              | Lấy danh sách blog                | None                                                             |
| `POST`      | `/api/blog/addBlog`               | Thêm blog                         | title, mainImage,content(JSON), contentImages[]                  |
