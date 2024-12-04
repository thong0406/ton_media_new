### MODEL:
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

### API:

## API Post:

# `GET:/api/posts/all?query=...`
  + **Trả về:**: Danh sách các Post

  - `/api/posts/<category>?query=...` : Trả danh sách các post thuộc thể loại `category`
  - `/api/posts/:key`                 : Trả post có `key` (VD: "ten-post-12314")
  - `/api/posts/delete/:key`          : Xóa post có `key`
  - `/api/posts/update/:key`          : Update post có `key`
  - `/api/posts/all/count`            : Trả về tổng số post trong DB
  - `/api/posts/<category>/count`     : Trả về tổng số post thuộc thể loại `category` trong DB
- **API Thể loại (Category)**:
  - `/api/posts/all`
  - `

## CÁC COMPONENTS:
- `Article`              : Chi tiết post đầy đủ
- `ArticleCardOverlay`   : Link post, tiêu đề post nằm đè lên ảnh
- `ArticleCardSide`      : Link post, tiêu đề post nằm bên phải ảnh
- `ArticleCarousel`      :
- `ArticleCatalog`       : Danh sách link các post
- `ArticleSidebar`       : 

## CÁC THỨ CHƯA LÀM
- Chưa responsive
- Chưa có trang chỉ chứa các post theo thể loại (`/posts/:category`)
- Chưa có trang search
- ???
