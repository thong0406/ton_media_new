## LƯU Ý:
- Ngoài trang Dashboard thì ko nên chạm phần admin

## CÁC API:
- `/api/posts/all?query=...`        : Trả danh sách các post
- `/api/posts/:category?query=...`  : Trả danh sách các post dựa vào category
- `/api/posts/:key`                 : Trả post có key (VD: "ten-post-12314")
- `/api/posts/delete/:key`          : Xóa post có key

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
- 
