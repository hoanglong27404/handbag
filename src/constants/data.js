// Danh sách thương hiệu (dùng cho BrandFilter)
export const BRANDS = ['Tất Cả', 'Bvlgari', 'Michael Kors', 'Burberry', 'Ferragamo', 'Fendi'];

// Địa chỉ cửa hàng theo thương hiệu (địa chỉ thật tại Việt Nam)
export const BRAND_STORES = {
  Bvlgari: [
    {
      id: 'bv1',
      name: 'Bvlgari Hồ Chí Minh',
      address: '65 Lê Lợi, Bến Nghé, Quận 1, TP. Hồ Chí Minh',
      latitude: 10.7743,
      longitude: 106.7014,
    },
    {
      id: 'bv2',
      name: 'Bvlgari Lotte Center Hà Nội',
      address: 'Tầng 1, Lotte Center, 54 Liễu Giai, Ba Đình, Hà Nội',
      latitude: 21.0285,
      longitude: 105.8412,
    },
  ],
  'Michael Kors': [
    {
      id: 'mk1',
      name: 'Michael Kors Vincom Center Bà Triệu',
      address: '191 Bà Triệu, Lê Đại Hành, Hai Bà Trưng, Hà Nội',
      latitude: 21.0120,
      longitude: 105.8465,
    },
    {
      id: 'mk2',
      name: 'Michael Kors Vincom Center Đồng Khởi',
      address: '72 Lê Thánh Tôn, Bến Nghé, Quận 1, TP. Hồ Chí Minh',
      latitude: 10.7767,
      longitude: 106.7025,
    },
  ],
  Burberry: [
    {
      id: 'bb1',
      name: 'Burberry Diamond Plaza',
      address: '34 Lê Duẩn, Bến Nghé, Quận 1, TP. Hồ Chí Minh',
      latitude: 10.7795,
      longitude: 106.7040,
    },
    {
      id: 'bb2',
      name: 'Burberry Tràng Tiền Plaza',
      address: 'Tầng 2, 24 Hai Bà Trưng, Hoàn Kiếm, Hà Nội',
      latitude: 21.0252,
      longitude: 105.8536,
    },
  ],
  Ferragamo: [
    {
      id: 'sf1',
      name: 'Ferragamo Union Square',
      address: '141 Nguyễn Huệ, Bến Nghé, Quận 1, TP. Hồ Chí Minh',
      latitude: 10.7738,
      longitude: 106.7029,
    },
    {
      id: 'sf2',
      name: 'Ferragamo Sofitel Metropole Hà Nội',
      address: '15 Ngô Quyền, Hoàn Kiếm, Hà Nội',
      latitude: 21.0245,
      longitude: 105.8539,
    },
  ],
  Fendi: [
    {
      id: 'fd1',
      name: 'Fendi Crescent Mall',
      address: 'Tầng 2, 101 Tôn Dật Tiên, Phú Mỹ Hưng, Quận 7, TP. Hồ Chí Minh',
      latitude: 10.7289,
      longitude: 106.7209,
    },
    {
      id: 'fd2',
      name: 'Fendi Lotte Center Hà Nội',
      address: '54 Liễu Giai, Ba Đình, Hà Nội',
      latitude: 21.0286,
      longitude: 105.8413,
    },
  ],
};

// Đánh giá mẫu theo ID sản phẩm
export const MOCK_FEEDBACKS = {
  '1': [
    { id: 'f1', user: 'Minh Anh', rating: 5, comment: 'Túi đẹp tuyệt vời! Màu đỏ rất rực rỡ và sang trọng.', date: '2024-01-15' },
    { id: 'f2', user: 'Bảo Châu', rating: 4, comment: 'Chất lượng da thật tuyệt. Giá hơi cao nhưng xứng đáng.', date: '2024-02-10' },
    { id: 'f3', user: 'Thu Hà', rating: 5, comment: 'Bvlgari luôn không làm thất vọng. Sản phẩm đẳng cấp.', date: '2024-03-01' },
  ],
  '2': [
    { id: 'f4', user: 'Lan Phương', rating: 4, comment: 'Ví nhỏ gọn, thiết kế đẹp. Rất tiện mang theo hàng ngày.', date: '2024-01-20' },
    { id: 'f5', user: 'Tuấn Anh', rating: 5, comment: 'Mua làm quà tặng, người nhận rất thích!', date: '2024-02-05' },
  ],
  '3': [
    { id: 'f6', user: 'Hồng Nhung', rating: 4, comment: 'Túi tote rộng, đựng được nhiều đồ. Màu trắng ngà rất sang.', date: '2024-01-25' },
    { id: 'f7', user: 'Việt Hùng', rating: 5, comment: 'Chất lượng da bê tuyệt hảo, đường chỉ hoàn thiện đẹp.', date: '2024-02-18' },
  ],
  '4': [
    { id: 'f8', user: 'Ngọc Mai', rating: 5, comment: 'Clutch nhỏ nhưng cực kỳ sang chảnh! Đi tiệc ai cũng hỏi mua ở đâu.', date: '2024-01-30' },
    { id: 'f9', user: 'Trung Kiên', rating: 4, comment: 'Da rắn độc đáo, phụ kiện hoàn hảo cho buổi tối.', date: '2024-03-05' },
  ],
  '5': [
    { id: 'f10', user: 'Thanh Tuyền', rating: 4, comment: 'Túi đeo vai tiện lợi, dùng đi làm rất hợp.', date: '2024-02-01' },
    { id: 'f11', user: 'Đức Thành', rating: 5, comment: 'Khóa vàng đẹp, da bê mềm mại. Rất hài lòng!', date: '2024-02-25' },
  ],
  '6': [
    { id: 'f12', user: 'Phương Linh', rating: 5, comment: 'Hộp card sang trọng, phù hợp dùng nơi công sở.', date: '2024-01-10' },
    { id: 'f13', user: 'Hoàng Nam', rating: 4, comment: 'Thiết kế chuyên nghiệp, chất liệu tốt.', date: '2024-02-14' },
  ],
  '7': [
    { id: 'f14', user: 'Khánh Linh', rating: 4, comment: 'Họa tiết monogram rất nổi bật, nhiều người khen.', date: '2024-01-18' },
    { id: 'f15', user: 'Bảo Ngọc', rating: 3, comment: 'Túi đẹp nhưng dây đeo hơi ngắn với tôi.', date: '2024-02-22' },
    { id: 'f16', user: 'Mỹ Duyên', rating: 5, comment: 'Túi đeo vai yêu thích nhất của tôi hiện tại!', date: '2024-03-12' },
  ],
  '8': [
    { id: 'f17', user: 'Hải Yến', rating: 4, comment: 'Ví nhỏ nhắn dễ thương, đựng vừa đủ thứ cần thiết.', date: '2024-01-22' },
    { id: 'f18', user: 'Quang Minh', rating: 5, comment: 'Mua làm quà Valentine, bạn gái thích lắm!', date: '2024-02-28' },
    { id: 'f19', user: 'Thu Thảo', rating: 4, comment: 'Chất da tốt, màu hồng phấn cực kỳ dễ thương.', date: '2024-03-15' },
  ],
  '9': [
    { id: 'f20', user: 'Lan Anh', rating: 5, comment: 'Túi tote rộng, đi làm hay đi mua sắm đều tiện.', date: '2024-01-08' },
    { id: 'f21', user: 'Minh Quân', rating: 4, comment: 'Chất lượng tốt cho mức giá này. Recommend!', date: '2024-02-12' },
  ],
  '10': [
    { id: 'f22', user: 'Nguyệt Ánh', rating: 5, comment: 'Túi xách tay sang trọng, da mềm mịn. Rất đáng tiền!', date: '2024-01-05' },
    { id: 'f23', user: 'Đình Phong', rating: 4, comment: 'Thiết kế đẹp, khóa chắc chắn. Tôi rất hài lòng.', date: '2024-02-20' },
    { id: 'f24', user: 'Bích Ngân', rating: 5, comment: 'Đẳng cấp thật sự! Xứng đáng từng đồng bỏ ra.', date: '2024-03-18' },
  ],
  '11': [
    { id: 'f25', user: 'Tú Anh', rating: 4, comment: 'Ví dài thiết kế tinh tế, nhiều ngăn rất tiện.', date: '2024-01-28' },
    { id: 'f26', user: 'Hữu Khang', rating: 5, comment: 'Mua tặng mẹ, mẹ rất thích màu nâu sang trọng.', date: '2024-02-16' },
  ],
  '12': [
    { id: 'f27', user: 'Diễm My', rating: 4, comment: 'Túi mini xinh xắn, đi chơi cuối tuần rất hợp.', date: '2024-01-14' },
    { id: 'f28', user: 'Công Tuấn', rating: 5, comment: 'Màu xanh navy đẹp, dây đeo chắc chắn.', date: '2024-03-02' },
    { id: 'f29', user: 'Phúc Nguyên', rating: 3, comment: 'Túi khá nhỏ, chỉ đựng được đồ cơ bản.', date: '2024-03-22' },
  ],
  '13': [
    { id: 'f30', user: 'Trúc Linh', rating: 5, comment: 'Túi Burberry luôn chất lượng. Màu xám bạc rất sang.', date: '2024-01-20' },
    { id: 'f31', user: 'Gia Bảo', rating: 4, comment: 'Họa tiết kẻ caro truyền thống, nhìn rất luxury.', date: '2024-02-08' },
  ],
  '14': [
    { id: 'f32', user: 'Thanh Hà', rating: 4, comment: 'Túi tote rộng, vải canvas bền đẹp.', date: '2024-01-12' },
    { id: 'f33', user: 'Minh Triết', rating: 5, comment: 'Đi làm mang theo laptop vẫn còn dư chỗ. Rất tiện!', date: '2024-02-24' },
  ],
  '15': [
    { id: 'f34', user: 'Yến Nhi', rating: 5, comment: 'Túi đeo chéo tiện lợi, da thật rất chắc chắn.', date: '2024-01-16' },
    { id: 'f35', user: 'Hoàng Phúc', rating: 4, comment: 'Thiết kế gọn, nhiều ngăn nhỏ rất tiện dụng.', date: '2024-03-04' },
    { id: 'f36', user: 'Kim Ngân', rating: 5, comment: 'Màu be tự nhiên rất dễ phối đồ!', date: '2024-03-20' },
  ],
  '16': [
    { id: 'f37', user: 'Nhật Linh', rating: 4, comment: 'Túi mini cực xinh, mang đi dự tiệc hay dạo phố đều ổn.', date: '2024-02-03' },
    { id: 'f38', user: 'Thanh Bình', rating: 5, comment: 'Chất lượng Burberry không cần bàn. Đẳng cấp!', date: '2024-03-10' },
  ],
  '17': [
    { id: 'f39', user: 'Hà Phương', rating: 4, comment: 'Ví kẻ caro đặc trưng Burberry, rất nhận diện thương hiệu.', date: '2024-01-22' },
    { id: 'f40', user: 'Minh Hải', rating: 3, comment: 'Đẹp nhưng không chống nước tốt lắm.', date: '2024-02-14' },
  ],
  '18': [
    { id: 'f41', user: 'Tuyết Nhi', rating: 5, comment: 'Clutch đen tối giản nhưng cực sang. Đi dạ tiệc không gì sánh bằng!', date: '2024-01-30' },
    { id: 'f42', user: 'Khánh Nam', rating: 4, comment: 'Dây xích vàng rất đẹp, đựng đủ điện thoại và son.', date: '2024-02-26' },
  ],
  '19': [
    { id: 'f43', user: 'Mai Linh', rating: 5, comment: 'Màu đỏ rực rỡ, logo thêu tỉ mỉ. Rất đẹp!', date: '2024-02-01' },
    { id: 'f44', user: 'Thanh Dũng', rating: 4, comment: 'Da Italy thật sự rất tốt, đường chỉ hoàn hảo.', date: '2024-03-05' },
    { id: 'f45', user: 'Phương Chi', rating: 5, comment: 'Ferragamo luôn đỉnh! Túi này tôi rất yêu thích.', date: '2024-03-25' },
  ],
  '20': [
    { id: 'f46', user: 'Ngọc Huyền', rating: 4, comment: 'Thiết kế khoét lỗ độc đáo, không giống ai.', date: '2024-01-08' },
    { id: 'f47', user: 'Trọng Nhân', rating: 5, comment: 'Túi cứng cáp, giữ dáng tốt. Đáng mua!', date: '2024-02-12' },
  ],
  '21': [
    { id: 'f48', user: 'Diễm Châu', rating: 5, comment: 'Ví hồng phấn cực dễ thương! Khóa Gancini rất đẹp.', date: '2024-01-14' },
    { id: 'f49', user: 'Đức Huy', rating: 4, comment: 'Mua tặng bạn gái, cô ấy rất thích.', date: '2024-02-20' },
  ],
  '22': [
    { id: 'f50', user: 'Bảo Trân', rating: 4, comment: 'Túi tote đựng được nhiều thứ, màu camel rất sang.', date: '2024-01-18' },
    { id: 'f51', user: 'Quốc Hùng', rating: 5, comment: 'Chất lượng tuyệt vời, xứng đáng là hàng hiệu.', date: '2024-02-28' },
    { id: 'f52', user: 'Thảo Vy', rating: 4, comment: 'Đường chỉ đẹp, da thật bền lâu.', date: '2024-03-18' },
  ],
  '23': [
    { id: 'f53', user: 'Cẩm Ly', rating: 5, comment: 'Clutch vàng gold cực sang! Đi dự tiệc ai cũng ngắm nhìn.', date: '2024-01-28' },
    { id: 'f54', user: 'Hoàng Long', rating: 4, comment: 'Màu vàng rực rỡ, chất da mịn mượt.', date: '2024-02-16' },
  ],
  '24': [
    { id: 'f55', user: 'Thu Uyên', rating: 5, comment: 'Màu xanh cobalt rất cá tính! Tôi nhận được nhiều lời khen.', date: '2024-01-05' },
    { id: 'f56', user: 'Bảo Khang', rating: 4, comment: 'Da mềm, dây đeo chắc. Rất tiện dùng hàng ngày.', date: '2024-02-10' },
    { id: 'f57', user: 'Ngọc Trinh', rating: 5, comment: 'Ferragamo studio soft quá đỉnh!', date: '2024-03-08' },
  ],
  '25': [
    { id: 'f58', user: 'Hương Lan', rating: 5, comment: 'Peekaboo mini là túi mơ ước của tôi! Đẹp hơn tưởng tượng.', date: '2024-01-10' },
    { id: 'f59', user: 'Minh Khoa', rating: 4, comment: 'Màu xanh bơ lạ mắt, da nappa siêu mịn.', date: '2024-02-14' },
    { id: 'f60', user: 'Hạnh Nguyên', rating: 5, comment: 'Biểu tượng thương hiệu Fendi! Xứng đáng từng xu.', date: '2024-03-08' },
  ],
  '26': [
    { id: 'f61', user: 'Quỳnh Anh', rating: 5, comment: 'Túi denim cá tính, khóa FF vàng rất đẹp.', date: '2024-01-28' },
    { id: 'f62', user: 'Đức Minh', rating: 4, comment: 'Dáng bồng độc đáo, không đụng hàng.', date: '2024-02-16' },
  ],
  '27': [
    { id: 'f63', user: 'Lệ Hằng', rating: 4, comment: 'Ví card nhỏ xinh, logo Fendi nổi bật.', date: '2024-01-14' },
    { id: 'f64', user: 'Tuấn Khải', rating: 5, comment: 'Mua tặng vợ nhân dịp sinh nhật, vợ thích lắm!', date: '2024-03-02' },
    { id: 'f65', user: 'Phúc An', rating: 3, comment: 'Đẹp nhưng nhỏ, chỉ đựng được vài card thôi.', date: '2024-03-22' },
  ],
  '28': [
    { id: 'f66', user: 'Kiều My', rating: 5, comment: 'Túi baguette đan lưới tuyệt đẹp! Thủ công tỉ mỉ lắm.', date: '2024-01-08' },
    { id: 'f67', user: 'Gia Huy', rating: 4, comment: 'Màu kem nhẹ nhàng, dễ phối nhiều loại trang phục.', date: '2024-02-12' },
  ],
  '29': [
    { id: 'f68', user: 'Bích Phượng', rating: 4, comment: 'Túi tote canvas bền, đi học hay đi làm đều được.', date: '2024-01-22' },
    { id: 'f69', user: 'Quốc Toản', rating: 5, comment: 'Logo FF rất nhận diện, màu đen sang trọng.', date: '2024-02-28' },
    { id: 'f70', user: 'Kim Oanh', rating: 4, comment: 'Chất vải dày dặn, đường viền da đẹp.', date: '2024-03-18' },
  ],
  '30': [
    { id: 'f71', user: 'Ngân Hà', rating: 5, comment: 'Túi nano đỏ cực kỳ cá tính! Nhỏ mà đậm chất Fendi.', date: '2024-01-28' },
    { id: 'f72', user: 'Minh Tuấn', rating: 4, comment: 'Thiết kế in chữ nghệ thuật rất độc đáo.', date: '2024-02-16' },
  ],
};
