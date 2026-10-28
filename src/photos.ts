/*
 * 画像素材（public/images/ 配下）
 * - 人物写真はフリー素材のモデル写真です。実在の芸能人ではありません
 * - 名前・年齢・経歴はすべて架空です
 * - 素材サイトの規約に従い、人物を「公式イメージ」「本人の推薦」に見える形で使わないこと
 * - 正式公開前に、登録タレント本人の宣材写真（許諾済み）へ差し替えてください
 *
 * 画像ファイル
 *   <id>.jpg    … 元の比率の写真
 *   <id>-sq.jpg … 顔を中心に切り抜いた正方形（人物のみ）
 */

const base = import.meta.env.BASE_URL

/* 元の比率の写真（w, h は以前のAPIとの互換用。ローカル画像では未使用） */
export const photo = (id: string, _w?: number, _h?: number) =>
  `${base}images/${id}.jpg`

/* 人物の正方形写真（人物以外は元写真を返す） */
export const portrait = (id: string, _size?: number) =>
  personIds.has(id) ? `${base}images/${id}-sq.jpg` : photo(id)

/* 街・オフィス街のシーン写真 */
export const scenes = {
  cityNight: "city-night",
  plaza: "plaza",
  street: "street",
  glass: "glass",
} as const

export type Talent = {
  name: string
  role: string
  area: string
  age: number
  price: string
  tags: string[]
  photo: string
  pick?: boolean
}

/* デモ用の架空タレント */
export const talents: Talent[] = [
  {
    name: "佐藤 ケン",
    role: "俳優・モデル",
    area: "東京",
    age: 38,
    price: "10万円〜",
    tags: ["自然な演技", "父親役", "企業VP"],
    photo: "sato",
    pick: true,
  },
  {
    name: "水野 あかり",
    role: "俳優",
    area: "愛知・東京",
    age: 26,
    price: "8万円〜",
    tags: ["透明感", "商品紹介", "ナレーション"],
    photo: "mizuno",
    pick: true,
  },
  {
    name: "森 さくら",
    role: "俳優・モデル",
    area: "東京",
    age: 23,
    price: "7万円〜",
    tags: ["笑顔", "美容・食品", "SNS広告"],
    photo: "mori",
    pick: true,
  },
  {
    name: "吉田 美和",
    role: "俳優",
    area: "神奈川・東京",
    age: 30,
    price: "10万円〜",
    tags: ["OL役", "企業VP", "採用動画"],
    photo: "yoshida",
  },
  {
    name: "高橋 蓮",
    role: "俳優・ダンサー",
    area: "東京",
    age: 22,
    price: "6万円〜",
    tags: ["学生役", "ダンス", "Web CM"],
    photo: "takahashi",
  },
  {
    name: "小林 葵",
    role: "俳優・MC",
    area: "福岡",
    age: 27,
    price: "8万円〜",
    tags: ["司会", "地域PR", "イベント"],
    photo: "kobayashi",
  },
  {
    name: "長谷川 りな",
    role: "モデル",
    area: "東京",
    age: 24,
    price: "7万円〜",
    tags: ["ストリート", "MV", "ファッション"],
    photo: "hasegawa",
  },
  {
    name: "白石 澪",
    role: "俳優",
    area: "京都・大阪",
    age: 28,
    price: "9万円〜",
    tags: ["ドラマ", "落ち着いた雰囲気", "MV"],
    photo: "shiraishi",
  },
]

/* 運営画面などに出てくる人物（架空） */
export const people: Record<string, string> = {
  ...Object.fromEntries(talents.map((t) => [t.name, t.photo])),
  "森田 まこ": "morita",
  "石田 梨沙": "ishida",
  "西村 あかね": "nishimura",
  "上野 ひな": "ueno",
  "大川 せな": "okawa",
}

const personIds = new Set(Object.values(people))

export const PHOTO_CREDIT =
  "写真はフリー素材のモデル写真です（実在の芸能人ではありません。名前・経歴は架空です）"
