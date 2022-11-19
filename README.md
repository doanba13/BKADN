# Typescript React Webpack Boilerplate

Code base xây dựng bằng Webpack 5, được tham khảo từ nhiều nguồn.

## Support:

- Typescript
- Rules, format = Eslint + Prettier (có thể imple stage format)
- Path alias
- Webpack dev server
- Minify CSS, JS
- Code splitting
- Compress bundles file bằng Gzip
- Jest config

## Scripts

Dùng **yarn** hoặc **npm** hoặc **pnpm** để chạy scripts

| Command       | Chức năng                      | Cấu trúc                                            |
|---------------|:-------------------------------|-----------------------------------------------------|
| ***start***   | Chạy Dev-server                | *webpack serve --config webpack/webpack.dev.js*     |
| ***build***   | Bundles file vào thư mục build | *webpack --config webpack/webpack.prod.js*          |
| ***lint***    | Kiểm tra Eslint, tự fix lỗi    | *eslint "{src,apps,libs,test}/**/*.{tsx,ts}" --fix* |
| ***format***  | Format lại code bằng Prettier  | *prettier --write "src/**/*.{tsx,ts}" *             |
| ***install*** | Cài đặt Dependencies           |                                                     | 

## Webpack Config

### Common

Các config sẽ sử dụng chung ở 2 chế độ Production và Development.

#### Ouput:

Sau khi bundled, các file sẽ được lưu ở thư mục build.

```
----build
    |--static
    |  |--js // Javascript file
    |  |--css // Css file
    |  |--assets
    |  |--imgs
    |  |--fonts
    |
    |--index.html
    |--favicon.ico
    // More file in public dir 
```

#### Resolve:

Config path alias, import từ "@path/**/*". Xem xét sử dụng index.js để thu gọn phần import, dễ quản lý modules.

#### Plugin:

[node-polyfill-webpack-plugin](https://www.npmjs.com/package/node-polyfill-webpack-plugin): Polyfill node core modules.

[mini-css-extract-plugin](https://www.npmjs.com/package/mini-css-extract-plugin): Tách css ra file riêng (tuy nhiên
styled-component chưa hỗ trợ tách styles ra file :'( ).

[html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin): Tự động add tag cho file html template.

[eslint-webpack-plugin](https://www.npmjs.com/package/eslint-webpack-plugin): Watch lỗi Eslint/Format khi build hoặc
chạy dev-server.

[copy-webpack-plugin](https://www.npmjs.com/package/copy-webpack-plugin): Tự động copy folder public (chứa file html và
một số thông tin khác) vào thư mục build.

#### modules

Mặc định, Webpack chỉ có thể xủ lý file js. Sử dụng các loader để giúp Webpack xử lý các loại file khác.

#### Optimization

[Webpack 5 Optimization Document](https://webpack.js.org/configuration/optimization): Tài liệu Optimize Webpack cung cấp

### Production

#### Mode:

Production

#### Module:

Hiện tại, các dự án đều được viết hoàn toàn bằng Typescript, nên việc xử lý các file **.ts* **.tsx* đều do **ts-loader**
phụ trách, các option khác về Typescript được cấu hình ở file ***tsconfig.json***. Cần phải cấu hình **Babel** nếu muốn
sử dụng cả Javascript và Typescript.

#### Plugin:

[webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer): Phân tích bundles sau khi build

[compression-webpack-plugin](https://www.npmjs.com/package/compression-webpack-plugin): Nén bundles bằng **Gzip** (
Server hỗ trợ encode: 'gzip' nên browser có thể tải và sử dụng file **.gz*).

### Development

#### Mode:

Development

#### Devtool

Sourcemap: 'inline-source-map'

#### DevServer

Webpack sẽ tạo một web server để serve app của mình trong quá trình develop. Để có thể hiểu rõ hơn về option, kiểm tra
các comment trong file *webpack.dev.js*.

#### Plugin:

[@pmmmwh/react-refresh-webpack-plugin](https://www.npmjs.com/package/@pmmmwh/react-refresh-webpack-plugin): Hỗ trợ
refresh React nhanh hơn.

## Future Implement

### Navigate outside component với react-router-dom 6

[react-router-v6 navigate outside of components](https://stackoverflow.com/questions/69871987/react-router-v6-navigate-outside-of-components):
Nếu gặp lỗi khi khi apiFetcher không navigate thì sẽ thêm customHistory để có thể navigate bên ngoài component

### Package Management

So sánh giữa **yarn**, **npm** và **pnpm** để chọn ra Package Management phù hợp nhất.

### State Management

#### Server State

So sánh giữa **React Query** và **ApiFetcher Hook**.

Tìm hiểu cách triển khai **React Query** ở mức độ dự án thực tế.

#### Application State

So sánh **react-hooks-global-state** và **Zustand/Redux** để chọn ra thư viện phù hợp nhất.

***react-hooks-global-state** trong version 2 đã thay đổi từ sử dụng **React hooks** để chuyển sang **Zustand**. Vì vậy,
có thể triển khai trực tiếp **Zustand** thay vì sử dụng qua một thư viện thứ 3 (maybe thứ 4).*

## Contributing

Big thanks to *@damocles* for an effective React Webpack skeleton and explained to me some confusing part of it.

