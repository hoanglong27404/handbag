/**
 * Script: Xóa toàn bộ dữ liệu cũ và upload 30 sản phẩm túi xách
 * Chạy: node scripts/seed_api.js
 *
 * Fields: handbagName, brand, uri, gender, category, percentOff, cost, color,
 *         description, address, feedbacks
 */

const BASE_URL = 'https://6879244663f24f1fdca10af4.mockapi.io/schedule';

const IMGS = {
  // Bvlgari
  bv_red:      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80',
  bv_wallet:   'https://images.unsplash.com/photo-1614179689702-355944cd0918?w=400&q=80',
  bv_tote:     'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&q=80',
  bv_clutch:   'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80',
  bv_shoulder: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&q=80',
  bv_card:     'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
  // Michael Kors
  mk_mono:     'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&q=80',
  mk_wallet:   'https://images.unsplash.com/photo-1598532154849-b47ff2c52082?w=400&q=80',
  mk_tote:     'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80',
  mk_hamilton: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&q=80',
  mk_long:     'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
  mk_mini:     'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&q=80',
  // Burberry
  bb_shield:   'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80',
  bb_tote:     'https://images.unsplash.com/photo-1614179689702-355944cd0918?w=400&q=80',
  bb_olympia:  'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&q=80',
  bb_mini:     'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&q=80',
  bb_wallet:   'https://images.unsplash.com/photo-1598532154849-b47ff2c52082?w=400&q=80',
  bb_clutch:   'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80',
  // Ferragamo
  sf_logo:     'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
  sf_cutout:   'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&q=80',
  sf_gancini:  'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80',
  sf_fiamma:   'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&q=80',
  sf_clutch:   'https://images.unsplash.com/photo-1614179689702-355944cd0918?w=400&q=80',
  sf_studio:   'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&q=80',
  // Fendi
  fd_peek:     'https://images.unsplash.com/photo-1598532154849-b47ff2c52082?w=400&q=80',
  fd_first:    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80',
  fd_card:     'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
  fd_baguette: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80',
  fd_tote:     'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&q=80',
  fd_nano:     'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&q=80',
};

const STORE_ADDRESSES = {
  Bvlgari:        '65 Lê Lợi, Bến Nghé, Quận 1, TP. Hồ Chí Minh',
  'Michael Kors': '72 Lê Thánh Tôn, Bến Nghé, Quận 1, TP. Hồ Chí Minh',
  Burberry:       '34 Lê Duẩn, Bến Nghé, Quận 1, TP. Hồ Chí Minh',
  Ferragamo:      '141 Nguyễn Huệ, Bến Nghé, Quận 1, TP. Hồ Chí Minh',
  Fendi:          'Tầng 2, 101 Tôn Dật Tiên, Phú Mỹ Hưng, Quận 7, TP. Hồ Chí Minh',
};

// Feedbacks mẫu tương ứng thứ tự 30 sản phẩm (index 0–29)
const INITIAL_FEEDBACKS = [
  // [0] Bvlgari - Túi Đeo Chéo Serpenti
  [
    { id: 'f1', user: 'Minh Anh', rating: 5, comment: 'Túi đẹp tuyệt vời! Màu đỏ rất rực rỡ và sang trọng.', date: '2024-01-15' },
    { id: 'f2', user: 'Bảo Châu', rating: 4, comment: 'Chất lượng da thật tuyệt. Giá hơi cao nhưng xứng đáng.', date: '2024-02-10' },
    { id: 'f3', user: 'Thu Hà',   rating: 5, comment: 'Bvlgari luôn không làm thất vọng. Sản phẩm đẳng cấp.', date: '2024-03-01' },
  ],
  // [1] Bvlgari - Ví Da Serpenti
  [
    { id: 'f4', user: 'Lan Phương', rating: 4, comment: 'Ví nhỏ gọn, thiết kế đẹp. Rất tiện mang theo hàng ngày.', date: '2024-01-20' },
    { id: 'f5', user: 'Tuấn Anh',  rating: 5, comment: 'Mua làm quà tặng, người nhận rất thích!', date: '2024-02-05' },
  ],
  // [2] Bvlgari - Túi Tote Logo
  [
    { id: 'f6', user: 'Hồng Nhung', rating: 4, comment: 'Túi tote rộng, đựng được nhiều đồ. Màu trắng ngà rất sang.', date: '2024-01-25' },
    { id: 'f7', user: 'Việt Hùng',  rating: 5, comment: 'Chất lượng da bê tuyệt hảo, đường chỉ hoàn thiện đẹp.', date: '2024-02-18' },
  ],
  // [3] Bvlgari - Clutch Serpenti
  [
    { id: 'f8', user: 'Ngọc Mai',   rating: 5, comment: 'Clutch nhỏ nhưng cực kỳ sang chảnh! Đi tiệc ai cũng hỏi mua ở đâu.', date: '2024-01-30' },
    { id: 'f9', user: 'Trung Kiên', rating: 4, comment: 'Da rắn độc đáo, phụ kiện hoàn hảo cho buổi tối.', date: '2024-03-05' },
  ],
  // [4] Bvlgari - Túi Đeo Vai Cabochon
  [
    { id: 'f10', user: 'Thanh Tuyền', rating: 4, comment: 'Túi đeo vai tiện lợi, dùng đi làm rất hợp.', date: '2024-02-01' },
    { id: 'f11', user: 'Đức Thành',   rating: 5, comment: 'Khóa vàng đẹp, da bê mềm mại. Rất hài lòng!', date: '2024-02-25' },
  ],
  // [5] Bvlgari - Hộp Card
  [
    { id: 'f12', user: 'Phương Linh', rating: 5, comment: 'Hộp card sang trọng, phù hợp dùng nơi công sở.', date: '2024-01-10' },
    { id: 'f13', user: 'Hoàng Nam',   rating: 4, comment: 'Thiết kế chuyên nghiệp, chất liệu tốt.', date: '2024-02-14' },
  ],
  // [6] Michael Kors - Túi Monogram
  [
    { id: 'f14', user: 'Khánh Linh', rating: 4, comment: 'Họa tiết monogram rất nổi bật, nhiều người khen.', date: '2024-01-18' },
    { id: 'f15', user: 'Bảo Ngọc',   rating: 3, comment: 'Túi đẹp nhưng dây đeo hơi ngắn với tôi.', date: '2024-02-22' },
    { id: 'f16', user: 'Mỹ Duyên',   rating: 5, comment: 'Túi đeo vai yêu thích nhất của tôi hiện tại!', date: '2024-03-12' },
  ],
  // [7] Michael Kors - Ví Empire
  [
    { id: 'f17', user: 'Hải Yến',   rating: 4, comment: 'Ví nhỏ nhắn dễ thương, đựng vừa đủ thứ cần thiết.', date: '2024-01-22' },
    { id: 'f18', user: 'Quang Minh', rating: 5, comment: 'Mua làm quà Valentine, bạn gái thích lắm!', date: '2024-02-28' },
    { id: 'f19', user: 'Thu Thảo',   rating: 4, comment: 'Chất da tốt, màu hồng phấn cực kỳ dễ thương.', date: '2024-03-15' },
  ],
  // [8] Michael Kors - Túi Tote Jet Set
  [
    { id: 'f20', user: 'Lan Anh',   rating: 5, comment: 'Túi tote rộng, đi làm hay đi mua sắm đều tiện.', date: '2024-01-08' },
    { id: 'f21', user: 'Minh Quân', rating: 4, comment: 'Chất lượng tốt cho mức giá này. Recommend!', date: '2024-02-12' },
  ],
  // [9] Michael Kors - Hamilton Lock
  [
    { id: 'f22', user: 'Nguyệt Ánh', rating: 5, comment: 'Túi xách tay sang trọng, da mềm mịn. Rất đáng tiền!', date: '2024-01-05' },
    { id: 'f23', user: 'Đình Phong',  rating: 4, comment: 'Thiết kế đẹp, khóa chắc chắn. Tôi rất hài lòng.', date: '2024-02-20' },
    { id: 'f24', user: 'Bích Ngân',   rating: 5, comment: 'Đẳng cấp thật sự! Xứng đáng từng đồng bỏ ra.', date: '2024-03-18' },
  ],
  // [10] Michael Kors - Ví Dài
  [
    { id: 'f25', user: 'Tú Anh',    rating: 4, comment: 'Ví dài thiết kế tinh tế, nhiều ngăn rất tiện.', date: '2024-01-28' },
    { id: 'f26', user: 'Hữu Khang', rating: 5, comment: 'Mua tặng mẹ, mẹ rất thích màu nâu sang trọng.', date: '2024-02-16' },
  ],
  // [11] Michael Kors - Crossbody Mini
  [
    { id: 'f27', user: 'Diễm My',     rating: 4, comment: 'Túi mini xinh xắn, đi chơi cuối tuần rất hợp.', date: '2024-01-14' },
    { id: 'f28', user: 'Công Tuấn',   rating: 5, comment: 'Màu xanh navy đẹp, dây đeo chắc chắn.', date: '2024-03-02' },
    { id: 'f29', user: 'Phúc Nguyên', rating: 3, comment: 'Túi khá nhỏ, chỉ đựng được đồ cơ bản.', date: '2024-03-22' },
  ],
  // [12] Burberry - Shield
  [
    { id: 'f30', user: 'Trúc Linh', rating: 5, comment: 'Túi Burberry luôn chất lượng. Màu xám bạc rất sang.', date: '2024-01-20' },
    { id: 'f31', user: 'Gia Bảo',   rating: 4, comment: 'Họa tiết kẻ caro truyền thống, nhìn rất luxury.', date: '2024-02-08' },
  ],
  // [13] Burberry - Tote Logo
  [
    { id: 'f32', user: 'Thanh Hà',   rating: 4, comment: 'Túi tote rộng, vải canvas bền đẹp.', date: '2024-01-12' },
    { id: 'f33', user: 'Minh Triết', rating: 5, comment: 'Đi làm mang theo laptop vẫn còn dư chỗ. Rất tiện!', date: '2024-02-24' },
  ],
  // [14] Burberry - Olympia
  [
    { id: 'f34', user: 'Yến Nhi',    rating: 5, comment: 'Túi đeo chéo tiện lợi, da thật rất chắc chắn.', date: '2024-01-16' },
    { id: 'f35', user: 'Hoàng Phúc', rating: 4, comment: 'Thiết kế gọn, nhiều ngăn nhỏ rất tiện dụng.', date: '2024-03-04' },
    { id: 'f36', user: 'Kim Ngân',   rating: 5, comment: 'Màu be tự nhiên rất dễ phối đồ!', date: '2024-03-20' },
  ],
  // [15] Burberry - Mini TB
  [
    { id: 'f37', user: 'Nhật Linh',  rating: 4, comment: 'Túi mini cực xinh, mang đi dự tiệc hay dạo phố đều ổn.', date: '2024-02-03' },
    { id: 'f38', user: 'Thanh Bình', rating: 5, comment: 'Chất lượng Burberry không cần bàn. Đẳng cấp!', date: '2024-03-10' },
  ],
  // [16] Burberry - Ví Kẻ Caro
  [
    { id: 'f39', user: 'Hà Phương', rating: 4, comment: 'Ví kẻ caro đặc trưng Burberry, rất nhận diện thương hiệu.', date: '2024-01-22' },
    { id: 'f40', user: 'Minh Hải',  rating: 3, comment: 'Đẹp nhưng không chống nước tốt lắm.', date: '2024-02-14' },
  ],
  // [17] Burberry - Clutch Đen
  [
    { id: 'f41', user: 'Tuyết Nhi', rating: 5, comment: 'Clutch đen tối giản nhưng cực sang. Đi dạ tiệc không gì sánh bằng!', date: '2024-01-30' },
    { id: 'f42', user: 'Khánh Nam', rating: 4, comment: 'Dây xích vàng rất đẹp, đựng đủ điện thoại và son.', date: '2024-02-26' },
  ],
  // [18] Ferragamo - Logo Đỏ
  [
    { id: 'f43', user: 'Mai Linh',    rating: 5, comment: 'Màu đỏ rực rỡ, logo thêu tỉ mỉ. Rất đẹp!', date: '2024-02-01' },
    { id: 'f44', user: 'Thanh Dũng',  rating: 4, comment: 'Da Italy thật sự rất tốt, đường chỉ hoàn hảo.', date: '2024-03-05' },
    { id: 'f45', user: 'Phương Chi',  rating: 5, comment: 'Ferragamo luôn đỉnh! Túi này tôi rất yêu thích.', date: '2024-03-25' },
  ],
  // [19] Ferragamo - Cut-Out
  [
    { id: 'f46', user: 'Ngọc Huyền', rating: 4, comment: 'Thiết kế khoét lỗ độc đáo, không giống ai.', date: '2024-01-08' },
    { id: 'f47', user: 'Trọng Nhân', rating: 5, comment: 'Túi cứng cáp, giữ dáng tốt. Đáng mua!', date: '2024-02-12' },
  ],
  // [20] Ferragamo - Gancini
  [
    { id: 'f48', user: 'Diễm Châu', rating: 5, comment: 'Ví hồng phấn cực dễ thương! Khóa Gancini rất đẹp.', date: '2024-01-14' },
    { id: 'f49', user: 'Đức Huy',   rating: 4, comment: 'Mua tặng bạn gái, cô ấy rất thích.', date: '2024-02-20' },
  ],
  // [21] Ferragamo - Tote Fiamma
  [
    { id: 'f50', user: 'Bảo Trân',  rating: 4, comment: 'Túi tote đựng được nhiều thứ, màu camel rất sang.', date: '2024-01-18' },
    { id: 'f51', user: 'Quốc Hùng', rating: 5, comment: 'Chất lượng tuyệt vời, xứng đáng là hàng hiệu.', date: '2024-02-28' },
    { id: 'f52', user: 'Thảo Vy',   rating: 4, comment: 'Đường chỉ đẹp, da thật bền lâu.', date: '2024-03-18' },
  ],
  // [22] Ferragamo - Clutch Vàng
  [
    { id: 'f53', user: 'Cẩm Ly',    rating: 5, comment: 'Clutch vàng gold cực sang! Đi dự tiệc ai cũng ngắm nhìn.', date: '2024-01-28' },
    { id: 'f54', user: 'Hoàng Long', rating: 4, comment: 'Màu vàng rực rỡ, chất da mịn mượt.', date: '2024-02-16' },
  ],
  // [23] Ferragamo - Studio Soft
  [
    { id: 'f55', user: 'Thu Uyên',   rating: 5, comment: 'Màu xanh cobalt rất cá tính! Tôi nhận được nhiều lời khen.', date: '2024-01-05' },
    { id: 'f56', user: 'Bảo Khang',  rating: 4, comment: 'Da mềm, dây đeo chắc. Rất tiện dùng hàng ngày.', date: '2024-02-10' },
    { id: 'f57', user: 'Ngọc Trinh', rating: 5, comment: 'Ferragamo studio soft quá đỉnh!', date: '2024-03-08' },
  ],
  // [24] Fendi - Peekaboo
  [
    { id: 'f58', user: 'Hương Lan',    rating: 5, comment: 'Peekaboo mini là túi mơ ước của tôi! Đẹp hơn tưởng tượng.', date: '2024-01-10' },
    { id: 'f59', user: 'Minh Khoa',    rating: 4, comment: 'Màu xanh bơ lạ mắt, da nappa siêu mịn.', date: '2024-02-14' },
    { id: 'f60', user: 'Hạnh Nguyên',  rating: 5, comment: 'Biểu tượng thương hiệu Fendi! Xứng đáng từng xu.', date: '2024-03-08' },
  ],
  // [25] Fendi - First Sight
  [
    { id: 'f61', user: 'Quỳnh Anh', rating: 5, comment: 'Túi denim cá tính, khóa FF vàng rất đẹp.', date: '2024-01-28' },
    { id: 'f62', user: 'Đức Minh',  rating: 4, comment: 'Dáng bồng độc đáo, không đụng hàng.', date: '2024-02-16' },
  ],
  // [26] Fendi - Card Case
  [
    { id: 'f63', user: 'Lệ Hằng',   rating: 4, comment: 'Ví card nhỏ xinh, logo Fendi nổi bật.', date: '2024-01-14' },
    { id: 'f64', user: 'Tuấn Khải', rating: 5, comment: 'Mua tặng vợ nhân dịp sinh nhật, vợ thích lắm!', date: '2024-03-02' },
    { id: 'f65', user: 'Phúc An',   rating: 3, comment: 'Đẹp nhưng nhỏ, chỉ đựng được vài card thôi.', date: '2024-03-22' },
  ],
  // [27] Fendi - Baguette
  [
    { id: 'f66', user: 'Kiều My',  rating: 5, comment: 'Túi baguette đan lưới tuyệt đẹp! Thủ công tỉ mỉ lắm.', date: '2024-01-08' },
    { id: 'f67', user: 'Gia Huy',  rating: 4, comment: 'Màu kem nhẹ nhàng, dễ phối nhiều loại trang phục.', date: '2024-02-12' },
  ],
  // [28] Fendi - Tote Canvas
  [
    { id: 'f68', user: 'Bích Phượng', rating: 4, comment: 'Túi tote canvas bền, đi học hay đi làm đều được.', date: '2024-01-22' },
    { id: 'f69', user: 'Quốc Toản',   rating: 5, comment: 'Logo FF rất nhận diện, màu đen sang trọng.', date: '2024-02-28' },
    { id: 'f70', user: 'Kim Oanh',    rating: 4, comment: 'Chất vải dày dặn, đường viền da đẹp.', date: '2024-03-18' },
  ],
  // [29] Fendi - Nano Fendigraphy
  [
    { id: 'f71', user: 'Ngân Hà',   rating: 5, comment: 'Túi nano đỏ cực kỳ cá tính! Nhỏ mà đậm chất Fendi.', date: '2024-01-28' },
    { id: 'f72', user: 'Minh Tuấn', rating: 4, comment: 'Thiết kế in chữ nghệ thuật rất độc đáo.', date: '2024-02-16' },
  ],
];

const handbags = [
  // ──── BVLGARI (6 sản phẩm) ────
  {
    handbagName: 'Túi Đeo Chéo Serpenti Forever Da Thằn Lằn Màu Đỏ',
    brand: 'Bvlgari',
    uri: IMGS.bv_red,
    gender: false,
    category: 'Túi Đeo Chéo',
    percentOff: 0.42,
    cost: 68500000,
    color: ['Đỏ'],
    description: 'Da thằn lằn thật cao cấp, khóa vàng 18k đặc trưng Bvlgari. Thiết kế serpenti biểu tượng phù hợp cho các buổi tiệc sang trọng.',
    address: STORE_ADDRESSES['Bvlgari'],
    feedbacks: INITIAL_FEEDBACKS[0],
  },
  {
    handbagName: 'Ví Da Serpenti Compact Màu Xanh Ngọc',
    brand: 'Bvlgari',
    uri: IMGS.bv_wallet,
    gender: true,
    category: 'Ví Da',
    percentOff: 0.38,
    cost: 10900000,
    color: ['Xanh Ngọc', 'Bạc'],
    description: 'Ví da bê thật, thiết kế nhỏ gọn tiện lợi, logo Bvlgari dập nổi thanh lịch.',
    address: STORE_ADDRESSES['Bvlgari'],
    feedbacks: INITIAL_FEEDBACKS[1],
  },
  {
    handbagName: 'Túi Tote Logo Series Da Bê Màu Trắng Ngà',
    brand: 'Bvlgari',
    uri: IMGS.bv_tote,
    gender: false,
    category: 'Túi Tote',
    percentOff: 0.40,
    cost: 38200000,
    color: ['Trắng Ngà'],
    description: 'Da bê cao cấp, dây đeo điều chỉnh được, dung tích rộng phù hợp đi làm hàng ngày.',
    address: STORE_ADDRESSES['Bvlgari'],
    feedbacks: INITIAL_FEEDBACKS[2],
  },
  {
    handbagName: 'Túi Clutch Serpenti Forever Mini Màu Đen',
    brand: 'Bvlgari',
    uri: IMGS.bv_clutch,
    gender: false,
    category: 'Clutch',
    percentOff: 0.35,
    cost: 52000000,
    color: ['Đen', 'Vàng Gold'],
    description: 'Họa tiết da rắn độc đáo, phụ kiện lý tưởng cho tiệc tối. Khóa đầu rắn mạ vàng.',
    address: STORE_ADDRESSES['Bvlgari'],
    feedbacks: INITIAL_FEEDBACKS[3],
  },
  {
    handbagName: 'Túi Đeo Vai Cabochon Da Bê Màu Camel',
    brand: 'Bvlgari',
    uri: IMGS.bv_shoulder,
    gender: false,
    category: 'Túi Đeo Vai',
    percentOff: 0.45,
    cost: 44800000,
    color: ['Camel', 'Nâu'],
    description: 'Khóa nhẫn đặc trưng, phù hợp đi làm và dạo phố. Da bê Italy mềm mại.',
    address: STORE_ADDRESSES['Bvlgari'],
    feedbacks: INITIAL_FEEDBACKS[4],
  },
  {
    handbagName: 'Hộp Đựng Card Serpenti Forever Màu Bạc',
    brand: 'Bvlgari',
    uri: IMGS.bv_card,
    gender: true,
    category: 'Hộp Card',
    percentOff: 0.36,
    cost: 5600000,
    color: ['Bạc'],
    description: 'Thiết kế chuyên nghiệp, phù hợp môi trường công sở. Họa tiết serpenti tinh xảo.',
    address: STORE_ADDRESSES['Bvlgari'],
    feedbacks: INITIAL_FEEDBACKS[5],
  },

  // ──── MICHAEL KORS (6 sản phẩm) ────
  {
    handbagName: 'Túi Đeo Vai Họa Tiết Monogram Màu Be',
    brand: 'Michael Kors',
    uri: IMGS.mk_mono,
    gender: false,
    category: 'Túi Đeo Vai',
    percentOff: 0.55,
    cost: 5300000,
    color: ['Be', 'Nâu Nhạt', 'Xám'],
    description: 'Họa tiết monogram MK nổi bật, dây đeo có thể tháo rời, phù hợp nhiều phong cách.',
    address: STORE_ADDRESSES['Michael Kors'],
    feedbacks: INITIAL_FEEDBACKS[6],
  },
  {
    handbagName: 'Ví Da Empire Nhỏ Gọn Màu Hồng Phấn',
    brand: 'Michael Kors',
    uri: IMGS.mk_wallet,
    gender: false,
    category: 'Ví Da',
    percentOff: 0.62,
    cost: 1220000,
    color: ['Hồng Phấn', 'Đỏ', 'Đen'],
    description: 'Ví da thật gọn nhẹ, nhiều ngăn đựng thẻ tiện dụng. Màu hồng phấn cực kỳ dễ thương.',
    address: STORE_ADDRESSES['Michael Kors'],
    feedbacks: INITIAL_FEEDBACKS[7],
  },
  {
    handbagName: 'Túi Tote Jet Set Travel Cỡ Vừa Màu Đen',
    brand: 'Michael Kors',
    uri: IMGS.mk_tote,
    gender: false,
    category: 'Túi Tote',
    percentOff: 0.48,
    cost: 9800000,
    color: ['Đen', 'Nâu'],
    description: 'Dung tích lớn, khóa kéo chắc chắn, phù hợp đi làm hàng ngày. Logo MK nổi bật.',
    address: STORE_ADDRESSES['Michael Kors'],
    feedbacks: INITIAL_FEEDBACKS[8],
  },
  {
    handbagName: 'Túi Xách Tay Hamilton Lock Màu Nâu Da',
    brand: 'Michael Kors',
    uri: IMGS.mk_hamilton,
    gender: false,
    category: 'Túi Xách Tay',
    percentOff: 0.50,
    cost: 7600000,
    color: ['Nâu Da', 'Đen', 'Kem'],
    description: 'Khóa bấm logo MK độc đáo, da thật mềm mịn. Thiết kế cổ điển phù hợp mọi dịp.',
    address: STORE_ADDRESSES['Michael Kors'],
    feedbacks: INITIAL_FEEDBACKS[9],
  },
  {
    handbagName: 'Ví Dài Chữ Ký Màu Nâu Acorn',
    brand: 'Michael Kors',
    uri: IMGS.mk_long,
    gender: false,
    category: 'Ví Dài',
    percentOff: 0.55,
    cost: 1980000,
    color: ['Nâu Acorn', 'Đen', 'Đỏ Đô'],
    description: 'Vải chữ ký + da phối hợp tinh tế, nhiều ngăn đựng tiền và thẻ.',
    address: STORE_ADDRESSES['Michael Kors'],
    feedbacks: INITIAL_FEEDBACKS[10],
  },
  {
    handbagName: 'Túi Đeo Chéo Crossbody Mini Màu Xanh Navy',
    brand: 'Michael Kors',
    uri: IMGS.mk_mini,
    gender: false,
    category: 'Túi Đeo Chéo',
    percentOff: 0.45,
    cost: 4500000,
    color: ['Xanh Navy', 'Đen', 'Hồng'],
    description: 'Kích thước mini đáng yêu, dây đeo dài điều chỉnh được. Phù hợp đi chơi cuối tuần.',
    address: STORE_ADDRESSES['Michael Kors'],
    feedbacks: INITIAL_FEEDBACKS[11],
  },

  // ──── BURBERRY (6 sản phẩm) ────
  {
    handbagName: 'Túi Đeo Vai Mini Shield Màu Xám Bạc',
    brand: 'Burberry',
    uri: IMGS.bb_shield,
    gender: true,
    category: 'Túi Đeo Vai',
    percentOff: 0.56,
    cost: 14300000,
    color: ['Xám Bạc', 'Đen'],
    description: 'Họa tiết kẻ caro Burberry truyền thống, khóa xoay đặc trưng. Phong cách Anh Quốc cổ điển.',
    address: STORE_ADDRESSES['Burberry'],
    feedbacks: INITIAL_FEEDBACKS[12],
  },
  {
    handbagName: 'Túi Tote Logo Print Cỡ Lớn Màu Kem',
    brand: 'Burberry',
    uri: IMGS.bb_tote,
    gender: false,
    category: 'Túi Tote',
    percentOff: 0.50,
    cost: 18000000,
    color: ['Kem', 'Trắng'],
    description: 'Vải canvas cao cấp in logo, dung tích rộng cho ngày bận rộn. Tay cầm da thật.',
    address: STORE_ADDRESSES['Burberry'],
    feedbacks: INITIAL_FEEDBACKS[13],
  },
  {
    handbagName: 'Túi Đeo Chéo Olympia Da Màu Be Tự Nhiên',
    brand: 'Burberry',
    uri: IMGS.bb_olympia,
    gender: true,
    category: 'Túi Đeo Chéo',
    percentOff: 0.47,
    cost: 6800000,
    color: ['Be Tự Nhiên'],
    description: 'Da bê cao cấp, ngăn card + ngăn phụ tiện lợi. Dây đeo điều chỉnh được.',
    address: STORE_ADDRESSES['Burberry'],
    feedbacks: INITIAL_FEEDBACKS[14],
  },
  {
    handbagName: 'Túi Mini TB Màu Nâu Birch',
    brand: 'Burberry',
    uri: IMGS.bb_mini,
    gender: false,
    category: 'Túi Mini',
    percentOff: 0.42,
    cost: 22500000,
    color: ['Nâu Birch', 'Đen', 'Đỏ'],
    description: 'Phong cách cổ điển Anh Quốc, khóa TB mạ vàng sang trọng. Kích thước mini tinh tế.',
    address: STORE_ADDRESSES['Burberry'],
    feedbacks: INITIAL_FEEDBACKS[15],
  },
  {
    handbagName: 'Ví Da Kẻ Caro Họa Tiết Truyền Thống',
    brand: 'Burberry',
    uri: IMGS.bb_wallet,
    gender: false,
    category: 'Ví Da',
    percentOff: 0.38,
    cost: 8200000,
    color: ['Be Caro', 'Nâu Caro'],
    description: 'Họa tiết kẻ caro đặc trưng, chất liệu canvas + da viền. Biểu tượng thời trang Anh Quốc.',
    address: STORE_ADDRESSES['Burberry'],
    feedbacks: INITIAL_FEEDBACKS[16],
  },
  {
    handbagName: 'Túi Clutch Da Mềm Màu Đen Tối Giản',
    brand: 'Burberry',
    uri: IMGS.bb_clutch,
    gender: false,
    category: 'Clutch',
    percentOff: 0.44,
    cost: 16700000,
    color: ['Đen'],
    description: 'Da nappa mịn mượt, dây xích vàng có thể tháo rời. Thiết kế tối giản sang trọng.',
    address: STORE_ADDRESSES['Burberry'],
    feedbacks: INITIAL_FEEDBACKS[17],
  },

  // ──── FERRAGAMO (6 sản phẩm) ────
  {
    handbagName: 'Túi Đeo Vai Thêu Logo Màu Đỏ Rực',
    brand: 'Ferragamo',
    uri: IMGS.sf_logo,
    gender: false,
    category: 'Túi Đeo Vai',
    percentOff: 0.41,
    cost: 14600000,
    color: ['Đỏ'],
    description: 'Logo thêu nổi bật, da bê Italy cao cấp, đường chỉ hoàn thiện tinh tế. Màu đỏ rực rỡ.',
    address: STORE_ADDRESSES['Ferragamo'],
    feedbacks: INITIAL_FEEDBACKS[18],
  },
  {
    handbagName: 'Túi Cut-Out Đeo Vai Màu Đen Độc Đáo',
    brand: 'Ferragamo',
    uri: IMGS.sf_cutout,
    gender: true,
    category: 'Túi Đeo Vai',
    percentOff: 0.40,
    cost: 14400000,
    color: ['Đen', 'Xám'],
    description: 'Họa tiết khoét lỗ độc đáo, cấu trúc cứng cáp giữ dáng tốt. Thiết kế avant-garde.',
    address: STORE_ADDRESSES['Ferragamo'],
    feedbacks: INITIAL_FEEDBACKS[19],
  },
  {
    handbagName: 'Ví Da Gancini Khóa Màu Hồng Phấn',
    brand: 'Ferragamo',
    uri: IMGS.sf_gancini,
    gender: false,
    category: 'Ví Da',
    percentOff: 0.35,
    cost: 9200000,
    color: ['Hồng Phấn', 'Trắng Ngà', 'Đen'],
    description: 'Khóa Gancini biểu tượng, da bê Italy mềm mại. Thiết kế kinh điển Ferragamo.',
    address: STORE_ADDRESSES['Ferragamo'],
    feedbacks: INITIAL_FEEDBACKS[20],
  },
  {
    handbagName: 'Túi Tote Fiamma Cỡ Vừa Màu Camel',
    brand: 'Ferragamo',
    uri: IMGS.sf_fiamma,
    gender: false,
    category: 'Túi Tote',
    percentOff: 0.38,
    cost: 19500000,
    color: ['Camel', 'Đen'],
    description: 'Dáng tote thanh lịch, khóa kéo chắc chắn, dung tích lớn. Da Italy cao cấp.',
    address: STORE_ADDRESSES['Ferragamo'],
    feedbacks: INITIAL_FEEDBACKS[21],
  },
  {
    handbagName: 'Túi Clutch Dạ Hội Màu Vàng Gold',
    brand: 'Ferragamo',
    uri: IMGS.sf_clutch,
    gender: false,
    category: 'Clutch',
    percentOff: 0.33,
    cost: 25000000,
    color: ['Vàng Gold', 'Bạc'],
    description: 'Da dê mịn mượt, chi tiết mạ vàng, hoàn hảo cho sự kiện đặc biệt và dạ tiệc.',
    address: STORE_ADDRESSES['Ferragamo'],
    feedbacks: INITIAL_FEEDBACKS[22],
  },
  {
    handbagName: 'Túi Đeo Chéo Studio Soft Màu Xanh Cobalt',
    brand: 'Ferragamo',
    uri: IMGS.sf_studio,
    gender: false,
    category: 'Túi Đeo Chéo',
    percentOff: 0.42,
    cost: 12800000,
    color: ['Xanh Cobalt', 'Đỏ Đô', 'Đen'],
    description: 'Da mềm ôm form tốt, dây đeo dài phù hợp nhiều vóc người. Màu xanh cobalt cá tính.',
    address: STORE_ADDRESSES['Ferragamo'],
    feedbacks: INITIAL_FEEDBACKS[23],
  },

  // ──── FENDI (6 sản phẩm) ────
  {
    handbagName: 'Túi Peekaboo ISeeU Mini Màu Xanh Bơ',
    brand: 'Fendi',
    uri: IMGS.fd_peek,
    gender: false,
    category: 'Túi Xách Tay',
    percentOff: 0.37,
    cost: 18800000,
    color: ['Xanh Bơ', 'Xám Palladio', 'Hồng'],
    description: 'Biểu tượng Fendi bất hủ, da nappa Italy mềm mượt, phụ kiện bạc. Thiết kế độc đáo hai ngăn.',
    address: STORE_ADDRESSES['Fendi'],
    feedbacks: INITIAL_FEEDBACKS[24],
  },
  {
    handbagName: 'Túi Đeo Vai First Sight Màu Xanh Denim',
    brand: 'Fendi',
    uri: IMGS.fd_first,
    gender: true,
    category: 'Túi Đeo Vai',
    percentOff: 0.37,
    cost: 42900000,
    color: ['Xanh Denim', 'Xanh Cobalt', 'Đen'],
    description: 'Dáng bồng cá tính, khóa FF mạ vàng nổi bật. Phong cách trẻ trung hiện đại.',
    address: STORE_ADDRESSES['Fendi'],
    feedbacks: INITIAL_FEEDBACKS[25],
  },
  {
    handbagName: 'Ví Card Case Peekaboo Da Màu Xanh Edamame',
    brand: 'Fendi',
    uri: IMGS.fd_card,
    gender: true,
    category: 'Ví Card',
    percentOff: 0.35,
    cost: 7330000,
    color: ['Xanh Edamame', 'Be', 'Đen'],
    description: 'Kiểu dáng mini ấn tượng, logo FF dập nổi, nhiều ngăn card. Màu xanh edamame độc đáo.',
    address: STORE_ADDRESSES['Fendi'],
    feedbacks: INITIAL_FEEDBACKS[26],
  },
  {
    handbagName: 'Túi Baguette Mini Đan Lưới Màu Kem',
    brand: 'Fendi',
    uri: IMGS.fd_baguette,
    gender: false,
    category: 'Túi Baguette',
    percentOff: 0.40,
    cost: 28500000,
    color: ['Kem', 'Đen', 'Nâu'],
    description: 'Thiết kế đan lưới thủ công tỉ mỉ, dây xích phối da. Icon Fendi từ thập niên 90.',
    address: STORE_ADDRESSES['Fendi'],
    feedbacks: INITIAL_FEEDBACKS[27],
  },
  {
    handbagName: 'Túi Tote FF Logo Vải Canvas Màu Đen',
    brand: 'Fendi',
    uri: IMGS.fd_tote,
    gender: false,
    category: 'Túi Tote',
    percentOff: 0.32,
    cost: 23100000,
    color: ['Đen', 'Nâu'],
    description: 'Vải canvas FF cao cấp, viền da bê Italy, dây quai mềm êm tay. Thực dụng và sang trọng.',
    address: STORE_ADDRESSES['Fendi'],
    feedbacks: INITIAL_FEEDBACKS[28],
  },
  {
    handbagName: 'Túi Đeo Chéo Nano Fendigraphy Màu Đỏ',
    brand: 'Fendi',
    uri: IMGS.fd_nano,
    gender: false,
    category: 'Túi Đeo Chéo',
    percentOff: 0.39,
    cost: 31200000,
    color: ['Đỏ', 'Hồng Đậm', 'Đen'],
    description: 'In chữ Fendi nghệ thuật độc đáo, kích thước nano siêu nhỏ dễ thương.',
    address: STORE_ADDRESSES['Fendi'],
    feedbacks: INITIAL_FEEDBACKS[29],
  },
];

async function deleteRecord(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  return res.ok;
}

async function postRecord(data) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

async function main() {
  // 1. Lấy danh sách record cũ
  console.log('🔍 Đang lấy danh sách record cũ...');
  const res = await fetch(`${BASE_URL}?limit=200`);
  const existing = await res.json();
  console.log(`   → Tìm thấy ${existing.length} record cũ`);

  // 2. Xóa tất cả
  if (existing.length > 0) {
    console.log('🗑️  Đang xóa tất cả record cũ...');
    let deleted = 0;
    for (const item of existing) {
      const ok = await deleteRecord(item.id);
      if (ok) deleted++;
      process.stdout.write(`\r   → Đã xóa ${deleted}/${existing.length}`);
    }
    console.log('\n   ✅ Xóa xong!');
  }

  // 3. Upload 30 sản phẩm túi xách
  console.log('📦 Đang upload 30 sản phẩm (có address + feedbacks)...');
  const results = [];
  for (let i = 0; i < handbags.length; i++) {
    const bag = handbags[i];
    const result = await postRecord(bag);
    results.push(result);
    console.log(`   [${i + 1}/30] ✅ ${bag.handbagName.substring(0, 50)} (id: ${result.id})`);
  }

  console.log('\n🎉 Hoàn thành! Đã upload 30 sản phẩm với address & feedbacks.');
  console.log('📋 IDs:', results.map(r => r.id).join(', '));
}

main().catch(console.error);
