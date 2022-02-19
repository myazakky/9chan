# 9chan

闇ネットチャットの実装の1つ

sinatra-sseのoriginal:
- https://github.com/radiospiel/sinatra-sse

## Usage

インストール
```
bundle install
```

ビルド
```
cd frontend/9chan
npm install
npm run build
```

設定
```
cp settings.rb.example settings.rb
```

テーブル作成
```
ruby ./models.rb
```

走行
```
rackup
```
