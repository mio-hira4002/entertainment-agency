/*
 * 画像素材（すべて Unsplash License のフリー素材）
 * - 商用利用可・クレジット表記不要（https://unsplash.com/license）
 * - 写っている人物は実在の芸能人ではなく、一般のモデルです
 * - 人物写真は「本サービスを推奨している」と誤認させる使い方をしないこと
 * - 正式公開前に、登録タレント本人の宣材写真（許諾済み）へ差し替えてください
 */

const unsplash = (id: string, w = 800, h?: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}${
    h ? `&h=${h}` : ""
  }&q=80`

export const portrait = (id: string, size = 480) => unsplash(id, size, size)
export const photo = unsplash

/* 撮影現場・オフィスなどのシーン写真 */
export const scenes = {
  soundstage: "1612544409025-e1f6a56c1152",
  dollyCrew: "1758906819465-b2fde39d715d",
  productShoot: "1773825379472-5ee5bfa98658",
  clapperboard: "1515634928627-2a4e0dae3ddf",
  studioSetup: "1471341971476-ae15ff5dd4ea",
  photoStudio: "1637124396916-4f85d4bf9fdd",
  cameraOperator: "1611784728558-6c7d9b409cdf",
  crewAroundCamera: "1632187981988-40f3cbaeef5e",
  businessTeam: "1731458769726-cef60c792665",
  openOffice: "1531973576160-7125cd663d86",
  officeMonitor: "1531498352491-042fbae4cf57",
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

/* デモ用の架空タレント（名前・経歴はすべて架空） */
export const talents: Talent[] = [
  {
    name: "佐藤 ケン",
    role: "俳優・モデル",
    area: "東京",
    age: 38,
    price: "10万円〜",
    tags: ["自然な演技", "父親役", "企業VP"],
    photo: "1611403119860-57c4937ef987",
    pick: true,
  },
  {
    name: "水野 あかり",
    role: "俳優",
    area: "愛知・東京",
    age: 31,
    price: "8万円〜",
    tags: ["透明感", "商品紹介", "ナレーション"],
    photo: "1624091844772-554661d10173",
    pick: true,
  },
  {
    name: "田辺 一郎",
    role: "俳優・ナレーター",
    area: "大阪",
    age: 42,
    price: "12万円〜",
    tags: ["落ち着いた声", "上司役", "採用動画"],
    photo: "1540569014015-19a7be504e3a",
    pick: true,
  },
  {
    name: "森 さくら",
    role: "俳優・モデル",
    area: "東京",
    age: 27,
    price: "9万円〜",
    tags: ["笑顔", "美容・食品", "SNS広告"],
    photo: "1534528741775-53994a69daeb",
  },
  {
    name: "高橋 蓮",
    role: "俳優",
    area: "東京・神奈川",
    age: 25,
    price: "7万円〜",
    tags: ["学生役", "アクション", "Web CM"],
    photo: "1542327897-d73f4005b533",
  },
  {
    name: "小林 葵",
    role: "俳優・MC",
    area: "福岡",
    age: 29,
    price: "8万円〜",
    tags: ["司会", "地域PR", "イベント"],
    photo: "1770135157320-68ecfe9cd608",
  },
  {
    name: "中村 修",
    role: "俳優",
    area: "東京",
    age: 61,
    price: "15万円〜",
    tags: ["祖父役", "職人役", "ブランドムービー"],
    photo: "1758600431229-191932ccee81",
  },
  {
    name: "吉田 美和",
    role: "俳優",
    area: "京都・大阪",
    age: 35,
    price: "10万円〜",
    tags: ["母親役", "柔らかい雰囲気", "企業VP"],
    photo: "1780396700817-2ec700591808",
  },
]

/* 運営画面などに出てくる人物（架空） */
export const people: Record<string, string> = {
  ...Object.fromEntries(talents.map((t) => [t.name, t.photo])),
  "森田 真": "1761435756843-0ca5f4ff1d59",
  "石田 梨沙": "1605501218769-dd46efd48417",
  "西村 明": "1774294067490-b7e2a5964cf5",
  "上野 ひな": "1504697853966-78bd24a02a23",
  "大川 節子": "1778174903051-0b15d54bb451",
}

export const PHOTO_CREDIT =
  "写真はイメージです（Unsplashのフリー素材。実在の芸能人ではありません）"
