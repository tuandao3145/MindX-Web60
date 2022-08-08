### Thực hành giữa khoá

### 1. Mục tiêu và công nghệ sử dụng

- Mục tiêu: Xây dựng hệ thống ecommerce Restful API.
- Công nghệ: Nodejs, expressjs, mongoose, JWT...

### 2. Thiết kế Database (model)

- Tạo ra các bảng gì?
- Các bảng trong hệ thống web có mối quan hệ ntn với nhau?

- Có 3 bảng
  - Bảng User (Xử lý liên quan register, login, logout, order)
  - Bảng Product (Lưu trữ các thông tin đến sản phẩm mà website đang cần bán)
  - Bảng Order (Lưu trữ các đơn hàng mà người dùng đã mua trên website)

### 3. Thiết kế chi tiết

- Bảng User (user table) - Quản lý user và permission (user & admin)

  - name: string, required
  - email: string, required
  - password: string required
  - isAdmin: boolean

- Bảng Product (product table) - Quản lý sản phẩm

  - user: Ref: User (sản phầm này được ai tạo ra)
  - name: string, required
  - image: string, required
  - brand: string, required (thương hiệu của sản phẩm)
  - category: string, required (loại sản phầm)
  - description: string, required (mô tả sản phẩm)
  - reviews: Object
    - name: string, required
    - rating: number, required
    - comment: string, required
    - user: Ref: User
  - rating: number, required (số rating trung bình của sản phẩm)
  - numReviews: number, required (số lượng review)
  - price: number, required (giá sản phầm)
  - countInStock: number, required (số lượng hàng trong kho)

- Bảng Order (order table) - Quản lý các đơn hàng
  - user: Ref: User (sản phầm được mua bởi ai)
  - orderItems: Object (thông tin đơn hàng)
    - name: string, required (tên sản phẩm)
    - qty: number, required (số lượng sản phầm)
    - image: string, required (ảnh sản phẩm)
    - price: number, required (giá của sản phẩm)
    - product: Ref: Product (người dùng mua sản phẩm gì)
  - shippingAddress: Object (địa chỉ cụ thể cho đơn hàng để ship đến)
    - address: string, required
    - city: string, required
    - postalCode: string, required
    - country: string, required
  - paymentResult: Object (kết quả thanh toán)
    - id: string
    - status: string
    - emailAddress: string
    - updateTime: string
  - paymentMethod: string, required
  - shippingPrice: number, required
  - totalPrice: number
  - isPaid: boolean, required

### 4. Tạo data mẫu (seeder)

- Import từ file json hoặc csv hoặc object

### 5. Thiết kế API

### 5.1 API của user

1. Register a new user

```
// @desc: Register a new user
// @route: POST /api/users
// @access: Public - return token
```

2. Login

```
// @desc: User can login to the system
// @route: POST /api/users/login
// @access: Public - return token
```

3. Get user's profile

```
// @desc: Get an user's profile
// @route: GET /api/users/profile
// @access: Private - user token
```

4. Update user's profile

```
// @desc: Update an user's profile
// @route: PUT /api/users/profile
// @access: Private - user token
```

5. Get all users

```
// @desc: Get all users
// @route: GET /api/users/
// @access: Private/admin
```

6. Delete user

```
// @desc: Delete a user
// @route: DELETE /api/users/:id
// @access: Private/admin
```

7. Get a user's profile by ID

```
// @desc: Get all users
// @route: GET /api/users/:id
// @access: Private/admin
```

8. Update a user's profile by ID

```
// @desc: Get all users
// @route: PUT /api/users/:id
// @access: Private/admin
```

### 5.2 API của product

1. Get all products

```
// @desc: Get all products
// @route: GET /api/products/
// @access: Public
```

2. Get a product by ID

```
// @desc: Get a product by ID
// @route: GET /api/products/:id
// @access: Public
```

3. Delete a product by ID

```
// @desc: Delete a product by ID
// @route: DELETE /api/products/:id
// @access: Private/admin
```

4. Create a product

```
// @desc: Create a product
// @route: POST /api/products
// @access: Private/admin
```

5. Update a product by ID

```
// @desc: Update a product by ID
// @route: POST /api/products/:id
// @access: Private/admin
```
