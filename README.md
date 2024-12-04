# Loại dữ liệu:

## User:
```
{
    Name: {
        type: String,
        required: true,
    },
    Username: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    AccessToken: {
        type: String,
    },
}
```
+ `AccessToken`: Là jwtToken của người dùng, phải lưu lại vào `localStorage.getItem("jwtToken")` để sử dụng một số API

## Thể loại (Category):
```
{
    Name: {
        type: String,
        required: true,
    }
}
```

## Bài đăng (Post):
```
{
    CategoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
    },
    Thumbnail: {
        type: String,
        required: true,
    },
    Title: {
        type: String,
        required: true,
    },
    Key: {
        type: String,
        required: true,
    },
    Content: {
        type: String,
        required: true,
    },
    Deleted: {
        type: Boolean,
        required: true,
        default: false,
    }
}
```
+ `Content`: Là một danh sách dữ liệu phức tạp; <ins>**không phải là một đoạn text hoặc HTML**</ins>
+ `Deleted`: True/False; Biểu thị nếu post đã bị "xóa" hay chưa
+ `Key`: Cái đoạn để cuối của link Post (VD: Post có tiêu đề "Đây là tiêu đề" => Có key "Đây-là-tiêu-đề-12315125" => Link đến "/posts/:key")

# API Bài đăng:

## `GET:/api/posts/all?query=...&count=...&page=...&deleted=...`
  - **Trả về:**: Danh sách các Post
  - **Params**: 
    - `query`: Tìm kiếm (VD: `query=Abc` => Tìm các Post có tiêu đề bắt đầu bằng "Abc")
    - `count`: Số Post trả lại
    - `deleted`: true => Hiển thị các Post đã "xóa"; false/không có giá trị => Hiển thị tất cả các Post chưa bị "xóa"
    - `page`: Trang số n (n >= 1) của danh sách Post

## `GET:/api/posts/<category>?query=..&count=...&page=...&deleted=....` 
  - **Trả về**: Danh sách các post thuộc thể loại `category`
  - **Params**: 
    - `query`: Tìm kiếm (VD: `query=Abc` => Tìm các Post có tiêu đề bắt đầu bằng "Abc")
    - `count`: Số Post trả lại
    - `deleted`: true => Hiển thị các Post đã "xóa"; false/không có giá trị => Hiển thị tất cả các Post chưa bị "xóa"
    - `page`: Trang số n (n >= 1) của danh sách Post

# API Thể loại (Category):
  - `/api/posts/all`
  - `

# CÁC COMPONENTS:
- `Article`              : Chi tiết post đầy đủ
- `ArticleCardOverlay`   : Link post, tiêu đề post nằm đè lên ảnh
- `ArticleCardSide`      : Link post, tiêu đề post nằm bên phải ảnh
- `ArticleCarousel`      :
- `ArticleCatalog`       : Danh sách link các post
- `ArticleSidebar`       : 

# CÁC THỨ CHƯA LÀM
- Chưa responsive
- Chưa có trang chỉ chứa các post theo thể loại (`/posts/:category`)
- Chưa có trang search
- ???
