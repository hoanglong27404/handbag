/**
 * Script: Xóa toàn bộ dữ liệu cũ và upload 30 sản phẩm túi xách
 * Chạy: node scripts/seed_api.js
 *
 * Fields: handbagName, brand, uri, gender, category, percentOff, cost, color, description
 */

const BASE_URL = 'https://6879244663f24f1fdca10af4.mockapi.io/schedule';

// Ảnh túi xách thực từ Unsplash (cho phép hotlink)
const IMGS = {
  // Bvlgari
  bv_red:     'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80',
  bv_wallet:  'https://images.unsplash.com/photo-1614179689702-355944cd0918?w=400&q=80',
  bv_tote:    'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&q=80',
  bv_clutch:  'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80',
  bv_shoulder:'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&q=80',
  bv_card:    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
  // Michael Kors
  mk_mono:    'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&q=80',
  mk_wallet:  'https://images.unsplash.com/photo-1598532154849-b47ff2c52082?w=400&q=80',
  mk_tote:    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80',
  mk_hamilton:'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&q=80',
  mk_long:    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
  mk_mini:    'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&q=80',
  // Burberry
  bb_shield:  'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80',
  bb_tote:    'https://images.unsplash.com/photo-1614179689702-355944cd0918?w=400&q=80',
  bb_olympia: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&q=80',
  bb_mini:    'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&q=80',
  bb_wallet:  'https://images.unsplash.com/photo-1598532154849-b47ff2c52082?w=400&q=80',
  bb_clutch:  'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80',
  // Ferragamo
  sf_logo:    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
  sf_cutout:  'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&q=80',
  sf_gancini: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80',
  sf_fiamma:  'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&q=80',
  sf_clutch:  'https://images.unsplash.com/photo-1614179689702-355944cd0918?w=400&q=80',
  sf_studio:  'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&q=80',
  // Fendi
  fd_peek:    'https://images.unsplash.com/photo-1598532154849-b47ff2c52082?w=400&q=80',
  fd_first:   'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80',
  fd_card:    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
  fd_baguette:'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80',
  fd_tote:    'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&q=80',
  fd_nano:    'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&q=80',
};

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
    color: '["Đỏ"]',
    description: 'Da thằn lằn thật cao cấp, khóa vàng 18k đặc trưng Bvlgari. Thiết kế serpenti biểu tượng phù hợp cho các buổi tiệc sang trọng.',
  },
  {
    handbagName: 'Ví Da Serpenti Compact Màu Xanh Ngọc',
    brand: 'Bvlgari',
    uri: IMGS.bv_wallet,
    gender: true,
    category: 'Ví Da',
    percentOff: 0.38,
    cost: 10900000,
    color: '["Xanh Ngọc","Bạc"]',
    description: 'Ví da bê thật, thiết kế nhỏ gọn tiện lợi, logo Bvlgari dập nổi thanh lịch.',
  },
  {
    handbagName: 'Túi Tote Logo Series Da Bê Màu Trắng Ngà',
    brand: 'Bvlgari',
    uri: IMGS.bv_tote,
    gender: false,
    category: 'Túi Tote',
    percentOff: 0.40,
    cost: 38200000,
    color: '["Trắng Ngà"]',
    description: 'Da bê cao cấp, dây đeo điều chỉnh được, dung tích rộng phù hợp đi làm hàng ngày.',
  },
  {
    handbagName: 'Túi Clutch Serpenti Forever Mini Màu Đen',
    brand: 'Bvlgari',
    uri: IMGS.bv_clutch,
    gender: false,
    category: 'Clutch',
    percentOff: 0.35,
    cost: 52000000,
    color: '["Đen","Vàng Gold"]',
    description: 'Họa tiết da rắn độc đáo, phụ kiện lý tưởng cho tiệc tối. Khóa đầu rắn mạ vàng.',
  },
  {
    handbagName: 'Túi Đeo Vai Cabochon Da Bê Màu Camel',
    brand: 'Bvlgari',
    uri: IMGS.bv_shoulder,
    gender: false,
    category: 'Túi Đeo Vai',
    percentOff: 0.45,
    cost: 44800000,
    color: '["Camel","Nâu"]',
    description: 'Khóa nhẫn đặc trưng, phù hợp đi làm và dạo phố. Da bê Italy mềm mại.',
  },
  {
    handbagName: 'Hộp Đựng Card Serpenti Forever Màu Bạc',
    brand: 'Bvlgari',
    uri: IMGS.bv_card,
    gender: true,
    category: 'Hộp Card',
    percentOff: 0.36,
    cost: 5600000,
    color: '["Bạc"]',
    description: 'Thiết kế chuyên nghiệp, phù hợp môi trường công sở. Họa tiết serpenti tinh xảo.',
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
    color: '["Be","Nâu Nhạt","Xám"]',
    description: 'Họa tiết monogram MK nổi bật, dây đeo có thể tháo rời, phù hợp nhiều phong cách.',
  },
  {
    handbagName: 'Ví Da Empire Nhỏ Gọn Màu Hồng Phấn',
    brand: 'Michael Kors',
    uri: IMGS.mk_wallet,
    gender: false,
    category: 'Ví Da',
    percentOff: 0.62,
    cost: 1220000,
    color: '["Hồng Phấn","Đỏ","Đen"]',
    description: 'Ví da thật gọn nhẹ, nhiều ngăn đựng thẻ tiện dụng. Màu hồng phấn cực kỳ dễ thương.',
  },
  {
    handbagName: 'Túi Tote Jet Set Travel Cỡ Vừa Màu Đen',
    brand: 'Michael Kors',
    uri: IMGS.mk_tote,
    gender: false,
    category: 'Túi Tote',
    percentOff: 0.48,
    cost: 9800000,
    color: '["Đen","Nâu"]',
    description: 'Dung tích lớn, khóa kéo chắc chắn, phù hợp đi làm hàng ngày. Logo MK nổi bật.',
  },
  {
    handbagName: 'Túi Xách Tay Hamilton Lock Màu Nâu Da',
    brand: 'Michael Kors',
    uri: IMGS.mk_hamilton,
    gender: false,
    category: 'Túi Xách Tay',
    percentOff: 0.50,
    cost: 7600000,
    color: '["Nâu Da","Đen","Kem"]',
    description: 'Khóa bấm logo MK độc đáo, da thật mềm mịn. Thiết kế cổ điển phù hợp mọi dịp.',
  },
  {
    handbagName: 'Ví Dài Chữ Ký Màu Nâu Acorn',
    brand: 'Michael Kors',
    uri: IMGS.mk_long,
    gender: false,
    category: 'Ví Dài',
    percentOff: 0.55,
    cost: 1980000,
    color: '["Nâu Acorn","Đen","Đỏ Đô"]',
    description: 'Vải chữ ký + da phối hợp tinh tế, nhiều ngăn đựng tiền và thẻ.',
  },
  {
    handbagName: 'Túi Đeo Chéo Crossbody Mini Màu Xanh Navy',
    brand: 'Michael Kors',
    uri: IMGS.mk_mini,
    gender: false,
    category: 'Túi Đeo Chéo',
    percentOff: 0.45,
    cost: 4500000,
    color: '["Xanh Navy","Đen","Hồng"]',
    description: 'Kích thước mini đáng yêu, dây đeo dài điều chỉnh được. Phù hợp đi chơi cuối tuần.',
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
    color: '["Xám Bạc","Đen"]',
    description: 'Họa tiết kẻ caro Burberry truyền thống, khóa xoay đặc trưng. Phong cách Anh Quốc cổ điển.',
  },
  {
    handbagName: 'Túi Tote Logo Print Cỡ Lớn Màu Kem',
    brand: 'Burberry',
    uri: IMGS.bb_tote,
    gender: false,
    category: 'Túi Tote',
    percentOff: 0.50,
    cost: 18000000,
    color: '["Kem","Trắng"]',
    description: 'Vải canvas cao cấp in logo, dung tích rộng cho ngày bận rộn. Tay cầm da thật.',
  },
  {
    handbagName: 'Túi Đeo Chéo Olympia Da Màu Be Tự Nhiên',
    brand: 'Burberry',
    uri: IMGS.bb_olympia,
    gender: true,
    category: 'Túi Đeo Chéo',
    percentOff: 0.47,
    cost: 6800000,
    color: '["Be Tự Nhiên"]',
    description: 'Da bê cao cấp, ngăn card + ngăn phụ tiện lợi. Dây đeo điều chỉnh được.',
  },
  {
    handbagName: 'Túi Mini TB Màu Nâu Birch',
    brand: 'Burberry',
    uri: IMGS.bb_mini,
    gender: false,
    category: 'Túi Mini',
    percentOff: 0.42,
    cost: 22500000,
    color: '["Nâu Birch","Đen","Đỏ"]',
    description: 'Phong cách cổ điển Anh Quốc, khóa TB mạ vàng sang trọng. Kích thước mini tinh tế.',
  },
  {
    handbagName: 'Ví Da Kẻ Caro Họa Tiết Truyền Thống',
    brand: 'Burberry',
    uri: IMGS.bb_wallet,
    gender: false,
    category: 'Ví Da',
    percentOff: 0.38,
    cost: 8200000,
    color: '["Be Caro","Nâu Caro"]',
    description: 'Họa tiết kẻ caro đặc trưng, chất liệu canvas + da viền. Biểu tượng thời trang Anh Quốc.',
  },
  {
    handbagName: 'Túi Clutch Da Mềm Màu Đen Tối Giản',
    brand: 'Burberry',
    uri: IMGS.bb_clutch,
    gender: false,
    category: 'Clutch',
    percentOff: 0.44,
    cost: 16700000,
    color: '["Đen"]',
    description: 'Da nappa mịn mượt, dây xích vàng có thể tháo rời. Thiết kế tối giản sang trọng.',
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
    color: '["Đỏ"]',
    description: 'Logo thêu nổi bật, da bê Italy cao cấp, đường chỉ hoàn thiện tinh tế. Màu đỏ rực rỡ.',
  },
  {
    handbagName: 'Túi Cut-Out Đeo Vai Màu Đen Độc Đáo',
    brand: 'Ferragamo',
    uri: IMGS.sf_cutout,
    gender: true,
    category: 'Túi Đeo Vai',
    percentOff: 0.40,
    cost: 14400000,
    color: '["Đen","Xám"]',
    description: 'Họa tiết khoét lỗ độc đáo, cấu trúc cứng cáp giữ dáng tốt. Thiết kế avant-garde.',
  },
  {
    handbagName: 'Ví Da Gancini Khóa Màu Hồng Phấn',
    brand: 'Ferragamo',
    uri: IMGS.sf_gancini,
    gender: false,
    category: 'Ví Da',
    percentOff: 0.35,
    cost: 9200000,
    color: '["Hồng Phấn","Trắng Ngà","Đen"]',
    description: 'Khóa Gancini biểu tượng, da bê Italy mềm mại. Thiết kế kinh điển Ferragamo.',
  },
  {
    handbagName: 'Túi Tote Fiamma Cỡ Vừa Màu Camel',
    brand: 'Ferragamo',
    uri: IMGS.sf_fiamma,
    gender: false,
    category: 'Túi Tote',
    percentOff: 0.38,
    cost: 19500000,
    color: '["Camel","Đen"]',
    description: 'Dáng tote thanh lịch, khóa kéo chắc chắn, dung tích lớn. Da Italy cao cấp.',
  },
  {
    handbagName: 'Túi Clutch Dạ Hội Màu Vàng Gold',
    brand: 'Ferragamo',
    uri: IMGS.sf_clutch,
    gender: false,
    category: 'Clutch',
    percentOff: 0.33,
    cost: 25000000,
    color: '["Vàng Gold","Bạc"]',
    description: 'Da dê mịn mượt, chi tiết mạ vàng, hoàn hảo cho sự kiện đặc biệt và dạ tiệc.',
  },
  {
    handbagName: 'Túi Đeo Chéo Studio Soft Màu Xanh Cobalt',
    brand: 'Ferragamo',
    uri: IMGS.sf_studio,
    gender: false,
    category: 'Túi Đeo Chéo',
    percentOff: 0.42,
    cost: 12800000,
    color: '["Xanh Cobalt","Đỏ Đô","Đen"]',
    description: 'Da mềm ôm form tốt, dây đeo dài phù hợp nhiều vóc người. Màu xanh cobalt cá tính.',
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
    color: '["Xanh Bơ","Xám Palladio","Hồng"]',
    description: 'Biểu tượng Fendi bất hủ, da nappa Italy mềm mượt, phụ kiện bạc. Thiết kế độc đáo hai ngăn.',
  },
  {
    handbagName: 'Túi Đeo Vai First Sight Màu Xanh Denim',
    brand: 'Fendi',
    uri: IMGS.fd_first,
    gender: true,
    category: 'Túi Đeo Vai',
    percentOff: 0.37,
    cost: 42900000,
    color: '["Xanh Denim","Xanh Cobalt","Đen"]',
    description: 'Dáng bồng cá tính, khóa FF mạ vàng nổi bật. Phong cách trẻ trung hiện đại.',
  },
  {
    handbagName: 'Ví Card Case Peekaboo Da Màu Xanh Edamame',
    brand: 'Fendi',
    uri: IMGS.fd_card,
    gender: true,
    category: 'Ví Card',
    percentOff: 0.35,
    cost: 7330000,
    color: '["Xanh Edamame","Be","Đen"]',
    description: 'Kiểu dáng mini ấn tượng, logo FF dập nổi, nhiều ngăn card. Màu xanh edamame độc đáo.',
  },
  {
    handbagName: 'Túi Baguette Mini Đan Lưới Màu Kem',
    brand: 'Fendi',
    uri: IMGS.fd_baguette,
    gender: false,
    category: 'Túi Baguette',
    percentOff: 0.40,
    cost: 28500000,
    color: '["Kem","Đen","Nâu"]',
    description: 'Thiết kế đan lưới thủ công tỉ mỉ, dây xích phối da. Icon Fendi từ thập niên 90.',
  },
  {
    handbagName: 'Túi Tote FF Logo Vải Canvas Màu Đen',
    brand: 'Fendi',
    uri: IMGS.fd_tote,
    gender: false,
    category: 'Túi Tote',
    percentOff: 0.32,
    cost: 23100000,
    color: '["Đen","Nâu"]',
    description: 'Vải canvas FF cao cấp, viền da bê Italy, dây quai mềm êm tay. Thực dụng và sang trọng.',
  },
  {
    handbagName: 'Túi Đeo Chéo Nano Fendigraphy Màu Đỏ',
    brand: 'Fendi',
    uri: IMGS.fd_nano,
    gender: false,
    category: 'Túi Đeo Chéo',
    percentOff: 0.39,
    cost: 31200000,
    color: '["Đỏ","Hồng Đậm","Đen"]',
    description: 'In chữ Fendi nghệ thuật độc đáo, kích thước nano siêu nhỏ dễ thương.',
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
  console.log('📦 Đang upload 30 sản phẩm túi xách...');
  const results = [];
  for (let i = 0; i < handbags.length; i++) {
    const bag = handbags[i];
    const result = await postRecord(bag);
    results.push(result);
    console.log(`   [${i + 1}/30] ✅ ${bag.handbagName.substring(0, 50)} (id: ${result.id})`);
  }

  console.log('\n🎉 Hoàn thành! Đã upload 30 sản phẩm với schema handbag đúng.');
  console.log('📋 IDs:', results.map(r => r.id).join(', '));
}

main().catch(console.error);
