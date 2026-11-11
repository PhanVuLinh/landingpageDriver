// Cấu hình ảnh xe thật: đặt đường dẫn WebP/PNG trong suốt vào đây.
// Để trống ("") để dùng hình vẽ vector Thaco Ollin 500B tự động.
export const TRUCK_IMAGE = "";
export const TRUCK_IMAGE_URL = TRUCK_IMAGE; // Tương thích ngược

export const MAP_EMBED_URL = "https://www.google.com/maps?q=Qu%E1%BA%A3ng%20Ng%C3%A3i%2C%20Vi%E1%BB%87t%20Nam&output=embed";
export const MAP_LINK_URL = "https://www.google.com/maps/search/?api=1&query=Qu%E1%BA%A3ng%20Ng%C3%A3i%2C%20Vi%E1%BB%87t%20Nam";

export const content = {
  site: {
    name: "Dịch vụ vận tải Đình Thư",
    phone: "0913159302",
    title: "Dịch vụ vận tải Đình Thư | Quảng Ngãi",
    description: "Dịch vụ vận tải gia đình Đình Thư tại Quảng Ngãi. Chuyển nhà, chở hàng cửa hàng, vật liệu, nội thất và hàng đi tỉnh. Gọi hoặc Zalo 0913159302.",
    canonical: "https://dinhthu-van-tai.pages.dev/",
    socialImage: "https://dinhthu-van-tai.pages.dev/og-image.png",
    coordinates: { latitude: 15.1202, longitude: 108.8044 },
    areaServed: "Quảng Ngãi"
  },
  hero: {
    kicker: "VẬN TẢI GIA ĐÌNH · QUẢNG NGÃI",
    title: "Đình Thư chở hàng như chở đồ nhà mình",
    description: "Chuyển nhà, chở hàng, giao vật liệu — mình cùng tính chuyến cho gọn.",
    note: "Chạy hằng ngày trong tỉnh · Đi tỉnh khi cần",
    callLabel: "Gọi Đình Thư",
    zaloLabel: "Nhắn Zalo"
  },
  services: {
    title: "Cần chở gì, mình bàn chuyến đó.",
    intro: "Một chuyến nhỏ trong phố hay hàng xa, báo trước để mình xếp lịch.",
    items: [
      { number: "01", title: "Chuyển nhà, phòng trọ", text: "Đồ đạc gia đình, chở cẩn thận, an tâm." },
      { number: "02", title: "Hàng cửa hàng, quán xá", text: "Bàn ghế, thiết bị, giao nhận đúng hẹn." },
      { number: "03", title: "Vật liệu, nội thất, máy móc", text: "Báo trước kích thước để mình xếp thùng vừa vặn." },
      { number: "04", title: "Hàng đi tỉnh", text: "Nhận chuyến theo lịch hẹn, báo giá trực tiếp." }
    ]
  },
  vehicle: {
    title: "Một chiếc xe, vừa nhiều việc.",
    intro: "Xe gia đình Đình Thư, nhận chuyến theo nhu cầu thực tế.",
    specs: [
      { label: "Dòng xe", value: "Thaco Ollin 500B" },
      { label: "Tải trọng", value: "5 tấn" },
      { label: "Thùng xe", value: "Dài khoảng 4,3 m" }
    ],
    caption: "Kích thước và tải trọng cụ thể sẽ được trao đổi trước mỗi chuyến."
  },
  area: {
    title: "Quanh Quảng Ngãi là chính.",
    intro: "Chạy hàng ngày trong tỉnh. Đi tỉnh xa gọi trước để hẹn chuyến và hỏi giá.",
    location: "Quảng Ngãi và khu vực lân cận"
  },
  steps: {
    title: "Đặt xe, chỉ ba bước.",
    intro: "Gọi điện hoặc nhắn Zalo, trao đổi nhanh để sắp xếp.",
    items: [
      { title: "Gọi hoặc nhắn Zalo", text: "Nói rõ nhu cầu chuyển chở." },
      { title: "Báo điểm lấy và điểm giao", text: "Cho biết mặt hàng và thời gian mong muốn." },
      { title: "Hẹn chuyến", text: "Thống nhất giá và giờ, xe đến đúng hẹn." }
    ],
    after: "Hàng đi tỉnh: gọi trước để Đình Thư báo lịch và giá tốt."
  },
  contact: {
    kicker: "CẦN XE? MÌNH NGHE MÁY.",
    title: "Mình cùng tính chuyến nhé.",
    intro: "Gọi hoặc nhắn Zalo để hỏi lịch và nhận báo giá ngay.",
    areaNote: "Vận tải gia đình · Quảng Ngãi",
    callLabel: "Gọi ngay",
    zaloLabel: "Nhắn Zalo",
    mobileCall: "Gọi",
    mobileZalo: "Zalo"
  }
};
