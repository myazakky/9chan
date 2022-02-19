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

## Run on Docker

ビルド
```sh
docker build -t 9chan .
```

設定
```
cp settings.rb.example settings.rb
```
- `DB_NAME` に `/var/9chan/9chan.sqlite3` を指定する

テーブル作成
```
mkdir -p var/9chan
docker run -v $(pwd)/settings.rb:/opt/app/settings.rb -v $(pwd)/var/9chan:/var/9chan 9chan ruby ./models.rb
```

走行
```
docker run -it -v $(pwd)/settings.rb:/opt/app/settings.rb -v $(pwd)/var/9chan:/var/9chan -p 127.0.0.1:9292:9292 9chan
```
