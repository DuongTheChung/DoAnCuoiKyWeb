-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 28, 2018 lúc 02:10 PM
-- Phiên bản máy phục vụ: 10.1.31-MariaDB
-- Phiên bản PHP: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `shoponline`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bill_product`
--

CREATE TABLE `bill_product` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `product_name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `category_name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `company_name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_price` decimal(10,0) NOT NULL,
  `created_date` datetime NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `bill_product`
--

INSERT INTO `bill_product` (`id`, `userId`, `product_name`, `category_name`, `company_name`, `quantity`, `total_price`, `created_date`, `status`) VALUES
(15, 16, 'Kỹ năng sống', 'Sách thiếu niên', 'Nhà sản xuất cần thơ', 1, '300', '2018-06-26 21:28:21', 1),
(16, 16, 'Tiếng anh chủ đề', 'Sách tiếng anh', 'Nhà sản xuất đà nẵng', 1, '200', '2018-06-28 18:43:22', 1),
(17, 14, 'Năng lượng', 'Sách khoa học', 'Nhà sản xuất TPHCM', 2, '600', '2018-06-28 18:50:56', 0),
(18, 14, 'Quản lý công nghệ', 'Sách khoa học', 'Nhà sản xuất TPHCM', 1, '300', '2018-06-28 18:50:56', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `meta_title` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `display_order` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `created_by` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `modified_date` datetime NOT NULL,
  `modified_by` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`id`, `name`, `meta_title`, `display_order`, `created_date`, `created_by`, `modified_date`, `modified_by`) VALUES
(10, 'Sách tiếng anh', 'sach-tieng-anh', 1, '2018-06-26 20:56:30', 'admin-chung', '0000-00-00 00:00:00', ''),
(11, 'Sách khoa học', 'sach-khoa-hoc', 2, '2018-06-26 20:57:40', 'admin-chung', '0000-00-00 00:00:00', ''),
(12, 'Sách kinh doanh', 'sach-kinh-doanh', 1, '2018-06-26 20:57:59', 'admin-chung', '0000-00-00 00:00:00', ''),
(13, 'Sách thiếu niên', 'sach-thieu-nien', 3, '2018-06-26 20:58:13', 'admin-chung', '0000-00-00 00:00:00', '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `company`
--

CREATE TABLE `company` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `meta_title` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `display_order` int(11) NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `created_by` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `created_date` datetime NOT NULL,
  `modified_by` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `modified_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `company`
--

INSERT INTO `company` (`id`, `name`, `meta_title`, `display_order`, `email`, `phone`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES
(6, 'Nhà sản xuất hà nội', 'nha-san-xuat-ha-noi', 1, 'sxhn@gmail.com', '0123456890', 'admin-chung', '2018-06-26 20:58:44', '', '0000-00-00 00:00:00'),
(7, 'Nhà sản xuất đà nẵng', 'nha-san-xuat-da-nang', 2, 'sxdn@gmail.com', '09564766898', 'admin-chung', '2018-06-26 20:59:14', '', '0000-00-00 00:00:00'),
(8, 'Nhà sản xuất TPHCM', 'nha-san-xuat-tphcm', 2, 'sxtphcm@gmail.com', '05648763076985', 'admin-chung', '2018-06-26 20:59:48', '', '0000-00-00 00:00:00'),
(9, 'Nhà sản xuất cần thơ', 'nha-san-xuat-can-tho', 4, 'sxct@gmail.com', '01675089588', 'admin-chung', '2018-06-26 21:00:20', '', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `meta_title` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `parent_category` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `parent_company` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `display_order` int(11) NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_by` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `created_date` datetime NOT NULL,
  `modified_by` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `modified_date` datetime NOT NULL,
  `view_count` int(11) NOT NULL,
  `sales_count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product`
--

INSERT INTO `product` (`id`, `name`, `meta_title`, `parent_category`, `parent_company`, `display_order`, `description`, `price`, `image`, `quantity`, `created_by`, `created_date`, `modified_by`, `modified_date`, `view_count`, `sales_count`) VALUES
(20, 'Ngữ pháp tiếng anh ', 'ngu-phap-tieng-anh-', 'Sách tiếng anh', 'Nhà sản xuất hà nội', 2, 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout', '200', 'image1.png', 20, 'admin-chung', '2018-06-26 21:02:33', 'chung-admin', '2018-06-26 21:11:40', 2, 0),
(21, 'Tiếng anh khách sạn', 'tieng-anh-khach-san', 'Sách tiếng anh', 'Nhà sản xuất đà nẵng', 2, 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout', '100', 'image2.png', 24, 'admin-chung', '2018-06-26 21:03:49', 'chung-admin', '2018-06-26 21:11:58', 0, 0),
(22, 'Tự học tiếng anh', 'tu-hoc-tieng-anh', 'Sách tiếng anh', 'Nhà sản xuất TPHCM', 3, 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.', '100', 'image3.png', 39, 'admin-chung', '2018-06-26 21:04:42', 'chung-admin', '2018-06-28 01:59:05', 0, 0),
(23, 'Bài tập tiếng anh lớp 9', 'bai-tap-tieng-anh-lop-9', 'Sách tiếng anh', 'Nhà sản xuất hà nội', 5, 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.', '100', 'image4.png', 20, 'admin-chung', '2018-06-26 21:05:15', '', '0000-00-00 00:00:00', 1, 0),
(24, 'Nguồn gốc muôn loài', 'nguon-goc-muon-loai', 'Sách khoa học', 'Nhà sản xuất hà nội', 3, 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable', '240', 'image1.png', 19, 'admin-chung', '2018-06-26 21:07:00', 'chung-admin', '2018-06-26 21:09:42', 0, 0),
(25, 'Khoa học làm giàu', 'khoa-hoc-lam-giau', 'Sách khoa học', 'Nhà sản xuất đà nẵng', 2, 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable', '300', 'image2.png', 34, 'admin-chung', '2018-06-26 21:07:31', '', '0000-00-00 00:00:00', 1, 0),
(26, 'Phát minh khoa học', 'phat-minh-khoa-hoc', 'Sách khoa học', 'Nhà sản xuất hà nội', 3, 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable', '100', 'image3.png', 30, 'admin-chung', '2018-06-26 21:08:07', 'chung-admin', '2018-06-26 21:10:06', 0, 0),
(27, 'Sổ tay đội viên', 'so-tay-doi-vien', 'Sách thiếu niên', 'Nhà sản xuất cần thơ', 3, 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable', '200', 'image1.png', 38, 'admin-chung', '2018-06-26 21:13:46', '', '0000-00-00 00:00:00', 0, 0),
(28, 'Tuổi thơ dữ dội', 'tuoi-tho-du-doi', 'Sách thiếu niên', 'Nhà sản xuất đà nẵng', 3, 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.', '400', 'image2.png', 30, 'admin-chung', '2018-06-26 21:14:29', '', '0000-00-00 00:00:00', 0, 0),
(29, 'Bách khoa tri thức', 'bach-khoa-tri-thuc', 'Sách thiếu niên', 'Nhà sản xuất đà nẵng', 5, 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.', '200', 'image3.png', 29, 'admin-chung', '2018-06-26 21:15:03', '', '0000-00-00 00:00:00', 0, 0),
(30, 'Truyện ngụ ngôn', 'truyen-ngu-ngon', 'Sách thiếu niên', 'Nhà sản xuất TPHCM', 4, 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.', '200', 'image4.png', 30, 'admin-chung', '2018-06-26 21:15:32', '', '0000-00-00 00:00:00', 1, 0),
(31, 'Cẩm năng khởi nghiệp', 'cam-nang-khoi-nghiep', 'Sách kinh doanh', 'Nhà sản xuất hà nội', 6, 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.', '400', 'image1.png', 20, 'admin-chung', '2018-06-26 21:17:40', '', '0000-00-00 00:00:00', 0, 0),
(32, '50 ý tưởng kinh doanh', '50-y-tuong-kinh-doanh', 'Sách kinh doanh', 'Nhà sản xuất TPHCM', 4, 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.', '1000', 'image2.png', 30, 'admin-chung', '2018-06-26 21:18:16', '', '0000-00-00 00:00:00', 0, 0),
(33, 'Kế trong kinh doanh', 'ke-trong-kinh-doanh', 'Sách kinh doanh', 'Nhà sản xuất cần thơ', 5, 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.', '350', 'image3.png', 20, 'admin-chung', '2018-06-26 21:18:53', '', '0000-00-00 00:00:00', 0, 0),
(34, 'Bí quyết bạc tỷ', 'bi-quyet-bac-ty', 'Sách kinh doanh', 'Nhà sản xuất TPHCM', 5, 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.', '200', 'image4.png', 10, 'admin-chung', '2018-06-26 21:19:30', '', '0000-00-00 00:00:00', 0, 0),
(35, 'Mưu lược kinh doanh', 'muu-luoc-kinh-doanh', 'Sách kinh doanh', 'Nhà sản xuất TPHCM', 4, 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.', '200', 'image7.png', 39, 'admin-chung', '2018-06-26 21:20:03', '', '0000-00-00 00:00:00', 1, 1),
(36, '3000 từ vựng tiếng anh', '3000-tu-vung-tieng-anh', 'Sách tiếng anh', 'Nhà sản xuất hà nội', 4, 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.', '300', 'image7.png', 37, 'admin-chung', '2018-06-26 21:21:06', '', '0000-00-00 00:00:00', 1, 0),
(37, 'Mở rộng từ vựng', 'mo-rong-tu-vung', 'Sách tiếng anh', 'Nhà sản xuất đà nẵng', 3, 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.', '200', 'image8.png', 30, 'admin-chung', '2018-06-26 21:22:18', '', '0000-00-00 00:00:00', 0, 0),
(38, 'Quản lý công nghệ', 'quan-ly-cong-nghe', 'Sách khoa học', 'Nhà sản xuất TPHCM', 4, 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.', '300', 'image7.png', 28, 'admin-chung', '2018-06-26 21:23:11', '', '0000-00-00 00:00:00', 1, 1),
(39, 'Năng lượng', 'nang-luong', 'Sách khoa học', 'Nhà sản xuất TPHCM', 5, 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.', '300', 'image8.png', 20, 'admin-chung', '2018-06-26 21:24:17', '', '0000-00-00 00:00:00', 1, 0),
(40, 'Khoa học trái đất', 'khoa-hoc-trai-dat', 'Sách khoa học', 'Nhà sản xuất đà nẵng', 4, 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.', '400', 'image10.png', 50, 'admin-chung', '2018-06-26 21:24:48', '', '0000-00-00 00:00:00', 0, 0),
(41, 'Kỹ năng sống', 'ky-nang-song', 'Sách thiếu niên', 'Nhà sản xuất cần thơ', 4, 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.', '300', 'image9.png', 19, 'admin-chung', '2018-06-26 21:25:37', '', '0000-00-00 00:00:00', 1, 1),
(42, 'Tiếng anh chủ đề', 'tieng-anh-chu-de', 'Sách tiếng anh', 'Nhà sản xuất đà nẵng', 3, 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old', '200', 'image10.png', 33, 'admin-chung', '2018-06-27 20:00:14', '', '0000-00-00 00:00:00', 2, 1),
(43, 'Bài tập từ vựng', 'bai-tap-tu-vung', 'Sách tiếng anh', 'Nhà sản xuất TPHCM', 3, 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old', '350', 'image9.png', 200, 'admin-chung', '2018-06-27 20:00:55', '', '0000-00-00 00:00:00', 0, 0),
(44, 'Giải thích ngữ pháp', 'giai-thich-ngu-phap', 'Sách tiếng anh', 'Nhà sản xuất đà nẵng', 3, 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old', '100', 'image6.png', 23, 'admin-chung', '2018-06-27 20:01:37', '', '0000-00-00 00:00:00', 1, 0),
(45, 'Khoa học quản lý', 'khoa-hoc-quan-ly', 'Sách khoa học', 'Nhà sản xuất cần thơ', 4, 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old', '100', 'image9.png', 20, 'admin-chung', '2018-06-28 01:52:28', '', '0000-00-00 00:00:00', 1, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `role_user`
--

CREATE TABLE `role_user` (
  `id` int(11) NOT NULL,
  `name` varchar(200) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `role_user`
--

INSERT INTO `role_user` (`id`, `name`) VALUES
(0, 'customer'),
(1, 'admin'),
(2, 'manager');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `display_order` int(11) NOT NULL,
  `roleId` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `display_order`, `roleId`, `status`) VALUES
(1, 'admin', 'admin@gmail.com', '$2a$10$AnbeZSxa2Lhlhyfl./bwY.wqNYTZ1AiVjkf5JGpiSigWMlG3nOfTu', 1, 1, 1),
(9, 'chung', 'chungduong6@gmail.com', '$2a$10$KjhWMlXHKheXJvUCm5CR4upiAcFFgBO3/tLGMXkZkljJ885prkGI6', 2, 2, 1),
(13, 'Username', 'duongchung666@gmail.com', '$2a$10$rnFXAx4uo6nZdXCzjog.L.pNxHKbmHFO61dLxrj3VW3ngchKsz5AO', 3, 0, 1),
(14, 'trang', 'trang@gmail.com', '$2a$10$ThIjfsfm/tFGjG6Pi3KEPebyp1G/TB1Ys3QOb5IgCIJ0PLnoT3J8W', 4, 0, 1),
(16, 'hung123', 'hung@gmail.com', '$2a$10$cRWouvM2mL1qxm2AgoA4k.oYiiNpZS7SG1Px0MdJcHZ5yH9EbTL7e', 0, 0, 1);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `bill_product`
--
ALTER TABLE `bill_product`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `role_user`
--
ALTER TABLE `role_user`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `bill_product`
--
ALTER TABLE `bill_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `company`
--
ALTER TABLE `company`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
