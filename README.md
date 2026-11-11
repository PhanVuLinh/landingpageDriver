# Dịch vụ vận tải Đình Thư

Landing page tĩnh viết bằng Vite, HTML, CSS và JavaScript thuần. Không có biểu mẫu, backend hay cơ sở dữ liệu. Liên hệ duy nhất là gọi/Zalo **0913159302**.

## Chạy trên máy

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

Bản build nằm trong thư mục `dist/`.

## Sửa nội dung và thông tin

- Mở [`src/content.js`](src/content.js) để sửa lời giới thiệu, dịch vụ, thông số xe, khu vực, các bước đặt xe và số điện thoại.
- Biến `TRUCK_IMAGE` (hoặc `TRUCK_IMAGE_URL`) trong `src/content.js`: đặt đường dẫn tới ảnh xe thật dạng WebP/PNG **nền trong suốt** (ví dụ `/images/xe-dinh-thu.webp` lưu trong `public/images/`). Khi để trống `""`, hệ thống tự động vẽ minh họa xe Thaco Ollin 500B đầu vuông chuẩn vector SVG. Mọi hiệu ứng cuộn, quay bánh và giới hạn kích thước an toàn (`svh`/`vw`) vẫn được giữ nguyên đầy đủ.
- Đổi `MAP_EMBED_URL` và `MAP_LINK_URL` trong `src/content.js` khi có địa chỉ cụ thể. Tìm địa chỉ trên Google Maps, chọn **Chia sẻ → Nhúng bản đồ** để lấy URL iframe; link chỉ đường dùng dạng `https://www.google.com/maps/search/?api=1&query=...`. Bản đồ được tải lười (lazy load) thông minh khi người dùng cuộn đến gần khu vực để tối ưu tốc độ tải trang.
- Khi đổi số điện thoại, cập nhật số trong `src/content.js`, các liên kết và metadata tĩnh ở `index.html`, cùng dòng giới thiệu đầu README này.
- Trước khi xuất bản, thay tên miền mẫu `dinhthu-van-tai.pages.dev` bằng tên miền triển khai thật ở `src/content.js`, `index.html`, `public/robots.txt` và `public/sitemap.xml`.
- Cập nhật tọa độ trong `src/content.js` cho địa điểm kinh doanh/điểm xuất phát chính xác nếu có.

## Triển khai miễn phí

### Cloudflare Pages

Tạo dự án Pages, kết nối kho Git (hoặc tải bản build lên). Dùng lệnh build `npm run build`, thư mục đầu ra `dist`. Có thể dùng tên miền `*.pages.dev` miễn phí.

### Netlify

Tạo site từ kho Git, chọn build command `npm run build` và publish directory `dist`. Netlify cũng cấp tên miền `*.netlify.app` miễn phí.

## Lưu ý trước khi dùng

- Thay canonical/OG URL, sitemap và robots bằng đúng tên miền sau triển khai.
- Ảnh chia sẻ `public/og-image.png` đã có, kích thước 1200 × 630. Có thể thay ảnh này sau khi có ảnh xe thật hoặc cập nhật lại số/khẩu hiệu trên ảnh.
- Có thể đăng ký Google Business Profile bằng đúng số **0913159302** để khách tìm thấy dịch vụ địa phương.
