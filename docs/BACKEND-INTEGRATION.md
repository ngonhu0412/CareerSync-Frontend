# Cấu trúc CareerSync và cách nối backend

## 1. Luồng dữ liệu để thuyết trình

`Người dùng → Page → useCareerStore → careerService → mockService hoặc apiService → HTTP → backend`

Ví dụ bấm **지원하기**:

1. `pages/JobDetailPage.tsx` gọi `apply()`.
2. `hooks/useCareerStore.ts` bật loading và gọi `careerService.apply(selected.id)`.
3. `services/apiService.ts` gửi `POST /me/applications` với JSON `{ "jobId": 1 }`.
4. Backend kiểm tra session, lưu vào database, trả danh sách ID công việc đã ứng tuyển.
5. Hook cập nhật state; React hiển thị “지원 완료”. Nếu thất bại, hiển thị lỗi và không báo thành công.

Trang không tự gọi fetch và không tự ghi localStorage. Đây là lý do có thể đổi backend mà ít sửa giao diện.

## 2. Mỗi thư mục làm gì?

| Đường dẫn | Trách nhiệm |
| --- | --- |
| `src/App.tsx` | Ghép layout và chọn trang theo hash URL |
| `src/pages/` | Giao diện từng trang: Home, Jobs, Profile, Resume… |
| `src/components/` | Icon, JobCard và phần form dùng chung |
| `src/components/layout/` | Header, Footer, Sidebar |
| `src/context/CareerContext.tsx` | Chia sẻ state/actions cho các trang |
| `src/hooks/useCareerStore.ts` | State, tải dữ liệu, thao tác và xử lý loading/error |
| `src/types/index.ts` | Kiểu dữ liệu Job, Profile, ResumeAnalysis, Page |
| `src/services/contracts.ts` | Hợp đồng các hàm service và kiểu đầu vào/đầu ra |
| `src/services/careerService.ts` | Chọn mock hay API qua biến môi trường |
| `src/services/apiService.ts` | URL endpoint, HTTP method, body |
| `src/services/httpClient.ts` | URL gốc, cookie, JSON/FormData và lỗi HTTP |
| `src/services/mockService.ts` | Giả lập backend để demo khi chưa có server |
| `src/services/mockStorage.ts` | Đọc/ghi localStorage của demo |
| `src/data/` | Công việc mẫu, danh mục và ánh xạ trường form |

Không có backend/database trong repo này. API dưới đây là **đề xuất**, chưa phải endpoint đã tồn tại.

## 3. Chạy demo và đổi sang API

Sao chép `.env.example` thành `.env`, mặc định:

```env
VITE_USE_MOCK=true
VITE_API_BASE_URL=http://localhost:8080/api
```

Khi backend đã triển khai đúng hợp đồng, đổi `VITE_USE_MOCK=false`, sau đó khởi động lại Vite bằng `npm run dev`.

Nếu backend dùng đường dẫn hoặc JSON khác, sửa `apiService.ts` để chuyển đổi về kiểu dữ liệu frontend. Không sửa endpoint trong từng trang.

Biến `VITE_*` được đưa vào trình duyệt: chỉ chứa URL/cấu hình công khai, không chứa mật khẩu hoặc API key.

## 4. Hợp đồng API đề xuất

Response thành công hiện dùng JSON trực tiếp, không có lớp `{ data: ... }`. Lỗi dùng `{ "message": "Nội dung lỗi" }` và HTTP status phù hợp.

| Method | Path sau `/api` | Request body | Response |
| --- | --- | --- | --- |
| GET | `/jobs` | — | `Job[]` |
| GET | `/me/saved-jobs` | — | `number[]` ID công việc |
| PUT | `/me/saved-jobs/:jobId` | — | `number[]` danh sách ID sau khi lưu |
| DELETE | `/me/saved-jobs/:jobId` | — | `number[]` danh sách ID sau khi bỏ lưu |
| GET | `/me/applications` | — | `number[]` ID công việc đã ứng tuyển |
| POST | `/me/applications` | `{ jobId: number }` | `number[]` danh sách ID sau khi ứng tuyển |
| GET | `/me/profile` | — | `Profile` |
| PUT | `/me/profile` | `Profile` | `Profile` đã lưu |
| POST | `/auth/login` | `{ email, password, role }` | `{ role: "구직자" hoặc "기업" }` |
| POST | `/auth/register` | `{ name, email, password, confirm, role }` | `{ role }` và đăng nhập bằng cookie |
| POST | `/jobs` | Các trường đăng tin bên dưới | `Job` vừa tạo |
| POST | `/me/resume/analysis` | multipart, trường `file` | `ResumeAnalysis` |
| POST | `/company/candidates/:id/interview` | — | `204` (đường gọi dự phòng, UI thật chưa bật) |

`Job` ví dụ:

```json
{
  "id": 1,
  "company": "Sample Tech",
  "logo": "S",
  "title": "Frontend Developer",
  "category": "개발 · IT",
  "location": "서울 · 강남구",
  "tags": ["React", "TypeScript"],
  "color": "blue",
  "score": 86
}
```

Hiện logo là chữ/emoji, không phải URL ảnh. `score` là số dùng để hiển thị, không phải xác suất trúng tuyển. Backend có thể dùng DTO khác; map DTO đó trong service. Khi cần phân trang, thay `Job[]` bằng kiểu có `items` và `total`, rồi bổ sung pagination cho trang Jobs.

`Profile` dùng khóa tiếng Anh:

```json
{
  "name": "Kim",
  "email": "kim@example.com",
  "desiredJob": "Frontend Developer",
  "region": "Seoul",
  "experience": "Junior",
  "employmentType": "Full-time",
  "skills": "React, TypeScript"
}
```

Body đăng tin: `title`, `location`, `employmentType`, `experience`, `headcount`, `deadline`, `description`, `requirements`. Hiện giá trị từ form là chuỗi; backend cần validate và chuyển `headcount` sang số. UI demo chưa có trường nhập công ty; backend phải lấy công ty từ session.

`ResumeAnalysis`:

```json
{
  "skills": ["React", "TypeScript"],
  "strengths": "Có kinh nghiệm xây dựng giao diện và làm việc nhóm.",
  "improvements": "Bổ sung số liệu kết quả và phạm vi đóng góp."
}
```

Upload dùng FormData, trình duyệt tự thêm Content-Type và boundary. Không tự đặt header JSON cho upload.

## 5. Session và quyền truy cập

HTTP client đề xuất dùng cookie session (`credentials: include`). Backend phải đặt cookie phù hợp, cấu hình CORS cho đúng origin frontend và kiểm tra quyền trên từng endpoint. Role/state trên frontend không phải cơ chế phân quyền.

Hiện login/register nhận role từ response; dữ liệu cá nhân chỉ tải sau đăng nhập ở chế độ API. Chưa có khôi phục phiên sau refresh, logout hoặc route guard đầy đủ. Khi làm authentication thật, bổ sung `/auth/me`, logout và cơ chế CSRF theo thiết kế backend. Nhóm cần thống nhất cookie session hay JWT trước khi tích hợp.

## 6. Phần đã đi qua service và phần vẫn demo

- Đã đi qua service: danh sách công việc, lưu/bỏ lưu, ứng tuyển, profile, đăng nhập/đăng ký, đăng tin và phân tích PDF. Có loading/error; cập nhật state sau khi service thành công.
- Mock chạy localStorage; đăng tin xuất hiện trong danh sách và giữ lại khi refresh. Không lưu mật khẩu.
- API adapter chưa kiểm thử với server thật vì chưa có server/schema được cung cấp.
- Matching vẫn dùng điểm và lời giải thích mẫu; chưa có thuật toán hay endpoint matching riêng.
- Danh sách ứng viên, thống kê doanh nghiệp và trạng thái xét tuyển vẫn là dữ liệu minh họa. Chặn mời phỏng vấn bằng ID mẫu khi bật API để tránh gửi dữ liệu giả vào backend.
- Trang chi tiết vẫn dùng nội dung mô tả, kinh nghiệm và deadline minh họa. Cần mở rộng Job DTO để hiển thị nội dung thật, thêm GET `/jobs/:id` và đưa ID vào URL khi triển khai chi tiết đầy đủ.
- Danh sách việc làm hiện tải một lần rồi lọc trong trình duyệt. Với dữ liệu lớn, chuyển query/filter/pagination sang backend.
- Hash URL chỉ giữ tên trang; chưa giữ ID công việc đang chọn qua refresh.
- Bộ chọn vai trò và lối vào doanh nghiệp hiện phục vụ demo. Cần bỏ khi triển khai quyền thực tế.

## 7. Kiểm tra

```sh
npm run build
node --test tests/services.test.mjs
```

Tests kiểm tra lưu dữ liệu mock, tránh trùng saved/application, tạo công việc, dữ liệu localStorage lỗi, không lưu mật khẩu, URL/body/cookie HTTP, upload multipart và lỗi từ server. Chưa thay thế kiểm thử browser hay kiểm thử tích hợp backend.
